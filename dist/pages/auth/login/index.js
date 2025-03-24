var _dec, _class, _temp;

import React, { Component } from "react";
import { Form, Input, Button } from "antd";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import styles from "./style.module.scss"; // @Form.create()

let Login = (_dec = connect(({
  user
}) => ({
  user
})), _dec(_class = (_temp = class Login extends Component {
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
            type: "user/LOGIN",
            payload: values
          });
        }
      });
    };
  }

  render() {
    const {
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
    }, /*#__PURE__*/React.createElement("strong", null, "Log in")), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(Form, {
      layout: "vertical",
      hideRequiredMark: true,
      onSubmit: this.onSubmit
    }, /*#__PURE__*/React.createElement(Form.Item, {
      label: "Email",
      name: "email",
      rules: [{
        required: true,
        message: "Please input your e-mail address"
      }]
    }, /*#__PURE__*/React.createElement(Input, {
      size: "default"
    })), /*#__PURE__*/React.createElement(Form.Item, {
      label: "Password",
      name: "password",
      rules: [{
        required: true,
        message: "Please input your password"
      }]
    }, /*#__PURE__*/React.createElement(Input.Password, {
      size: "default",
      type: "password"
    })), /*#__PURE__*/React.createElement(Button, {
      type: "primary",
      className: "width-150 mr-4",
      htmlType: "submit",
      loading: loading
    }, "Login"))))))));
  }

}, _temp)) || _class);
export default Login;