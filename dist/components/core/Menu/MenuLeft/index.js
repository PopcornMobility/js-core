var _dec, _class, _temp;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Menu, Layout, Tag, Popover } from "antd";
import { LockOutlined } from "@ant-design/icons";
import store from "store";
import { Scrollbars } from "react-custom-scrollbars";
import _ from "lodash";
import { checkAccess } from "../../../../utils/auth";
import styles from "./style.module.scss";
const {
  Sider
} = Layout;
const {
  SubMenu,
  Divider
} = Menu;
const isDebug = process.env.REACT_APP_PERMISSIONS_DEBUG === "true";

const DebugPopoverTitle = props => {
  const {
    isAuthorized
  } = props;
  const color = isAuthorized ? "green" : "red";
  return /*#__PURE__*/React.createElement("span", {
    style: {
      color,
      fontWeight: "bold"
    }
  }, isAuthorized ? "Authorized" : "Not authorized");
};

const DebugPopoverContent = props => {
  const {
    permissions,
    roles
  } = props;
  return /*#__PURE__*/React.createElement(React.Fragment, null, roles && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, "Roles:"), " ", roles.map(role => /*#__PURE__*/React.createElement(Tag, {
    key: role,
    className: "mb-1"
  }, role))), permissions && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, "Permissions:"), " ", permissions.map(perm => /*#__PURE__*/React.createElement(Tag, {
    key: perm,
    className: "mb-1"
  }, perm))));
};

const DebugLock = props => {
  const {
    isAuthorized,
    ...rest
  } = props;
  const color = isAuthorized ? "green" : "red";
  const style = {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 2,
    color,
    position: "absolute",
    right: -40,
    top: 0
  };
  return /*#__PURE__*/React.createElement(LockOutlined, _extends({}, rest, {
    style: style,
    className: "ml-2"
  }));
};

const mapStateToProps = ({
  menu,
  settings,
  user
}) => ({
  user,
  badges: menu.badges,
  isMenuCollapsed: settings.isMenuCollapsed,
  isMobileView: settings.isMobileView,
  isLightTheme: settings.isLightTheme
});

let MenuLeft = (_dec = connect(mapStateToProps), withRouter(_class = _dec(_class = (_temp = class MenuLeft extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      selectedKeys: store.get("app.menu.selectedKeys") || [],
      openedKeys: store.get("app.menu.openedKeys") || []
    };

    this.clearOpenedKeys = () => {
      this.setState({
        openedKeys: []
      });
      store.set("app.menu.openedKeys", []);
    };

    this.setSelectedKeys = () => {
      const {
        menu,
        location
      } = this.props;

      const flattenItems = (items, key) => items.reduce((flattenedItems, item) => {
        flattenedItems.push(item);

        if (Array.isArray(item[key])) {
          return flattenedItems.concat(flattenItems(item[key], key));
        }

        return flattenedItems;
      }, []);

      const selectedItem = _.find(flattenItems(menu, "children"), ["url", location.pathname]);

      const {
        selectedKeys: [currentSelection]
      } = this.state; // only update state when necessary

      if (selectedItem && selectedItem.key !== currentSelection) {
        this.setState({
          selectedKeys: selectedItem ? [selectedItem.key] : []
        });
      }
    };

    this.onCollapse = (value, type) => {
      const {
        dispatch,
        isMenuCollapsed
      } = this.props;

      if (type === "responsive" && isMenuCollapsed) {
        return;
      }

      dispatch({
        type: "settings/CHANGE_SETTING",
        payload: {
          setting: "isMenuCollapsed",
          value: !isMenuCollapsed
        }
      });
      this.setState({
        openedKeys: []
      });
    };

    this.onOpenChange = openedKeys => {
      store.set("app.menu.openedKeys", openedKeys);
      this.setState({
        openedKeys
      });
    };

    this.handleClick = e => {
      store.set("app.menu.selectedKeys", [e.key]);
      this.setState({
        selectedKeys: [e.key]
      });
    };

    this.generateMenuItems = () => {
      const {
        menu = [],
        badges,
        user: {
          roles: userRoles,
          permissions: userPermissions
        }
      } = this.props;

      const isAuthorized = (roles, permissions) => {
        return checkAccess(roles, userRoles) && checkAccess(permissions, userPermissions);
      };

      const generateItem = item => {
        const {
          key,
          title,
          url,
          icon,
          disabled,
          badge,
          roles,
          permissions
        } = item;

        if (item.divider) {
          return /*#__PURE__*/React.createElement(Divider, {
            key: Math.random()
          });
        }

        const authorized = isAuthorized(roles, permissions);
        const debugPopover = isDebug && /*#__PURE__*/React.createElement(Popover, {
          title: /*#__PURE__*/React.createElement(DebugPopoverTitle, {
            isAuthorized: authorized
          }),
          content: /*#__PURE__*/React.createElement(DebugPopoverContent, {
            permissions: permissions,
            roles: roles
          }),
          zIndex: 1050
        }, /*#__PURE__*/React.createElement(DebugLock, {
          isAuthorized: authorized
        }));

        if (item.url) {
          const itemWithUrl = item.target ? /*#__PURE__*/React.createElement("a", {
            href: url,
            target: item.target,
            rel: "noopener noreferrer"
          }, icon && /*#__PURE__*/React.createElement("span", {
            className: `${icon} ${styles.icon} icon-collapsed-hidden`
          }), /*#__PURE__*/React.createElement("span", {
            className: styles.title
          }, title, debugPopover), badge && /*#__PURE__*/React.createElement("span", {
            className: "badge badge-light badge-collapsed-hidden ml-2"
          }, badges[badge])) : /*#__PURE__*/React.createElement(Link, {
            to: url
          }, icon && /*#__PURE__*/React.createElement("span", {
            className: `${icon} ${styles.icon} icon-collapsed-hidden`
          }), /*#__PURE__*/React.createElement("span", {
            className: styles.title
          }, title, debugPopover), badge && /*#__PURE__*/React.createElement("span", {
            className: "badge badge-light badge-collapsed-hidden ml-2"
          }, badges[badge]));
          return /*#__PURE__*/React.createElement(Menu.Item, {
            key: key,
            disabled: disabled
          }, itemWithUrl);
        }

        const normalItem = /*#__PURE__*/React.createElement(Menu.Item, {
          key: key,
          disabled: disabled
        }, icon && /*#__PURE__*/React.createElement("span", {
          className: `${icon} ${styles.icon} icon-collapsed-hidden`
        }), /*#__PURE__*/React.createElement("span", {
          className: styles.title
        }, title, debugPopover), badge && /*#__PURE__*/React.createElement("span", {
          className: "badge badge-light badge-collapsed-hidden ml-2"
        }, badges[badge]));
        return normalItem;
      };

      const generateSubmenu = items => items.map(menuItem => {
        const {
          title,
          icon,
          key,
          children,
          roles,
          permissions
        } = menuItem;
        const authorized = isAuthorized(roles, permissions);

        if (!isDebug && !authorized) {
          return null;
        }

        const debugPopover = isDebug && /*#__PURE__*/React.createElement(Popover, {
          title: /*#__PURE__*/React.createElement(DebugPopoverTitle, {
            isAuthorized: authorized
          }),
          content: /*#__PURE__*/React.createElement(DebugPopoverContent, {
            permissions: permissions,
            roles: roles
          }),
          zIndex: 1050
        }, /*#__PURE__*/React.createElement(DebugLock, {
          isAuthorized: authorized
        }));

        if (children) {
          const titleComponent = /*#__PURE__*/React.createElement("span", {
            key: key
          }, /*#__PURE__*/React.createElement("span", {
            className: styles.title
          }, title, debugPopover), icon && /*#__PURE__*/React.createElement("span", {
            className: `${icon} ${styles.icon}`
          }));
          return /*#__PURE__*/React.createElement(SubMenu, {
            title: titleComponent,
            key: key
          }, generateSubmenu(children));
        }

        return generateItem(menuItem);
      });

      return generateSubmenu(menu);
    };
  }

  componentDidMount() {
    this.setSelectedKeys();
  }

  componentDidUpdate(prevProps) {
    const {
      isMenuCollapsed,
      isMobileView
    } = this.props;

    if (prevProps.isMenuCollapsed !== isMenuCollapsed && !isMobileView) {
      this.clearOpenedKeys();
    }
  }

  render() {
    const {
      selectedKeys,
      openedKeys
    } = this.state;
    const {
      isMobileView,
      isMenuCollapsed,
      isLightTheme
    } = this.props;
    const menuSettings = isMobileView ? {
      width: 256,
      collapsible: false,
      collapsed: false,
      onCollapse: this.onCollapse
    } : {
      width: 256,
      collapsible: true,
      collapsed: isMenuCollapsed,
      onCollapse: this.onCollapse,
      breakpoint: "lg"
    };
    const menu = this.generateMenuItems();
    return /*#__PURE__*/React.createElement(Sider, _extends({}, menuSettings, {
      className: isLightTheme ? `${styles.menu} ${styles.light}` : styles.menu
    }), /*#__PURE__*/React.createElement("div", {
      className: styles.logo
    }, /*#__PURE__*/React.createElement("div", {
      className: styles.logoContainer
    }, /*#__PURE__*/React.createElement("img", {
      src: `/resources/images/logo${menuSettings.collapsed ? "-mobile" : ""}.png`,
      alt: ""
    }))), /*#__PURE__*/React.createElement(Scrollbars, {
      className: isMobileView ? styles.scrollbarMobile : styles.scrollbarDesktop,
      renderThumbVertical: ({
        style,
        ...props
      }) => /*#__PURE__*/React.createElement("div", _extends({}, props, {
        style: { ...style,
          width: "4px",
          borderRadius: "inherit",
          backgroundColor: "#c5cdd2",
          left: "1px"
        }
      })),
      autoHide: true
    }, /*#__PURE__*/React.createElement(Menu, {
      theme: isLightTheme ? "light" : "dark",
      onClick: this.handleClick,
      selectedKeys: selectedKeys,
      openKeys: openedKeys,
      onOpenChange: this.onOpenChange,
      mode: "inline",
      className: styles.navigation
    }, menu)));
  }

}, _temp)) || _class) || _class);
export default MenuLeft;