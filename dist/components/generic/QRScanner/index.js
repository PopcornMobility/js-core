import React from 'react';
import { Button, Popover } from 'antd';
import QrReader from 'react-qr-reader';
export default class QRScanner extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      scanEnabled: false
    };

    this.handleScan = data => {
      const {
        onScan,
        keepOpen
      } = this.props;

      if (data) {
        if (keepOpen !== true) {
          this.setState({
            scanEnabled: false
          });
        } // check if data contains a citylink specific url


        const regex = /(.*)citylink.ro\/ref\/(.*)/;
        const match = data.match(regex);
        const ref = match && match[2];

        if (onScan) {
          onScan(ref || data);
        }
      }
    };
  }

  render() {
    const {
      scanEnabled
    } = this.state;
    const {
      className,
      buttonText,
      buttonSize,
      buttonBlock,
      buttonType,
      style,
      extra
    } = this.props;
    const scanView = scanEnabled && /*#__PURE__*/React.createElement(QrReader, {
      delay: 500,
      onScan: this.handleScan,
      onError: () => {},
      style: {
        width: 250,
        height: 250
      },
      showViewFinder: true
    });
    const scanButton = /*#__PURE__*/React.createElement(Popover, {
      visible: scanEnabled,
      onVisibleChange: visible => this.setState({
        scanEnabled: visible
      }),
      placement: "bottomRight",
      content: /*#__PURE__*/React.createElement("div", null, extra, scanView),
      trigger: "click"
    }, /*#__PURE__*/React.createElement(Button, {
      icon: "qrcode",
      className: className,
      size: buttonSize,
      block: buttonBlock,
      type: buttonType,
      style: style
    }, buttonText || 'Scan'));
    return scanButton;
  }

}