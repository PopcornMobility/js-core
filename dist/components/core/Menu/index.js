var _dec, _class, _temp;

import 'rc-drawer/assets/index.css';
import React from 'react';
import DrawerMenu from 'rc-drawer';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import MenuLeft from "./MenuLeft";
import MenuTop from "./MenuTop";

const mapStateToProps = ({
  settings
}) => ({
  isMenuTop: settings.isMenuTop,
  isMobileMenuOpen: settings.isMobileMenuOpen,
  isMobileView: settings.isMobileView,
  isLightTheme: settings.isLightTheme
});

let AppMenu = (_dec = connect(mapStateToProps), withRouter(_class = _dec(_class = (_temp = class AppMenu extends React.Component {
  constructor(...args) {
    super(...args);

    this.toggleOpen = () => {
      const {
        dispatch,
        isMobileMenuOpen
      } = this.props;
      document.querySelector('#root').setAttribute('style', !isMobileMenuOpen ? 'overflow: hidden; width: 100%; height: 100%;' : '');
      dispatch({
        type: 'settings/CHANGE_SETTING',
        payload: {
          setting: 'isMobileMenuOpen',
          value: !isMobileMenuOpen
        }
      });
    };
  }

  render() {
    const {
      isMenuTop,
      isMobileMenuOpen,
      isMobileView,
      isLightTheme,
      menu: {
        left = [],
        top = []
      } = {}
    } = this.props;

    const BootstrappedMenu = () => {
      if (isMobileView) {
        return /*#__PURE__*/React.createElement(DrawerMenu, {
          getContainer: null,
          level: null,
          open: isMobileMenuOpen,
          onMaskClick: this.toggleOpen,
          onHandleClick: this.toggleOpen,
          className: isLightTheme ? 'drawer-light' : ''
        }, /*#__PURE__*/React.createElement(MenuLeft, {
          menu: left
        }));
      }

      if (isMenuTop) {
        return /*#__PURE__*/React.createElement(MenuTop, {
          menu: top
        });
      }

      return /*#__PURE__*/React.createElement(MenuLeft, {
        menu: left
      });
    };

    return BootstrappedMenu();
  }

}, _temp)) || _class) || _class);
export default AppMenu;