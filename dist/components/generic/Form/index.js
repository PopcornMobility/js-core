function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from "react";
import { Form as AntForm, Input, Button, Select, DatePicker, InputNumber, Checkbox, Upload, TimePicker, AutoComplete, Row, Col } from "antd";
import moment from "moment";
import _ from "lodash"; // import QRScanner from "../QRScanner";

import countries from "./countries.json";
import "./style.css";
import RemoteSelect from "./remoteSelect";
const formItemLayout = {
  labelCol: {
    md: 8
  },
  wrapperCol: {
    md: 12
  }
};

const formTailLayout = layout => ({
  wrapperCol: layout || {
    md: {
      span: 16,
      offset: 8
    }
  }
}); // @AntForm.create()


class Form extends React.Component {
  constructor(...args) {
    super(...args);

    this.processValues = values => {
      const {
        legacy
      } = this.props;

      if (legacy) {
        console.log("values", values);
        const processed = {};
        Object.keys(values).forEach(key => {
          processed[key] = values[key] === null || values[key] === "" ? undefined : values[key];
        });
        return processed;
      }

      const processed = {};
      Object.keys(values).forEach(key => {
        processed[key] = _.isUndefined(values[key]) ? null : values[key];
      });
      return processed;
    };

    this.handleSubmit = e => {
      e.preventDefault();
      const {
        form,
        onSubmit,
        onError
      } = this.props;
      form.validateFields((errors, values) => {
        if (!errors && onSubmit) {
          onSubmit(this.processValues(values));
        } else if (onError) {
          onError(errors);
        }
      });
    };

    this.handleOnChange = field => {
      const {
        form: {
          getFieldsValue,
          setFieldsValue
        },
        onChange
      } = this.props;

      if (onChange) {
        // handle state update delays
        setTimeout(() => {
          onChange(field, getFieldsValue(), setFieldsValue);
        }, 1);
      }
    };

    this.getSelectItem = itemConfig => {
      const {
        field,
        type,
        placeholder,
        options,
        disabled,
        ...rest
      } = itemConfig;

      const select = mode => /*#__PURE__*/React.createElement(Select, _extends({
        mode: mode,
        showSearch: true,
        placeholder: placeholder,
        disabled: disabled,
        onChange: () => this.handleOnChange(field),
        filterOption: (input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }, rest), options.map(option => {
        const isString = !_.isObject(option);
        return /*#__PURE__*/React.createElement(Select.Option, {
          key: option,
          value: isString ? option : option.value
        }, isString ? option : option.text);
      }));

      return select(type);
    };

    this.getCountrySelectItem = (itemConfig, longNames = false) => {
      return this.getSelectItem({ ...itemConfig,
        type: "select",
        options: longNames ? countries : countries.map(country => country.value)
      });
    };

    this.getPrefixSelector = () => {
      const {
        form: {
          getFieldDecorator
        },
        values
      } = this.props;
      return getFieldDecorator("country_code", {
        initialValue: values && values.country_code || "RO"
      })(this.getCountrySelectItem());
    };

    this.fileUploadEvent = e => {
      if (Array.isArray(e)) {
        return e;
      }

      return e && e.fileList;
    };

    this.getItem = itemConfig => {
      const {
        field,
        type,
        placeholder,
        disabled,
        antdProps,
        ...rest
      } = itemConfig;

      switch (type) {
        case "remoteSelect":
          return /*#__PURE__*/React.createElement(RemoteSelect, {
            onChange: () => this.handleOnChange(field),
            itemConfig: itemConfig
          });

        case "select":
        case "tags":
        case "multiple":
          return this.getSelectItem(itemConfig);

        case "country":
          return this.getCountrySelectItem(itemConfig, true);

        case "phone":
          return /*#__PURE__*/React.createElement(Input, _extends({
            placeholder: placeholder,
            disabled: disabled,
            addonBefore: this.getPrefixSelector(),
            onChange: () => this.handleOnChange(field)
          }, rest));

        case "date":
          return /*#__PURE__*/React.createElement(DatePicker, _extends({
            placeholder: placeholder,
            disabled: disabled,
            onChange: () => this.handleOnChange(field)
          }, rest));

        case "time":
          return /*#__PURE__*/React.createElement(TimePicker, _extends({
            onChange: () => this.handleOnChange(field),
            placeholder: placeholder,
            disabled: disabled
          }, antdProps));

        case "number":
          return /*#__PURE__*/React.createElement(InputNumber, _extends({
            placeholder: placeholder,
            disabled: disabled,
            onChange: () => this.handleOnChange(field)
          }, rest));

        case "textarea":
          return /*#__PURE__*/React.createElement(Input.TextArea, _extends({
            placeholder: placeholder,
            disabled: disabled
          }, rest));

        case "password":
          return /*#__PURE__*/React.createElement(Input.Password, _extends({
            placeholder: placeholder,
            disabled: disabled,
            onChange: () => this.handleOnChange(field)
          }, rest));

        case "checkbox":
          return /*#__PURE__*/React.createElement(Checkbox, _extends({
            disabled: disabled,
            onChange: () => this.handleOnChange(field)
          }, rest), placeholder);

        case "file":
          return /*#__PURE__*/React.createElement(Upload, _extends({
            name: "file",
            disabled: disabled
          }, rest), /*#__PURE__*/React.createElement(Button, {
            icon: "upload"
          }, placeholder));

        case "autocomplete":
          return /*#__PURE__*/React.createElement(AutoComplete, _extends({
            placeholder: placeholder,
            disabled: disabled,
            onChange: () => this.handleOnChange(field)
          }, rest));

        case "custom":
          return null;

        default:
          return /*#__PURE__*/React.createElement(Input, _extends({
            placeholder: placeholder,
            disabled: disabled,
            onChange: () => this.handleOnChange(field)
          }, rest));
      }
    };

    this.getExtraProps = type => {
      switch (type) {
        case "checkbox":
          return {
            valuePropName: "checked"
          };

        case "file":
          return {
            valuePropName: "fileList",
            getValueFromEvent: this.fileUploadEvent
          };

        default:
          return {
            valuePropName: "value"
          };
      }
    };

    this.getFormItem = (itemConfig, isSubItem) => {
      const {
        form,
        errors,
        values,
        columnLayout
      } = this.props;
      const {
        field,
        label,
        type,
        // rules,
        items,
        render,
        layout: itemLayout
      } = itemConfig;
      let {
        props,
        initialValue
      } = itemConfig;
      const layout = itemLayout || columnLayout || {
        span: 24
      };

      if (type === "custom") {
        return /*#__PURE__*/React.createElement(Col, _extends({
          key: field
        }, layout), /*#__PURE__*/React.createElement(AntForm.Item, _extends({
          label: label,
          className: isSubItem ? "mb-0" : null
        }, props), render && render(form)));
      } // adjust value prop name, depending on input type
      // const extraProps = this.getExtraProps(type);
      // set field errors, if any


      if (errors && errors[field]) {
        props = { ...props,
          help: errors[field],
          validateStatus: "error"
        };
      } // set field values, based on values array
      // note: initialValue will be overridden


      if (values) {
        // This should enable field names like: 'a[0].b.c' to support arrays and objects
        initialValue = _.get(values, field);

        if (type === "date" && initialValue) {
          initialValue = moment(initialValue);
        }

        if (type === "time" && initialValue) {
          let format = "HH:mm:ss";

          if (itemConfig.antdProps && itemConfig.antdProps.format) {
            // eslint-disable-next-line prefer-destructuring
            format = itemConfig.antdProps.format;
          }

          initialValue = moment(initialValue, format);
        }
      } // const fieldDecoratorOptions = { rules, initialValue, ...extraProps };


      return /*#__PURE__*/React.createElement(Col, _extends({
        key: field
      }, layout), /*#__PURE__*/React.createElement(AntForm.Item, _extends({
        label: label
      }, props, {
        className: isSubItem ? "mb-0" : null
      }), !items ? this.getItem(itemConfig) : items.map(subItemConfig => this.getFormItem(subItemConfig, true))));
    };
  }

  render() {
    const {
      loading,
      submitText,
      compact,
      submitType,
      submitBlock,
      children,
      sectionConfig,
      sectionLayout,
      submitLayout
    } = this.props;
    let {
      config,
      layout
    } = this.props; // filter items based on hidden prop

    config = config && config.filter(item => item.hidden !== true); // backwords compatibility with older versions

    if (compact) {
      layout = "vertical";
    }

    return /*#__PURE__*/React.createElement(AntForm, _extends({}, (!layout || layout === "horizontal") && formItemLayout, {
      hideRequiredMark: true,
      onSubmit: this.handleSubmit,
      layout: layout,
      className: layout !== "inline" && "mb-4"
    }), !sectionConfig && /*#__PURE__*/React.createElement(Row, {
      gutter: 32
    }, config.map(itemConfig => this.getFormItem(itemConfig))), sectionConfig && sectionConfig.map((section, index) => {
      const {
        title,
        wrapper
      } = sectionLayout || {
        title: {
          md: 24,
          lg: 8
        },
        wrapper: {
          md: 24,
          lg: 16
        }
      };
      let {
        config: subConfig
      } = section;
      subConfig = subConfig && subConfig.filter(item => item.hidden !== true);
      return /*#__PURE__*/React.createElement(Row, {
        key: section.key || section.title || index,
        gutter: [32, 32],
        style: {
          borderBottom: "1px solid #F0F0F0"
        }
      }, /*#__PURE__*/React.createElement(Col, title, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 16,
          fontWeight: "bold"
        }
      }, section.title)), /*#__PURE__*/React.createElement(Col, wrapper, /*#__PURE__*/React.createElement(Row, {
        gutter: 32
      }, subConfig.map(itemConfig => this.getFormItem(itemConfig)))));
    }), children, /*#__PURE__*/React.createElement(AntForm.Item, formTailLayout(compact ? {
      span: 24
    } : submitLayout), /*#__PURE__*/React.createElement(Button, {
      type: submitType || "primary",
      htmlType: "submit",
      block: submitBlock,
      loading: loading,
      className: sectionConfig && "mt-4"
    }, submitText || "Submit")));
  }

}

export default Form;