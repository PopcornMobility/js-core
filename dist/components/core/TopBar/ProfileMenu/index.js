import "antd/es/dropdown/style";
import _Dropdown from "antd/es/dropdown";
import "antd/es/avatar/style";
import _Avatar from "antd/es/avatar";
import "antd/es/menu/style";
import _Menu from "antd/es/menu";

var _dec, _class, _temp;

import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl'; // import { APP_LAST_UPDATE } from 'utils/constants'

import styles from "./style.module.scss";
let ProfileMenu = (_dec = connect(({
  user
}) => ({
  user
})), _dec(_class = (_temp = class ProfileMenu extends React.Component {
  constructor(...args) {
    super(...args);

    this.logout = () => {
      const {
        dispatch
      } = this.props;
      dispatch({
        type: 'user/LOGOUT'
      });
    };

    this.reload = () => {
      window.location.reload(true);
    };
  }

  render() {
    const {
      user
    } = this.props;
    const menu = /*#__PURE__*/React.createElement(_Menu, {
      selectable: false
    }, /*#__PURE__*/React.createElement(_Menu.Item, null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FormattedMessage, {
      id: "topBar.profileMenu.hello"
    }), ",", ' ', /*#__PURE__*/React.createElement("strong", null, user.name || 'Anonymous')), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, /*#__PURE__*/React.createElement(FormattedMessage, {
      id: "topBar.profileMenu.role"
    }), ":", ' '), user.roles.join(', '))), /*#__PURE__*/React.createElement(_Menu.Divider, null), /*#__PURE__*/React.createElement(_Menu.Item, null, /*#__PURE__*/React.createElement("a", {
      href: "#",
      onClick: this.reload
    }, /*#__PURE__*/React.createElement("i", {
      className: `${styles.menuIcon} icmn-spinner11`
    }), /*#__PURE__*/React.createElement(FormattedMessage, {
      id: "topBar.profileMenu.refresh"
    }))), /*#__PURE__*/React.createElement(_Menu.Divider, null), /*#__PURE__*/React.createElement(_Menu.Item, null, /*#__PURE__*/React.createElement("a", {
      href: "#",
      onClick: this.logout
    }, /*#__PURE__*/React.createElement("i", {
      className: `${styles.menuIcon} icmn-exit`
    }), /*#__PURE__*/React.createElement(FormattedMessage, {
      id: "topBar.profileMenu.logout"
    }))));
    return /*#__PURE__*/React.createElement(_Dropdown, {
      overlay: menu,
      trigger: ['click']
    }, /*#__PURE__*/React.createElement("div", {
      className: styles.dropdown
    }, /*#__PURE__*/React.createElement(_Avatar, {
      className: styles.avatar,
      shape: "square",
      size: "large",
      src: user.profile_picture,
      icon: "user"
    })));
  }

}, _temp)) || _class);
export default ProfileMenu;