import React, { Component } from "react";
import { logger } from "redux-logger";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import { routerMiddleware } from "connected-react-router";
import { createStore, applyMiddleware, compose } from "redux";
import { createBrowserHistory } from "history";
import * as serviceWorker from "../../../serviceWorker";
import Router from "../Router";
import Localization from "../Localization";
import defaultModules from "../../../modules";
import initReducers from "../../../redux/reducers";
import initSagas from "../../../redux/sagas";
import { IntlReduxMiddleware } from "../Localization/IntlReduxMiddleware"; // app styles

import "../../../assets/styles/global.scss"; // disable cache-first approach

serviceWorker.unregister();
const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();
const routeMiddleware = routerMiddleware(history);
const middlewares = [IntlReduxMiddleware, thunk, sagaMiddleware, routeMiddleware]; // Redux Logger

if (process.env.REACT_APP_REDUX_LOGGER === "true") {
  middlewares.push(logger);
}

const processModules = (modules = []) => {
  modules = [...defaultModules, ...modules]; // ensure module uniqueness and correct ordering

  const processedModules = new Map();
  modules.forEach(module => {
    processedModules.set(module.name, module);
  });
  return Array.from(processedModules.values());
};

const createAdminStore = modules => {
  let reducers = {};
  let sagas = [];
  modules.forEach(module => {
    if (module.reducers) {
      reducers = { ...reducers,
        ...module.reducers
      };
    }

    if (module.sagas) {
      sagas = [...sagas, ...module.sagas];
    }
  });
  const store = createStore(initReducers({
    history
  }, reducers), compose(applyMiddleware(...middlewares)));
  sagaMiddleware.run(initSagas({}, sagas));
  return store;
};

const getRoutes = modules => {
  let routes = [];
  modules.forEach(module => {
    if (module.routes) {
      routes = [...routes, ...module.routes];
    }
  });
  return routes;
};

const getMenu = modules => {
  let left = [];
  modules.forEach(module => {
    if (module.menu) {
      left = [...left, ...module.menu];
    }
  });
  return {
    left,
    top: []
  };
};

const getLocales = modules => {
  const locales = [];
  modules.forEach(module => {
    if (module.locales) {
      locales.push(module.locales);
    }
  });
  return locales;
};

export const AdminContext = /*#__PURE__*/React.createContext({});
export default class Admin extends Component {
  constructor(props) {
    super(props);
    const {
      modules
    } = this.props;
    this.modules = processModules(modules);
  }

  render() {
    const {
      title
    } = this.props;
    return /*#__PURE__*/React.createElement(Provider, {
      store: createAdminStore(this.modules)
    }, /*#__PURE__*/React.createElement(AdminContext.Provider, {
      value: this.props
    }, /*#__PURE__*/React.createElement(Localization, {
      locales: getLocales(this.modules)
    }, /*#__PURE__*/React.createElement(Router, {
      history: history,
      routes: getRoutes(this.modules),
      menu: getMenu(this.modules),
      title: title
    }))));
  }

}