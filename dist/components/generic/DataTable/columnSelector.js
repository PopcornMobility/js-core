var _class, _temp;

import React from "react";
import { Switch, Button, Popover, Tooltip } from "antd";
import isObject from "lodash/isObject";
import store from "store";
import { injectIntl } from "react-intl";

let ColumnSelector = injectIntl(_class = (_temp = class ColumnSelector extends React.Component {
  constructor(...args) {
    super(...args);

    this.handleOnChange = (checked, event, dataIndex) => {
      const {
        onColumnSelectionChanged,
        settingsKey,
        columns
      } = this.props;
      const result = {};
      columns.forEach(el => {
        const keyOrDataIndex = el.dataIndex || el.key;
        result[keyOrDataIndex] = el.hidden;
      });
      result[dataIndex] = !checked;

      if (settingsKey) {
        store.set(`app.datatable.${settingsKey}`, {
          columnSelector: { ...result
          }
        });
      }

      onColumnSelectionChanged(result);
    };
  }

  componentDidMount() {
    const {
      onColumnSelectionChanged,
      settingsKey,
      columns
    } = this.props; // Check for settingsKey and localStorage settings
    // Apply once and send to parent <DataTable /> state

    if (settingsKey) {
      const tableSettings = store.get(`app.datatable.${settingsKey}`);

      if (tableSettings) {
        const columnSelectorSettings = tableSettings.columnSelector;

        if (columnSelectorSettings && isObject(columnSelectorSettings)) {
          const result = {};
          let newColumns = [...columns];
          newColumns = newColumns.map(col => {
            const keyOrDataIndex = col.dataIndex || col.key;

            if (columnSelectorSettings[keyOrDataIndex]) {
              col.hidden = columnSelectorSettings[keyOrDataIndex];
            }

            return col;
          });
          newColumns.forEach(el => {
            const keyOrDataIndex = el.dataIndex || el.key;
            result[keyOrDataIndex] = el.hidden;
          });
          onColumnSelectionChanged(result);
        }
      }
    }
  }

  render() {
    let {
      columns
    } = this.props;
    const {
      className,
      intl
    } = this.props; // Filter columns based on 'excludeFromColumnSelector' prop

    columns = columns.filter(el => el.excludeFromColumnSelector !== true);
    const settings = /*#__PURE__*/React.createElement("div", {
      style: {
        width: 200
      }
    }, columns.length > 0 ? columns.map(el => {
      const keyOrDataIndex = el.dataIndex || el.key;
      return /*#__PURE__*/React.createElement("div", {
        key: keyOrDataIndex,
        className: "mb-2"
      }, /*#__PURE__*/React.createElement(Switch, {
        className: "mr-3",
        checked: !el.hidden,
        onChange: (checked, event) => this.handleOnChange(checked, event, keyOrDataIndex)
      }), el.title);
    }) : "No columns selected");
    return /*#__PURE__*/React.createElement(Popover, {
      placement: "bottomRight",
      trigger: "click",
      content: settings
    }, /*#__PURE__*/React.createElement(Tooltip, {
      placement: "top",
      title: intl.formatMessage({
        id: "datatable.tooltips.columns"
      })
    }, /*#__PURE__*/React.createElement(Button, {
      className: className,
      icon: "table"
    })));
  }

}, _temp)) || _class;

export default ColumnSelector;