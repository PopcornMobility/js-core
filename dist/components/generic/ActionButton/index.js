function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { Button, Popover } from 'antd';
export default class ActionButton extends React.Component {
  render() {
    const {
      popoverText = 'Are you sure?',
      buttonText = 'Dispatch Action',
      buttonType,
      buttonIcon,
      loading,
      onClick,
      ...rest
    } = this.props;
    return /*#__PURE__*/React.createElement(Popover, {
      content: /*#__PURE__*/React.createElement("div", null, popoverText, ' ', /*#__PURE__*/React.createElement(Button, {
        type: buttonType,
        className: "ml-2",
        onClick: onClick,
        loading: loading
      }, "Confirm")),
      trigger: "click"
    }, /*#__PURE__*/React.createElement(Button, _extends({
      icon: buttonIcon,
      type: buttonType
    }, rest), buttonText));
  }

}