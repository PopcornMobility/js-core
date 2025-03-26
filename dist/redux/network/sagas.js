import { take, takeEvery, put, call, race, delay } from "redux-saga/effects";
import { notification } from "antd";
import { api } from "../../utils/net";
import { actions } from "./actions";
import isObject from 'lodash/isObject';

function showErrorNotification(content, title = 'Oops') {
  let description = 'Something went wrong, please retry.';

  if (isObject(content)) {
    const {
      errors,
      message
    } = content;
    const keys = errors && Object.keys(errors);

    if (keys && keys.length > 0) {
      const {
        [keys[0]]: [firstError]
      } = errors;
      description = firstError; // show first error in the errors array
    } else if (message) {
      description = message;
    }
  } else if (content) {
    description = content;
  }

  notification.error({
    message: title,
    description
  });
}

function* REQUEST({
  payload
}) {
  const timeout = 60;
  const {
    options,
    action,
    networkSagaConfig
  } = payload; // Set API timeout

  let api_delay = timeout;

  if (networkSagaConfig.timeout) {
    api_delay = networkSagaConfig.timeout;
  }

  try {
    yield put({
      type: `${action}/request`,
      requestPayload: payload
    }); // Start race

    const controller = new AbortController();
    const {
      signal
    } = controller;
    const {
      response,
      r_timeout,
      r_cancel
    } = yield race({
      response: call(api, { ...options,
        signal
      }),
      r_timeout: delay(api_delay * 1000),
      r_cancel: take(`${action}/cancel`)
    }); // Handle cancel

    if (r_cancel) {
      controller.abort();
      yield put({
        type: `${action}/cancelled`,
        requestPayload: payload
      });
      return;
    } // Handle timeout


    if (r_timeout) {
      notification.warning({
        message: 'Slow connection',
        description: 'Request timed out. Please retry.'
      });
      controller.abort();
      yield put({
        type: `${action}/error`,
        requestPayload: payload
      });
      return;
    } // Get JSON data


    const data = yield call([response, response.json]);

    if (response.ok) {
      yield put({
        type: `${action}/success`,
        payload: data,
        requestPayload: payload
      });
      return;
    } // Oops, something happened


    yield put({
      type: `${action}/error`,
      payload: data,
      requestPayload: payload
    }); // Check response status code

    switch (response.status) {
      case 429:
        showErrorNotification('Too many attempts.');
        break;

      default:
        showErrorNotification(data);
        break;
    }
  } catch (e) {
    if (e.message === 'Failed to fetch') {
      showErrorNotification('Check your internet connection.', 'Offline');
    } else {
      showErrorNotification();
    }

    yield put({
      type: `${action}/error`,
      payload: e,
      requestPayload: payload
    });
  }
}

export default function* network_rootSaga() {
  yield takeEvery(actions.REQUEST, REQUEST);
}