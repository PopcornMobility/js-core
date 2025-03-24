import "antd/es/modal/style";
import _Modal from "antd/es/modal";
import "antd/es/icon/style";
import _Icon from "antd/es/icon";
import "antd/es/tabs/style";
import _Tabs from "antd/es/tabs";

var _dec, _class, _temp;

import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
const {
  TabPane
} = _Tabs;
let DetailsModal = (_dec = connect(({
  settings
}) => ({
  settings
})), withRouter(_class = _dec(_class = (_temp = class DetailsModal extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      modalVisible: true
    };

    this.handleCancel = () => {
      const {
        history,
        location: {
          state
        },
        backLocation
      } = this.props;
      this.setState({
        modalVisible: false
      }); // when opening an user profile url directly
      // (by clicking a link or typing it in the browser address bar)
      // going back is not possible or might have unwanted consequences
      // (e.g. go back to a blank page), so we should avoid it
      // modal=true is only set while normally navigating the app

      if (state && state.modal) {
        history.goBack();
      } else if (backLocation) {
        history.push(backLocation);
      }
    };
  }

  render() {
    const {
      modalVisible
    } = this.state;
    const {
      settings: {
        isMobileView
      },
      title: modalTitle,
      titleComponent,
      children,
      tabs,
      location: {
        hash,
        state: {
          selectedTab
        } = {}
      },
      history
    } = this.props;

    const tabTitle = (icon, title) => /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(_Icon, {
      className: classnames({
        'mr-0': isMobileView
      }),
      type: icon
    }), isMobileView ? '' : ` ${title}`);

    let defaultActiveKey = '';

    if (hash !== '') {
      defaultActiveKey = hash.replace('#', '');
    } else {
      defaultActiveKey = selectedTab;
    }

    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Helmet, {
      title: modalTitle
    }), /*#__PURE__*/React.createElement(_Modal, {
      visible: modalVisible,
      title: /*#__PURE__*/React.createElement("div", null, modalTitle, " ", titleComponent),
      style: {
        maxWidth: isMobileView ? null : 1240,
        top: isMobileView ? 72 : 80
      },
      width: isMobileView ? null : '90%',
      onCancel: this.handleCancel,
      footer: null
    }, tabs && /*#__PURE__*/React.createElement(_Tabs, {
      onTabClick: key => {
        history.replace({
          hash: key,
          state: {
            modal: true
          }
        });
      },
      type: isMobileView ? 'card' : 'line',
      defaultActiveKey: defaultActiveKey
    }, tabs.map(tab => /*#__PURE__*/React.createElement(TabPane, {
      tab: tabTitle(tab.icon, tab.title),
      key: tab.key || tab.title.toLowerCase()
    }, tab.component))), children));
  }

}, _temp)) || _class) || _class);
export default DetailsModal;