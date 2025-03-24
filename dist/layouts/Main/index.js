import "antd/es/layout/style";
import _Layout from "antd/es/layout";

var _dec, _class;

import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import TopBar from "../../components/core/TopBar";
import Menu from "../../components/core/Menu";

const mapStateToProps = ({
  settings
}) => ({
  isBorderless: settings.isBorderless,
  isSquaredBorders: settings.isSquaredBorders,
  isFixedWidth: settings.isFixedWidth,
  isMenuShadow: settings.isMenuShadow,
  isMenuTop: settings.isMenuTop
});

let MainLayout = (_dec = connect(mapStateToProps), withRouter(_class = _dec(_class = class MainLayout extends React.PureComponent {
  render() {
    const {
      children,
      isBorderless,
      isSquaredBorders,
      isFixedWidth,
      isMenuShadow,
      isMenuTop,
      menu
    } = this.props;
    return /*#__PURE__*/React.createElement(_Layout, {
      className: classNames({
        settings__borderLess: isBorderless,
        settings__squaredBorders: isSquaredBorders,
        settings__fixedWidth: isFixedWidth,
        settings__menuShadow: isMenuShadow,
        settings__menuTop: isMenuTop
      })
    }, /*#__PURE__*/React.createElement(Menu, {
      menu: menu
    }), /*#__PURE__*/React.createElement(_Layout, null, /*#__PURE__*/React.createElement(_Layout.Header, null, /*#__PURE__*/React.createElement(TopBar, null)), /*#__PURE__*/React.createElement(_Layout.Content, {
      style: {
        height: '100%',
        position: 'relative'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "utils__content"
    }, children)), /*#__PURE__*/React.createElement(_Layout.Footer, null)));
  }

}) || _class) || _class);
export default MainLayout;