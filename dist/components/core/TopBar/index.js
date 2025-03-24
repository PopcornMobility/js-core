// import ProjectManagement from './ProjectManagement'
// import Breadcrumbs from '../Breadcrumbs'
import * as React from 'react';
import ProfileMenu from './ProfileMenu';
import LanguageSelector from './LanguageSelector';
import styles from './style.module.scss';
import { AdminContext } from '../Admin';

const TopBar = () => {
  const adminCtx = React.useContext(AdminContext);
  return /*#__PURE__*/React.createElement("div", {
    className: styles.topbar
  }, adminCtx.topBarExtra, /*#__PURE__*/React.createElement("div", {
    className: "ml-auto",
    style: {
      display: 'inline-flex'
    }
  }, /*#__PURE__*/React.createElement(LanguageSelector, null), /*#__PURE__*/React.createElement(ProfileMenu, null)));
};

export default TopBar;