import React, { PureComponent } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
export default class Index extends PureComponent {
  render() {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        minHeight: 'calc(100vh - 500px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement(Helmet, {
      title: "Not Found"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: '560px',
        backgroundColor: '#fff',
        padding: '80px 30px',
        margin: '100px auto',
        borderRadius: '10px',
        flex: '1'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: '400px',
        margin: '0 auto'
      }
    }, /*#__PURE__*/React.createElement("h1", {
      className: "font-size-36 mb-2"
    }, "Page not found"), /*#__PURE__*/React.createElement("p", {
      className: "mb-3"
    }, "The page is deprecated, deleted, or does not exist at all"), /*#__PURE__*/React.createElement("h1", {
      className: "font-size-80 mb-4 font-weight-bold"
    }, "404 \u2014"), /*#__PURE__*/React.createElement(Link, {
      to: "/",
      className: "btn"
    }, "\u2190 Go back to the home page"))));
  }

}