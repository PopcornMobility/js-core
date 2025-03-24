var _class;

/* eslint react/no-multi-comp: 0 */

/* eslint camelcase: 0 */
import React from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import ReactLoadable from "react-loadable";
import Loader from "../Loader";
import IndexLayout from "../../../layouts";
import NotFoundPage from "../../../pages/404";
export const Loadable = (loader, props) => ReactLoadable({
  loader,
  delay: false,
  loading: () => /*#__PURE__*/React.createElement(Loader, null),

  render(loaded) {
    const Component = loaded.default;
    return /*#__PURE__*/React.createElement(Component, props);
  }

});

let ModalSwitch = withRouter(_class = class ModalSwitch extends React.Component {
  constructor(props) {
    super(props);
    const {
      location: previousLocation
    } = this.props;
    this.previousLocation = previousLocation;
  }

  UNSAFE_componentWillUpdate(nextProps) {
    const {
      location
    } = this.props;
    const {
      history
    } = nextProps;

    if (history.action !== "POP" && (!location.state || !location.state.modal)) {
      this.previousLocation = location;
    }
  }

  render() {
    const {
      location,
      routes
    } = this.props;
    const isModal = !!(location.state && location.state.modal && this.previousLocation !== location); // not initial render

    return /*#__PURE__*/React.createElement(Switch, {
      location: isModal ? this.previousLocation : location
    }, /*#__PURE__*/React.createElement(Route, {
      exact: true,
      path: "/",
      render: () => /*#__PURE__*/React.createElement(Redirect, {
        to: "/dashboard"
      })
    }), routes.map(route => /*#__PURE__*/React.createElement(Route, {
      path: route.path,
      component: !route.modal && route.component,
      key: route.path,
      exact: route.exact
    })), /*#__PURE__*/React.createElement(Route, {
      component: NotFoundPage
    }));
  }

}) || _class;

class Router extends React.Component {
  render() {
    const {
      history,
      routes,
      menu,
      title
    } = this.props;
    return /*#__PURE__*/React.createElement(ConnectedRouter, {
      history: history
    }, /*#__PURE__*/React.createElement(IndexLayout, {
      menu: menu,
      title: title
    }, /*#__PURE__*/React.createElement(ModalSwitch, {
      routes: routes
    })), routes.filter(route => route.modal === true).map(route => /*#__PURE__*/React.createElement(Route, {
      path: route.path,
      component: route.component,
      key: route.path,
      exact: route.exact
    })));
  }

}

export default Router;