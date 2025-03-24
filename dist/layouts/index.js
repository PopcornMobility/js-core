var _dec, _class, _temp;

import React, { Fragment } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import NProgress from "nprogress";
import { Helmet } from "react-helmet";
import Loader from "../components/core/Loader";
import PublicLayout from "./Public";
import LoginLayout from "./Login";
import MainLayout from "./Main";
const Layouts = {
  public: PublicLayout,
  login: LoginLayout,
  main: MainLayout
};
let IndexLayout = (_dec = connect(({
  user
}) => ({
  user
})), withRouter(_class = _dec(_class = (_temp = class IndexLayout extends React.PureComponent {
  constructor(...args) {
    super(...args);
    this.previousPath = "";
  }

  componentDidUpdate(prevProps) {
    const {
      location
    } = this.props;
    const {
      prevLocation
    } = prevProps;

    if (location !== prevLocation) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    const {
      children,
      location: {
        pathname,
        search
      },
      user,
      menu,
      title
    } = this.props;
    NProgress.configure({
      showSpinner: false
    }); // NProgress Management

    const currentPath = pathname + search;

    if (currentPath !== this.previousPath) {
      NProgress.start();
    }

    setTimeout(() => {
      NProgress.done();
      this.previousPath = currentPath;
    }, 500); // Layout Rendering

    const getLayout = () => {
      if (pathname === "/") {
        return "public";
      }

      if (/^\/auth(?=\/|$)/i.test(pathname)) {
        return "login";
      }

      return "main";
    };

    const Container = Layouts[getLayout()];
    const isUserAuthorized = user.authorized;
    const isUserLoading = user.loading;
    const isLoginLayout = getLayout() === "login";

    const BootstrappedLayout = () => {
      // show loader when user in check authorization process, not authorized yet and not on login pages
      if (isUserLoading && !isUserAuthorized && !isLoginLayout) {
        return /*#__PURE__*/React.createElement(Loader, null);
      } // redirect to login page if current is not login page and user not authorized


      if (!isLoginLayout && !isUserAuthorized) {
        return /*#__PURE__*/React.createElement(Redirect, {
          to: "/auth/login"
        });
      } // redirect to main dashboard when user on login page and authorized


      if (isLoginLayout && isUserAuthorized) {
        return /*#__PURE__*/React.createElement(Redirect, {
          to: "/dashboard"
        });
      } // in other case render previously set layout


      return /*#__PURE__*/React.createElement(Container, {
        menu: menu
      }, children);
    };

    return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(Helmet, {
      titleTemplate: `${title || "Admin"} | %s`,
      title: "Dashboard"
    }), BootstrappedLayout());
  }

}, _temp)) || _class) || _class);
export default IndexLayout;