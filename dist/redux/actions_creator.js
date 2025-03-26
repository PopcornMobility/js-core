function networkActionsCreator(reducer) {
  return {
    LOAD: `${reducer}`,
    REQUEST: `${reducer}/request`,
    SUCCESS: `${reducer}/success`,
    ERROR: `${reducer}/error`,
    RESET: `${reducer}/reset`,
    CANCEL: `${reducer}/cancel`,
    CANCELLED: `${reducer}/cancelled`
  };
}

function getPrefix(prefix, type) {
  prefix = prefix.toUpperCase();
  return type ? `${prefix}_${type}` : prefix;
}

function extraNetworkActionsCreator(prefix, reducer) {
  return {
    [getPrefix(prefix)]: `${reducer}`,
    [getPrefix(prefix, 'REQUEST')]: `${reducer}/request`,
    [getPrefix(prefix, 'SUCCESS')]: `${reducer}/success`,
    [getPrefix(prefix, 'ERROR')]: `${reducer}/error`,
    [getPrefix(prefix, 'RESET')]: `${reducer}/reset`,
    [getPrefix(prefix, 'CANCEL')]: `${reducer}/cancel`,
    [getPrefix(prefix, 'CANCELLED')]: `${reducer}/cancelled`
  };
}

export { networkActionsCreator, extraNetworkActionsCreator };