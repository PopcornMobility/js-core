import React from 'react';
import { Menu, Dropdown } from 'antd';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import styles from './style.module.scss';

class ProjectManagement extends React.Component {
  render() {
    const menu = /*#__PURE__*/React.createElement(Menu, {
      selectable: false
    }, /*#__PURE__*/React.createElement(Menu.ItemGroup, {
      title: "Active"
    }, /*#__PURE__*/React.createElement(Menu.Item, null, /*#__PURE__*/React.createElement(Link, {
      to: "/"
    }, "Project Management")), /*#__PURE__*/React.createElement(Menu.Item, null, /*#__PURE__*/React.createElement(Link, {
      to: "/"
    }, "User Interface Development")), /*#__PURE__*/React.createElement(Menu.Item, null, /*#__PURE__*/React.createElement(Link, {
      to: "/"
    }, "Documentation"))), /*#__PURE__*/React.createElement(Menu.ItemGroup, {
      title: "Inactive"
    }, /*#__PURE__*/React.createElement(Menu.Item, null, /*#__PURE__*/React.createElement(Link, {
      to: "/"
    }, "Marketing"))), /*#__PURE__*/React.createElement(Menu.Divider, null), /*#__PURE__*/React.createElement(Menu.Item, null, /*#__PURE__*/React.createElement(Link, {
      to: "/"
    }, /*#__PURE__*/React.createElement("i", {
      className: `${styles.menuIcon} icmn-cog`
    }), " Settings")));
    return /*#__PURE__*/React.createElement(Dropdown, {
      overlay: menu,
      trigger: ['click'],
      placement: "bottomLeft"
    }, /*#__PURE__*/React.createElement("div", {
      className: styles.dropdown
    }, /*#__PURE__*/React.createElement("i", {
      className: `${styles.icon} icmn-database`
    }), /*#__PURE__*/React.createElement("span", {
      className: "d-none d-xl-inline"
    }, /*#__PURE__*/React.createElement("strong", null, /*#__PURE__*/React.createElement(FormattedMessage, {
      id: "topBar.projectManagement"
    })))));
  }

}

export default ProjectManagement;