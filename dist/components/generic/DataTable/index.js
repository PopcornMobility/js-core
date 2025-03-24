import "antd/es/table/style";
import _Table from "antd/es/table";
import "antd/es/row/style";
import _Row from "antd/es/row";
import "antd/es/tooltip/style";
import _Tooltip from "antd/es/tooltip";
import "antd/es/button/style";
import _Button from "antd/es/button";
import "antd/es/col/style";
import _Col from "antd/es/col";
import "antd/es/input/style";
import _Input from "antd/es/input";
import "antd/es/icon/style";
import _Icon from "antd/es/icon";

var _dec, _class, _temp;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import download from 'downloadjs';
import { injectIntl } from 'react-intl';
import net from "../../../utils/net";
import RemoteFilter from "./remoteFilter";
import ColumnSelector from "./columnSelector";
let DataTable = (_dec = connect(({
  settings: {
    isMobileView
  }
}) => ({
  isMobileView
})), injectIntl(_class = _dec(_class = (_temp = class DataTable extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      params: {
        search: '',
        page: 1,
        limit: 25 // default page size

      },
      columnSelector: {}
    };

    this.getParams = () => {
      const {
        filters,
        loadActionPayload,
        columns
      } = this.props;
      let {
        params
      } = this.state;
      const defaultSortableColumns = columns.filter(column => column.defaultSortOrder && column.dataIndex); // define default sorter, if none already specified by user

      if (defaultSortableColumns.length > 0 && !params.sorter) {
        const col = defaultSortableColumns[0];
        params = { ...params,
          sorter: {
            field: col.dataIndex,
            order: col.defaultSortOrder === 'ascend' ? 'ASC' : 'DESC'
          }
        };
      } // if filters have been set as a prop, merge with the ones from state


      if (filters) {
        params = { ...params,
          filters: { ...params.filters,
            ...filters
          }
        };
      } // if extra load action params were set as a prop, merge with those as well

      /* 
        Preserve state params filters and prop filters
        Merge above with filters from loadActionPayload filters
      */


      if (loadActionPayload) {
        const {
          filters: filtersFromPayload,
          ...rest
        } = loadActionPayload;
        params = { ...params,
          ...rest
        };

        if (filtersFromPayload) {
          params = { ...params,
            filters: { ...params.filters,
              ...filtersFromPayload
            }
          };
        }
      }

      return params;
    };

    this.load = () => {
      const {
        dispatch,
        loadAction
      } = this.props;
      dispatch(loadAction(this.getParams()));
    };

    this.handleTableChange = (pagination, filters, sorter) => {
      const {
        params: {
          search
        }
      } = this.state; // only keep the search value from the old params object, the rest should be rebuilt

      let params = {
        search,
        page: pagination.current,
        limit: pagination.pageSize
      }; // only keep non null filters

      const cleanFilters = Object.entries(filters).filter(entry => entry[1] !== null);

      if (cleanFilters.length !== 0) {
        params = { ...params,
          filters: Object.fromEntries(cleanFilters)
        };
      } // only store sorter if it's non empty, otherwise the API might fail


      if (sorter.field && sorter.order) {
        params = { ...params,
          sorter: {
            field: sorter.field,
            order: sorter.order === 'ascend' ? 'ASC' : 'DESC'
          }
        };
      } // persist the final object so we can use it when searching


      this.setState({
        params
      }, () => this.load());
    };

    this.handleSearch = search => {
      let {
        params
      } = this.state;
      params = { ...params,
        page: 1,
        // reset current page when searching
        search
      };
      this.setState({
        params
      }, () => this.load());
    };

    this.handleSearchInputChange = e => {
      const {
        params
      } = this.state;
      this.setState({
        params: { ...params,
          search: e.target.value
        }
      });
    };

    this.clearFilters = () => {
      const {
        params: {
          limit
        }
      } = this.state;
      const params = {
        limit,
        page: 1,
        search: ''
      };
      this.setState({
        params
      }, () => this.load());
    };

    this.handleClearFilters = () => {
      const {
        onClearFilters
      } = this.props;
      this.clearFilters();

      if (onClearFilters) {
        onClearFilters();
      }
    };

    this.handlePayloadChange = () => {
      const {
        params
      } = this.state;
      this.setState({
        params: { ...params,
          page: 1
        }
      }, () => this.load());
    };

    this.handleRefresh = () => {
      this.load();
    };

    this.handleExportClick = () => {
      const {
        exportConfig: {
          apiFn,
          filename = 'export.xlsx',
          mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        }
      } = this.props;
      const {
        api
      } = net;
      const apiConfig = apiFn(this.getParams());
      api(apiConfig).then(response => response.blob()).then(blob => {
        download(blob, filename, mimeType);
      });
    };

    this.remoteFilterConfig = config => ({
      filterDropdown: ({
        setSelectedKeys,
        confirm
      }) => /*#__PURE__*/React.createElement("div", {
        style: config.styleColumn ? { ...config.styleColumn
        } : {
          padding: 8,
          width: '200px'
        }
      }, /*#__PURE__*/React.createElement(RemoteFilter, {
        remoteSearch: config,
        tableDropdownFn: {
          setSelectedKeys,
          confirm
        }
      })),
      filterIcon: filtered => /*#__PURE__*/React.createElement(_Icon, {
        type: "filter",
        theme: "filled",
        style: {
          color: filtered ? '#1890ff' : undefined
        }
      })
    });

    this.processColumns = columns => {
      // the method aims to hook the columns' sorter and filters to the
      // internal state of our component, so we can easily reset all of them
      const {
        params: {
          sorter,
          filters
        },
        columnSelector
      } = this.state;
      const {
        filters: propFilters,
        isMobileView
      } = this.props;
      const processedColumns = columns.map(column => {
        // Set hidden attribute by default. Avoid using 'undefined' type
        if (column.hidden !== true) {
          column.hidden = false;
        } // filter out columns that should be hidden on mobile
        // Will be overwritten by <ColumnSelector  /> if enabled


        if (column.mobile === false && isMobileView) {
          column.hidden = true;
        }

        return column;
      }); // Need to make copies of 'processedColumns' to not loose columns
      // For <Table /> we use 'columnsForTable'
      // For <ColumnSelector  /> we use 'processedColumns'

      let columnsForTable = [...processedColumns]; // columnSelector - Correct hidden attribute by state

      if (Object.keys(columnSelector).length > 0) {
        columnsForTable = columnsForTable.map(column => {
          const lookup = column.dataIndex || column.key;

          if (columnSelector[lookup] !== undefined) {
            column.hidden = columnSelector[lookup];
          }

          return column;
        });
      } // Filter and map <Table /> columns based on hidden prop


      columnsForTable = columnsForTable.filter(column => column.hidden === false);
      columnsForTable = columnsForTable.map(column => {
        if (!sorter) {
          column.sortOrder = false;
        }

        if (sorter && column.dataIndex === sorter.field) {
          column.sortOrder = `${sorter.order.toLowerCase()}end`; // ascend / descend
        }

        if (filters && filters[column.dataIndex]) {
          column.filteredValue = filters[column.dataIndex];
        } else {
          column.filteredValue = null;
        } // if a filter has been set via props, prevent user from changing it


        if (propFilters && propFilters[column.dataIndex]) {
          column.filters = [];
        }

        if (column.remoteFilter) {
          column = { ...column,
            ...this.remoteFilterConfig(column.remoteFilter)
          };
        }

        return column;
      }); // Return both arrays of columns

      return [processedColumns, columnsForTable];
    };

    this.onColumnSelectionChanged = columns => {
      this.setState(prevState => {
        const newState = { ...prevState,
          columnSelector: { ...prevState.columnSelector,
            ...columns
          }
        };
        return newState;
      });
    };
  }

  componentDidMount() {
    // perform initial load
    this.load();
  }

  componentDidUpdate(prevProps) {
    const {
      filters,
      loadActionPayload
    } = this.props;

    if (!_.isEqual(prevProps.filters, filters)) {
      // reload if prop filters have changed, while also clearing previous filters
      this.clearFilters();
    }

    if (!_.isEqual(prevProps.loadActionPayload, loadActionPayload)) {
      this.handlePayloadChange();
    }
  }

  render() {
    const {
      params: {
        page,
        limit,
        search
      }
    } = this.state;
    const {
      intl,
      dataSource: {
        data,
        loading,
        pagination
      },
      actions,
      rowDoubleClick,
      columns,
      showColumnSelector,
      exportConfig,
      settingsKey,
      customSearch,
      ...rest
    } = this.props;
    const [columnsForColumnSelector, columnsForTable] = this.processColumns(columns);
    const extra = /*#__PURE__*/React.createElement(_Row, {
      type: "flex",
      justify: "space-between"
    }, _.isUndefined(customSearch) && /*#__PURE__*/React.createElement(_Col, {
      cs: 24,
      sm: 8
    }, /*#__PURE__*/React.createElement(_Input.Search, {
      className: "mb-4",
      placeholder: intl.formatMessage({
        id: 'datatable.search'
      }),
      onSearch: this.handleSearch,
      value: search,
      onChange: this.handleSearchInputChange
    })), !_.isUndefined(customSearch) && /*#__PURE__*/React.createElement(_Col, null, /*#__PURE__*/React.createElement("div", {
      className: "mb-4",
      style: {
        display: 'inline-flex'
      }
    }, customSearch)), /*#__PURE__*/React.createElement(_Col, null, /*#__PURE__*/React.createElement("div", {
      className: "mb-4",
      style: {
        display: 'inline-flex'
      }
    }, /*#__PURE__*/React.createElement(_Button.Group, null, /*#__PURE__*/React.createElement(_Tooltip, {
      placement: "top",
      title: intl.formatMessage({
        id: 'datatable.tooltips.clear'
      })
    }, /*#__PURE__*/React.createElement(_Button, {
      icon: "stop",
      onClick: this.handleClearFilters
    })), /*#__PURE__*/React.createElement(_Tooltip, {
      placement: "top",
      title: intl.formatMessage({
        id: 'datatable.tooltips.refresh'
      })
    }, /*#__PURE__*/React.createElement(_Button, {
      icon: "reload",
      onClick: this.handleRefresh
    }, intl.formatMessage({
      id: 'datatable.actions.refresh'
    })))), showColumnSelector && /*#__PURE__*/React.createElement(ColumnSelector, {
      onColumnSelectionChanged: this.onColumnSelectionChanged,
      className: "ml-2",
      columns: columnsForColumnSelector,
      settingsKey: settingsKey
    }), exportConfig && /*#__PURE__*/React.createElement(_Tooltip, {
      placement: "top",
      title: intl.formatMessage({
        id: 'datatable.tooltips.export'
      })
    }, /*#__PURE__*/React.createElement(_Button, {
      className: "ml-2",
      icon: "download",
      onClick: this.handleExportClick
    })), actions)));
    return /*#__PURE__*/React.createElement("div", null, extra, /*#__PURE__*/React.createElement(_Table, _extends({
      key: columns.length,
      rowKey: "id",
      className: "utils__scrollTable",
      columns: columnsForTable,
      dataSource: data,
      onChange: this.handleTableChange,
      loading: loading,
      pagination: {
        showLessItems: true,
        showQuickJumper: true,
        current: page,
        defaultPageSize: limit,
        showSizeChanger: true,
        pageSizeOptions: ['10', '25', '50', '100', '200'],
        total: pagination && pagination.total
      },
      onRow: (record, rowIndex) => {
        return {
          onDoubleClick: event => {
            if (rowDoubleClick) {
              rowDoubleClick(record, rowIndex, event);
            }
          }
        };
      }
    }, rest)));
  }

}, _temp)) || _class) || _class);
export default DataTable;