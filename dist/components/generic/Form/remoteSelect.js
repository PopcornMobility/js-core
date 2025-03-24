import "antd/es/spin/style";
import _Spin from "antd/es/spin";
import "antd/es/select/style";
import _Select from "antd/es/select";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import debounce from 'lodash/debounce';
import isObject from 'lodash/isObject';
import isEqual from 'lodash/isEqual';
const {
  Option
} = _Select;
/* Props explaining:

remoteSearch: {
  filterOption: false, 
      // From Antd
  mode: "multiple", 
      // From Antd
  {...rest}  
      // Can contain ANTD Select props from documentation
  paramSearchQuery: 'search', 
      **REQUIRED** The actual query for URL 
  apiFn(params), 
      **REQUIRED** Should return an array of desired values. Can use fetch, axios etc ...
}

apiFn example : 
.then(response => response.json())
.then(body => {
  // OBJECT with text - value
  result = body.data.map(user => ({
    text: `${user.first_name} ${user.last_name}`,
    value: user.id,
  }));

  // ARRAY as desired form
  result = body.data.map(user => user.first_name);
});

*/

let latestFetch = 0;

class RemoteSelect extends React.Component {
  constructor(props) {
    super(props);

    this.componentDidUpdate = prevProps => {
      const {
        itemConfig: {
          options
        }
      } = this.props;
      const {
        itemConfig: {
          options: prevOptions
        }
      } = prevProps;

      if (!isEqual(prevOptions, options)) {
        this.setState({
          preOptions: options
        });
      }
    };

    this.fetchData = async value => {
      // No need to call API search without value
      if (!value) {
        return;
      }

      this.setState({
        data: [],
        fetching: true
      });
      const {
        itemConfig: {
          remoteSearch: {
            apiFn,
            paramSearchQuery
          }
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
          fetching: false,
          preOptions: []
        });
      }
    };

    this.handleChange = (value, option) => {
      const {
        onChange
      } = this.props;
      onChange(value, option);
    };

    const {
      itemConfig: {
        options: _options
      }
    } = this.props;
    this.fetchData = debounce(this.fetchData, 800);
    this.state = {
      data: [],
      // eslint-disable-next-line react/no-unused-state
      value: [],
      fetching: false,
      preOptions: _options || []
    };
  }

  render() {
    const {
      fetching,
      data,
      preOptions
    } = this.state;
    const {
      itemConfig: {
        remoteSearch: {
          apiFn,
          paramSearchQuery,
          ...restRS
        },
        disabled
      },
      // pass value from Form's getFieldDecorator() to <Select>
      ...restProps
    } = this.props;
    const dataFiltered = data.filter(x => !preOptions.some(y => y.value === x.value));
    const newData = dataFiltered.concat(preOptions);
    return /*#__PURE__*/React.createElement(_Select, _extends({}, restRS, restProps, {
      disabled: disabled,
      showSearch: true,
      allowClear: true,
      onSearch: this.fetchData,
      onFocus: () => this.fetchData(' '),
      onChange: this.handleChange,
      notFoundContent: fetching ? /*#__PURE__*/React.createElement(_Spin, {
        size: "small"
      }) : null
    }), newData.map(d => {
      const isString = !isObject(d);
      return /*#__PURE__*/React.createElement(Option, {
        key: isString ? d : JSON.stringify(d),
        value: isString ? d : d.value,
        title: isString ? d : d.text,
        extra: d
      }, isString ? d : d.text);
    }));
  }

}

export default RemoteSelect;