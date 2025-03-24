import "antd/es/menu/style";
import _Menu from "antd/es/menu";

var _dec, _class, _temp;

import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import store from 'store';
import _ from 'lodash';
import styles from "./style.module.scss";
const {
  SubMenu,
  Divider
} = _Menu;

const mapStateToProps = ({
  menu,
  settings
}) => ({
  menuData: menu.menuTopData,
  isLightTheme: settings.isLightTheme,
  isSettingsOpen: settings.isSettingsOpen
});

let MenuTop = (_dec = connect(mapStateToProps), withRouter(_class = _dec(_class = (_temp = class MenuTop extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      selectedKeys: store.get('app.menu.selectedKeys') || []
    };

    this.setSelectedKeys = props => {
      const {
        menuData
      } = this.props;

      const flattenItems = (items, key) => items.reduce((flattenedItems, item) => {
        flattenedItems.push(item);

        if (Array.isArray(item[key])) {
          return flattenedItems.concat(flattenItems(item[key], key));
        }

        return flattenedItems;
      }, []);

      const selectedItem = _.find(flattenItems(menuData, 'children'), ['url', props.location.pathname]);

      this.setState({
        selectedKeys: selectedItem ? [selectedItem.key] : []
      });
    };

    this.handleClick = e => {
      const {
        dispatch,
        isSettingsOpen
      } = this.props;
      store.set('app.menu.selectedKeys', [e.key]);

      if (e.key === 'settings') {
        dispatch({
          type: 'settings/CHANGE_SETTING',
          payload: {
            setting: 'isSettingsOpen',
            value: !isSettingsOpen
          }
        });
        return;
      }

      this.setState({
        selectedKeys: [e.key]
      });
    };

    this.generateMenuItems = () => {
      const {
        menuData = []
      } = this.props;

      const generateItem = item => {
        const {
          key,
          title,
          url,
          icon,
          pro,
          disabled
        } = item;

        if (item.divider) {
          return /*#__PURE__*/React.createElement(Divider, {
            key: Math.random()
          });
        }

        if (item.url) {
          return /*#__PURE__*/React.createElement(_Menu.Item, {
            key: key,
            disabled: disabled
          }, item.target ? /*#__PURE__*/React.createElement("a", {
            href: url,
            target: item.target,
            rel: "noopener noreferrer"
          }, icon && /*#__PURE__*/React.createElement("span", {
            className: `${icon} ${styles.icon}`
          }), /*#__PURE__*/React.createElement("span", {
            className: styles.title
          }, title), pro && /*#__PURE__*/React.createElement("span", {
            className: "badge badge-primary ml-2"
          }, "PRO")) : /*#__PURE__*/React.createElement(Link, {
            to: url
          }, icon && /*#__PURE__*/React.createElement("span", {
            className: `${icon} ${styles.icon}`
          }), /*#__PURE__*/React.createElement("span", {
            className: styles.title
          }, title), pro && /*#__PURE__*/React.createElement("span", {
            className: "badge badge-primary ml-2"
          }, "PRO")));
        }

        return /*#__PURE__*/React.createElement(_Menu.Item, {
          key: key,
          disabled: disabled
        }, icon && /*#__PURE__*/React.createElement("span", {
          className: `${icon} ${styles.icon}`
        }), /*#__PURE__*/React.createElement("span", {
          className: styles.title
        }, title), pro && /*#__PURE__*/React.createElement("span", {
          className: "badge badge-primary ml-2"
        }, "PRO"));
      };

      const generateSubmenu = items => items.map(menuItem => {
        if (menuItem.children) {
          const subMenuTitle = /*#__PURE__*/React.createElement("span", {
            className: styles.menu,
            key: menuItem.key
          }, /*#__PURE__*/React.createElement("span", {
            className: styles.title
          }, menuItem.title), menuItem.icon && /*#__PURE__*/React.createElement("span", {
            className: `${menuItem.icon} ${styles.icon}`
          }));
          return /*#__PURE__*/React.createElement(SubMenu, {
            title: subMenuTitle,
            key: menuItem.key
          }, generateSubmenu(menuItem.children));
        }

        return generateItem(menuItem);
      });

      return menuData.map(menuItem => {
        if (menuItem.children) {
          const subMenuTitle = /*#__PURE__*/React.createElement("span", {
            className: styles.menu,
            key: menuItem.key
          }, /*#__PURE__*/React.createElement("span", {
            className: styles.title
          }, menuItem.title), menuItem.icon && /*#__PURE__*/React.createElement("span", {
            className: `${menuItem.icon} ${styles.icon}`
          }));
          return /*#__PURE__*/React.createElement(SubMenu, {
            title: subMenuTitle,
            key: menuItem.key
          }, generateSubmenu(menuItem.children));
        }

        return generateItem(menuItem);
      });
    };
  }

  componentWillMount() {
    this.setSelectedKeys(this.props);
  }

  componentWillReceiveProps(newProps) {
    this.setSelectedKeys(newProps);
  }

  render() {
    const {
      selectedKeys
    } = this.state;
    const {
      isLightTheme
    } = this.props;
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: styles.logo
    }, /*#__PURE__*/React.createElement("div", {
      className: styles.logoContainer
    }, /*#__PURE__*/React.createElement("img", {
      src: "resources/images/logo-inverse.png",
      alt: "logo"
    }))), /*#__PURE__*/React.createElement(_Menu, {
      theme: isLightTheme ? 'light' : 'dark',
      onClick: this.handleClick,
      selectedKeys: selectedKeys,
      mode: "horizontal"
    }, this.generateMenuItems()));
  }

}, _temp)) || _class) || _class);
export default MenuTop;