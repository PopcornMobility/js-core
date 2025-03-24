import "antd/es/button/style";
import _Button from "antd/es/button";
import "antd/es/input/style";
import _Input from "antd/es/input";
import "antd/es/form/style";
import _Form from "antd/es/form";

var _dec, _dec2, _class, _temp;

import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import styles from "./style.module.scss";
let Login = (_dec = _Form.create(), _dec2 = connect(({
  user
}) => ({
  user
})), _dec(_class = _dec2(_class = (_temp = class Login extends Component {
  constructor(...args) {
    super(...args);

    this.onSubmit = event => {
      event.preventDefault();
      const {
        form,
        dispatch
      } = this.props;
      form.validateFields((error, values) => {
        if (!error) {
          dispatch({
            type: 'user/LOGIN',
            payload: values
          });
        }
      });
    };
  }

  render() {
    const {
      form,
      user: {
        loading
      }
    } = this.props;
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Helmet, {
      title: "Login"
    }), /*#__PURE__*/React.createElement("div", {
      className: `${styles.title} login-heading`
    }, /*#__PURE__*/React.createElement("h1", null, /*#__PURE__*/React.createElement("strong", null, "WELCOME"))), /*#__PURE__*/React.createElement("div", {
      className: styles.block
    }, /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-xl-12"
    }, /*#__PURE__*/React.createElement("div", {
      className: styles.inner
    }, /*#__PURE__*/React.createElement("div", {
      className: styles.form
    }, /*#__PURE__*/React.createElement("h4", {
      className: "text-uppercase"
    }, /*#__PURE__*/React.createElement("strong", null, "Log in")), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(_Form, {
      layout: "vertical",
      hideRequiredMark: true,
      onSubmit: this.onSubmit
    }, /*#__PURE__*/React.createElement(_Form.Item, {
      label: "Email"
    }, form.getFieldDecorator('email', {
      rules: [{
        required: true,
        message: 'Please input your e-mail address'
      }]
    })( /*#__PURE__*/React.createElement(_Input, {
      size: "default"
    }))), /*#__PURE__*/React.createElement(_Form.Item, {
      label: "Password"
    }, form.getFieldDecorator('password', {
      rules: [{
        required: true,
        message: 'Please input your password'
      }]
    })( /*#__PURE__*/React.createElement(_Input, {
      size: "default",
      type: "password"
    }))), /*#__PURE__*/React.createElement(_Button, {
      type: "primary",
      className: "width-150 mr-4",
      htmlType: "submit",
      loading: loading
    }, "Login"))))))));
  }

}, _temp)) || _class) || _class);
export default Login;