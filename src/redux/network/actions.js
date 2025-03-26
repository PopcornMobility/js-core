import { networkActionsCreator } from "../actions_creator";

const actions = networkActionsCreator("network");

const request = (
  fetchOptions = {},
  action = "",
  extra = null,
  networkSagaConfig = {}
) => ({
  type: actions.REQUEST,
  payload: {
    options: fetchOptions,
    action,
    extra,
    networkSagaConfig
  }
});

export { actions, request };
