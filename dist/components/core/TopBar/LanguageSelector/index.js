import "antd/es/dropdown/style";
import _Dropdown from "antd/es/dropdown";
import "antd/es/menu/style";
import _Menu from "antd/es/menu";

var _dec, _class, _temp;

import React from 'react';
import { connect } from 'react-redux';
import styles from "./style.module.scss";
let LanguageSelector = (_dec = connect(({
  settings
}) => ({
  settings
})), _dec(_class = (_temp = class LanguageSelector extends React.Component {
  constructor(...args) {
    super(...args);

    this.changeLang = ({
      key
    }) => {
      const {
        dispatch
      } = this.props;
      dispatch({
        type: 'settings/CHANGE_SETTING',
        payload: {
          setting: 'locale',
          value: key
        }
      });
    };
  }

  render() {
    const {
      settings: {
        locale
      }
    } = this.props;
    const language = locale.substr(0, 2);
    const langMenu = /*#__PURE__*/React.createElement(_Menu, {
      className: styles.menu,
      selectedKeys: [locale],
      onClick: this.changeLang
    }, /*#__PURE__*/React.createElement(_Menu.Item, {
      key: "en"
    }, /*#__PURE__*/React.createElement("span", {
      role: "img",
      "aria-label": "English",
      className: "mr-2"
    }, "\uD83C\uDDEC\uD83C\uDDE7"), "English"), /*#__PURE__*/React.createElement(_Menu.Item, {
      key: "ro"
    }, /*#__PURE__*/React.createElement("span", {
      role: "img",
      "aria-label": "Romanian",
      className: "mr-2"
    }, "\uD83C\uDDF7\uD83C\uDDF4"), "Rom\xE2n\u0103"), /*#__PURE__*/React.createElement(_Menu.Item, {
      key: "uk"
    }, /*#__PURE__*/React.createElement("span", {
      role: "img",
      "aria-label": "Ukrainean",
      className: "mr-2"
    }, "\uD83C\uDDFA\uD83C\uDDE6"), "\u0423\u043A\u0440\u0430\u0457\u043D\u0441\u044C\u043A\u0430"), /*#__PURE__*/React.createElement(_Menu.Item, {
      key: "ru"
    }, /*#__PURE__*/React.createElement("span", {
      role: "img",
      "aria-label": "Russian",
      className: "mr-2"
    }, "\uD83C\uDDF7\uD83C\uDDFA"), "\u0420\u0443\u0441\u0441\u043A\u0438\u0439"));
    return /*#__PURE__*/React.createElement("div", {
      className: "mr-4"
    }, /*#__PURE__*/React.createElement(_Dropdown, {
      overlay: langMenu,
      trigger: ['click']
    }, /*#__PURE__*/React.createElement("div", {
      className: styles.dropdown
    }, /*#__PURE__*/React.createElement("strong", {
      className: "text-uppercase"
    }, language))));
  }

}, _temp)) || _class);
export default LanguageSelector;