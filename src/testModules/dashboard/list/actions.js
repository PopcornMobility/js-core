import { networkActionsCreator } from "../../../lib";

const actions = {
  ...networkActionsCreator("users")
};

export default actions;

export function load(payload) {
  return {
    type: actions.LOAD,
    payload
  };
}
