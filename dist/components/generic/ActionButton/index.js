import "antd/es/popover/style";
import _Popover from "antd/es/popover";
import "antd/es/button/style";
import _Button from "antd/es/button";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
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
    return /*#__PURE__*/React.createElement(_Popover, {
      content: /*#__PURE__*/React.createElement("div", null, popoverText, ' ', /*#__PURE__*/React.createElement(_Button, {
        type: buttonType,
        className: "ml-2",
        onClick: onClick,
        loading: loading
      }, "Confirm")),
      trigger: "click"
    }, /*#__PURE__*/React.createElement(_Button, _extends({
      icon: buttonIcon,
      type: buttonType
    }, rest), buttonText));
  }

}