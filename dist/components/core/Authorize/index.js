import "antd/es/notification/style";
import _notification from "antd/es/notification";
import "antd/es/popover/style";
import _Popover from "antd/es/popover";
import "antd/es/icon/style";
import _Icon from "antd/es/icon";
import "antd/es/tag/style";
import _Tag from "antd/es/tag";

var _dec, _class;

import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { checkAccess } from "../../../utils/auth";
import "./style.css";
const isDebug = process.env.REACT_APP_PERMISSIONS_DEBUG === 'true';

const DebugContainer = props => {
  const {
    isAuthorized,
    permissions,
    roles,
    children
  } = props;
  const color = isAuthorized ? 'green' : 'red';
  const style = {
    display: 'inherit',
    position: 'relative',
    boxShadow: `0px 0px 0px 1px ${color} inset`,
    padding: 5,
    borderRadius: 5
  };
  const lockStyle = {
    color
  };
  const content = /*#__PURE__*/React.createElement(React.Fragment, null, roles && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, "Roles:"), ' ', roles.map(role => /*#__PURE__*/React.createElement(_Tag, {
    key: role,
    className: "mb-1"
  }, role))), permissions && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, "Permissions:"), ' ', permissions.map(perm => /*#__PURE__*/React.createElement(_Tag, {
    key: perm,
    className: "mb-1"
  }, perm))));
  const title = /*#__PURE__*/React.createElement("span", {
    style: {
      color,
      fontWeight: 'bold'
    }
  }, isAuthorized ? 'Authorized' : 'Not authorized');
  return /*#__PURE__*/React.createElement("div", {
    style: style
  }, /*#__PURE__*/React.createElement(_Popover, {
    title: title,
    content: content
  }, /*#__PURE__*/React.createElement("div", {
    style: lockStyle,
    className: "auth-lock"
  }, /*#__PURE__*/React.createElement(_Icon, {
    type: "lock"
  }))), children);
};

let Authorize = (_dec = connect(({
  user
}) => ({
  user
})), _dec(_class = class Authorize extends React.Component {
  render() {
    const {
      user: {
        roles: userRoles,
        permissions: userPermissions
      }
    } = this.props; // current user role

    const {
      children,
      redirect = false,
      to = '/404',
      roles,
      permissions,
      notify,
      unauthorized = null
    } = this.props;
    const authorized = checkAccess(roles, userRoles) && checkAccess(permissions, userPermissions);

    const AuthorizedChildren = () => {
      // if user not equal needed role and if component is a page - make redirect to needed route
      if (!authorized && redirect) {
        if (notify) {
          _notification.error({
            message: 'Unauthorized access',
            description: 'You cannot access this page.'
          });
        }

        return /*#__PURE__*/React.createElement(Redirect, {
          to: to
        });
      } // if user not authorized return null to component


      if (!authorized && !isDebug) {
        return unauthorized;
      }

      if (!authorized && isDebug) {
        return /*#__PURE__*/React.createElement(DebugContainer, {
          isAuthorized: false,
          permissions: permissions,
          roles: roles
        }, children);
      }

      if (isDebug) {
        return /*#__PURE__*/React.createElement(DebugContainer, {
          isAuthorized: true,
          permissions: permissions,
          roles: roles
        }, children);
      } // if access is successful render children


      return /*#__PURE__*/React.createElement(React.Fragment, null, children);
    };

    return AuthorizedChildren();
  }

}) || _class);
export default Authorize;