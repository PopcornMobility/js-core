function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { Button } from 'antd';
import { Map, Marker, TileLayer, Popup, Polyline } from 'react-leaflet';
import AntPath from 'react-leaflet-ant-path'; // import L from 'leaflet'

export default class LeafletMap extends React.Component {
  render() {
    const {
      position,
      center,
      polyline,
      useAntPath,
      children,
      ...rest
    } = this.props;
    let gmapUrl;
    let wazeUrl; // https://{s}.tile.osm.org/{z}/{x}/{y}.png

    if (position) {
      gmapUrl = `https://www.google.com/maps?q=${position.lat},${position.lng}`;
      wazeUrl = `https://waze.com/ul?ll=${position.lat},${position.lng}&navigate=yes`;
    }

    const antOptions = {
      hardwareAccelerated: true,
      color: '#666',
      pulseColor: '#000',
      delay: 1000,
      smoothFactor: 2,
      dashArray: [10, 10],
      weight: 3
    };
    return /*#__PURE__*/React.createElement(Map, _extends({
      center: position || center,
      zoom: 14
    }, rest), /*#__PURE__*/React.createElement(TileLayer, {
      url: "https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiY2l0eWxpbmsiLCJhIjoiY2p1bWFlOTMzMHNiMTQzcHcwOWd3ajdkdyJ9.3S-mnIR0lvcsWq4elpk-TA"
    }), position && /*#__PURE__*/React.createElement(Marker, {
      position: position
    }, /*#__PURE__*/React.createElement(Popup, null, /*#__PURE__*/React.createElement(Button, {
      href: gmapUrl
    }, "GMaps"), /*#__PURE__*/React.createElement(Button, {
      href: wazeUrl,
      className: "ml-1"
    }, "Waze"))), polyline && !useAntPath && /*#__PURE__*/React.createElement(Polyline, {
      color: "blue",
      positions: polyline,
      smoothFactor: 2
    }), polyline && polyline.length > 1 && useAntPath && /*#__PURE__*/React.createElement(AntPath, {
      positions: polyline,
      options: antOptions
    }), children);
  }

}