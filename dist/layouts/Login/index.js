import "antd/es/layout/style";
import _Layout from "antd/es/layout";

var _class;

import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import LanguageSelector from "../../components/core/TopBar/LanguageSelector";
import styles from "./style.module.scss";

let LoginLayout = withRouter(_class = class LoginLayout extends React.PureComponent {
  render() {
    const {
      children
    } = this.props;
    return /*#__PURE__*/React.createElement(_Layout, null, /*#__PURE__*/React.createElement(_Layout.Content, null, /*#__PURE__*/React.createElement("div", {
      className: styles.layout
    }, /*#__PURE__*/React.createElement("div", {
      className: styles.header
    }, /*#__PURE__*/React.createElement("div", {
      className: styles.logo
    }, /*#__PURE__*/React.createElement(Link, {
      to: "/"
    }, /*#__PURE__*/React.createElement("img", {
      src: "/resources/images/logo.png",
      alt: ""
    }))), /*#__PURE__*/React.createElement(LanguageSelector, null)), /*#__PURE__*/React.createElement("div", {
      className: styles.content
    }, children))));
  }

}) || _class;

export default LoginLayout;