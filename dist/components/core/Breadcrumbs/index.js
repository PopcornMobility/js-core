var _dec, _class, _temp;

import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduce } from 'lodash';
import styles from './style.module.scss';

const mapStateToProps = ({
  menu
}) => ({
  isMenuTop: menu.isMenuTop,
  menuTopData: menu.menuTopData,
  menuLeftData: menu.menuLeftData
});

let Breadcrumbs = (_dec = connect(mapStateToProps), withRouter(_class = _dec(_class = (_temp = class Breadcrumbs extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      breadcrumb: []
    };

    this.setBreadcrumbs = props => {
      const {
        isMenuTop,
        menuTopData,
        menuLeftData
      } = props;
      this.setState({
        breadcrumb: this.getBreadcrumb(props, isMenuTop ? menuTopData : menuLeftData)
      });
    };

    this.getBreadcrumb = (props, items) => {
      const [activeMenuItem, ...path] = this.getPath(items, props.location.pathname);

      if (activeMenuItem && path.length) {
        return path.reverse().map((item, index) => {
          if (index === path.length - 1) {
            return /*#__PURE__*/React.createElement("span", {
              key: item.key
            }, /*#__PURE__*/React.createElement("span", {
              className: `${styles.arrow} text-muted`
            }), /*#__PURE__*/React.createElement("span", {
              className: "text-muted"
            }, item.title), /*#__PURE__*/React.createElement("span", {
              className: styles.arrow
            }), /*#__PURE__*/React.createElement("strong", null, activeMenuItem.title));
          }

          return /*#__PURE__*/React.createElement("span", {
            key: item.key
          }, /*#__PURE__*/React.createElement("span", {
            className: `${styles.arrow} text-muted`
          }), /*#__PURE__*/React.createElement("span", {
            className: "text-muted"
          }, item.title));
        });
      }

      return /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
        className: styles.arrow
      }), /*#__PURE__*/React.createElement("strong", null, activeMenuItem.title));
    };
  }

  componentDidMount() {
    this.setBreadcrumbs(this.props);
  }

  componentWillReceiveProps(newProps) {
    this.setBreadcrumbs(newProps);
  }

  getPath(data, url, parents = []) {
    const items = reduce(data, (result, entry) => {
      if (result.length) {
        return result;
      }

      if (entry.url === url) {
        return [entry].concat(parents);
      }

      if (entry.children) {
        const nested = this.getPath(entry.children, url, [entry].concat(parents));
        return (result || []).concat(nested.filter(e => !!e));
      }

      return result;
    }, []);
    return items.length > 0 ? items : [false];
  }

  render() {
    const {
      breadcrumb
    } = this.state;
    return /*#__PURE__*/React.createElement("div", {
      className: styles.path
    }, /*#__PURE__*/React.createElement(Link, {
      to: "/dashboard",
      className: "text-muted"
    }, "Home"), breadcrumb);
  }

}, _temp)) || _class) || _class);
export default Breadcrumbs;