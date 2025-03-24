import "antd/es/spin/style";
import _Spin from "antd/es/spin";
import "antd/es/select/style";
import _Select from "antd/es/select";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import debounce from 'lodash/debounce';
import isObject from 'lodash/isObject';
const {
  Option
} = _Select;
let latestFetch = 0;

class RemoteFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      value: [],
      fetching: false
    };

    this.fetchData = async value => {
      if (!value) {
        return;
      }

      this.setState({
        data: [],
        fetching: true
      });
      const {
        remoteSearch: {
          apiFn,
          paramSearchQuery
        }
      } = this.props;
      const params = {};
      params[paramSearchQuery] = value; // Update state 'data' with latest triggered fetch

      latestFetch += 1;
      const fetchID = latestFetch;
      const data = await apiFn(params);

      if (fetchID === latestFetch) {
        this.setState({
          data,
          fetching: false
        });
      }
    };

    this.handleChange = value => {
      const {
        tableDropdownFn: {
          setSelectedKeys,
          confirm
        }
      } = this.props;
      setSelectedKeys(value ? [value] : null);
      confirm();
      this.setState({
        value,
        data: [],
        fetching: false
      });
    };

    this.fetchData = debounce(this.fetchData, 800);
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const {
      fetching,
      data,
      value
    } = this.state;
    const {
      remoteSearch: {
        apiFn,
        paramSearchQuery,
        styleSelect,
        ...rest
      }
    } = this.props;
    return /*#__PURE__*/React.createElement(_Select, _extends({}, rest, {
      // DO NOT modify below default props
      style: styleSelect ? { ...styleSelect
      } : {
        width: '100%',
        marginBottom: 8,
        marginTop: 8
      },
      showSearch: true,
      onSearch: this.fetchData,
      onChange: this.handleChange,
      onFocus: () => this.fetchData(' '),
      notFoundContent: fetching ? /*#__PURE__*/React.createElement(_Spin, {
        size: "small"
      }) : null
    }), data.map(d => {
      const isString = !isObject(d);
      return /*#__PURE__*/React.createElement(Option, {
        key: d,
        value: isString ? d : d.value,
        title: isString ? d : d.text
      }, isString ? d : d.text);
    }));
  }

}

export default RemoteFilter;