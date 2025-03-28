/* eslint-disable camelcase */
import React from "react";
import { Card, Button, Popover } from "antd";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import moment from "moment";
import { Form, setDynamicRoles } from "../../../lib";
import TableFix from "./tableSortFix";
import RemoteSelectUsers from "./remoteSelectUsers";

@connect()
class Dashboard extends React.Component {
  onSubmit = values => {
    console.log(values);
  };

  // onChange = (field, values) => {
  //   console.log('changed value', field, values[field])
  // }

  /* 
    Args from Form component : onChange(field, getFieldsValue(), setFieldsValue)
      field -> field name
      getFieldsValue() -> object with all form fields values
      setFieldsValue -> functionn to set a field value
  */
  onChange = (...args) => {
    console.log("onChange", args);
  };

  handleAddDynamicRole = () => {
    const { dispatch } = this.props;

    dispatch(setDynamicRoles([{ name: "dynamic-role" }]));
  };

  render() {
    const config = [
      {
        label: "Input",
        field: "input",
        placeholder: "Input text"
      },
      {
        label: "Date",
        field: "date",
        type: "date",
        placeholder: "Select date"
      },
      {
        label: "QR Scanner",
        field: "scan",
        type: "qrcode",
        placeholder: "Scan QR"
      },
      {
        label: "Select",
        field: "select",
        type: "select",
        placeholder: "- select option -",
        options: ["Option 1", "Option 2"]
      },
      {
        label: "File",
        field: "file",
        type: "file",
        placeholder: "Select file",
        action: "http://google.ro",
        method: "POST", // default, optional
        showUploadList: true, // default, optional
        listType: "picture", // default: text, optional
        data: { extra: "test param" }, // optional
        multiple: true // default: false, optional
      },
      {
        label: "TimePicker",
        field: "timePicker",
        type: "time",
        antdProps: {
          minuteStep: 15,
          // Defaults to 'HH:mm:ss'
          // This also controls what the panel shows.
          // Below example disables seconds panel
          format: "HH:mm"
        }
      },
      {
        type: "custom",
        label: "Custom",
        field: "custom-1",
        render: () => "Just a text"
      },
      {
        label: "Custom nested",
        field: "custom",
        items: [
          {
            field: "input-text",
            placeholder: "Input text",
            layout: { span: 24 }
          },
          {
            type: "custom",
            field: "custom-2",
            layout: { span: 24 },
            render: () => "Just another text"
          }
        ]
      },
      {
        label: "Autocomplete",
        field: "autocomplete",
        type: "autocomplete",
        placeholder: "Type to autocomplete",
        dataSource: ["ala", "bala", "porto", "cala"]
      },
      {
        label: "Checkbox",
        field: "checkboxasdwdz",
        type: "checkbox",
        placeholder: "placeholder"
      }
    ];

    const sectionConfig = [
      {
        title: "Section 1",
        config: [
          {
            label: "Input",
            field: "input1",
            placeholder: "Input text"
          },
          {
            label: "Input",
            field: "input2",
            placeholder: "Input text"
          }
        ]
      },
      {
        title: "Section 2",
        config: [
          {
            label: "Input",
            field: "input3",
            placeholder: "Input text"
          },
          {
            label: "Input",
            field: "input4",
            placeholder: "Input text"
          }
        ]
      }
    ];

    const initialValues = {
      input: 0,
      timePicker: "20:00:00"
    };

    return (
      <>
        <Helmet title="Dashboard" />

        <Card title={<strong>DASHBOARD</strong>}>Welcome!</Card>

        <Card
          title={
            <strong className="text-uppercase">
              <FormattedMessage
                id="dashboard.form.title"
                defaultMessage="Example form"
              />
            </strong>
          }
          className="mt-4"
        >
          <Form
            config={config}
            onSubmit={this.onSubmit}
            onChange={this.onChange}
            values={initialValues}
          />
        </Card>

        <Card
          title={<strong className="text-uppercase">Popover form</strong>}
          className="mt-4"
        >
          <Popover
            placement="bottomRight"
            content={
              <div style={{ width: 240 }}>
                <Form
                  config={config}
                  onSubmit={this.onSubmit}
                  onChange={this.onChange}
                  values={initialValues}
                  compact
                />
              </div>
            }
            trigger="click"
          >
            <Button type="primary" icon="plus">
              Popover form
            </Button>
          </Popover>
        </Card>

        <Card
          title={<strong className="text-uppercase">Multi-column form</strong>}
          className="mt-4"
        >
          <Form
            config={config}
            onSubmit={this.onSubmit}
            onChange={this.onChange}
            values={initialValues}
            compact
            columnLayout={{ xs: 24, sm: 12, lg: 8 }}
          />
        </Card>

        <Card
          title={<strong className="text-uppercase">Sections form</strong>}
          className="mt-4"
        >
          <Form
            sectionConfig={sectionConfig}
            columnLayout={{ xs: 24, sm: 12 }}
            compact
            // sectionLayout={{ title: { md: 24, lg: 8 }, wrapper: { md: 24, lg: 16 } }}
          />
        </Card>

        <Card
          className="mt-4"
          title={<strong className="text-uppercase">Remote select</strong>}
        >
          <RemoteSelectUsers />
        </Card>

        <FormRefs />

        <Card
          className="mt-4 mb-4"
          title={<strong className="text-uppercase">Modals</strong>}
        >
          <div className="mb-5" style={{ textAlign: "center" }}>
            <Link
              to={{ pathname: `/modalJumpTab`, state: { modal: true } }}
              className="utils__link--underlined"
            >
              modalJumpTab simple
            </Link>
            <br />
            <Link
              to={{
                pathname: `/modalJumpTab`,
                state: { modal: true, selectedTab: "edit" }
              }}
              className="utils__link--underlined"
            >
              modalJumpTab with state
            </Link>
          </div>
        </Card>

        <TableFix />

        <Card
          className="mt-4"
          title={<strong className="text-uppercase">Permissions</strong>}
        >
          <Button onClick={this.handleAddDynamicRole}>Add dynamic role</Button>
        </Card>
      </>
    );
  }
}

export default Dashboard;

const FormRefs = () => {
  const formRef = React.createRef();

  const formRef_2 = React.createRef();

  const config = [
    {
      label: "Input",
      field: "input",
      placeholder: "Input text"
    },
    {
      label: "Date",
      field: "date",
      type: "date",
      placeholder: "Select date"
    },
    {
      label: "Select",
      field: "select",
      type: "select",
      placeholder: "- select option -",
      options: [
        { text: "Option 1", value: 1 },
        { text: "Option 2", value: 2 }
      ]
    }
  ];

  const handleSetFields = () => {
    formRef_2.current.props.form.setFieldsValue({
      input: "test",
      date: moment(),
      select: 1
    });
  };

  console.log("--------formRef", formRef);
  console.log("--------formRef_2", formRef_2);

  return (
    <Card title={<strong>Form Refs instance</strong>} className="mt-4">
      <Form
        wrappedComponentRef={formRef}
        config={config}
        onSubmit={() =>
          console.log(
            formRef.current && formRef.current.props.form.getFieldsValue()
          )
        }
        columnLayout={{ xs: 8 }}
        compact
      />

      <Form
        wrappedComponentRef={formRef_2}
        config={config}
        onSubmit={() =>
          console.log(
            formRef_2.current && formRef_2.current.props.form.getFieldsValue()
          )
        }
        columnLayout={{ xs: 8 }}
        compact
      />

      <Button onClick={handleSetFields}>Set fields on 2nd form only</Button>
    </Card>
  );
};
