var _class;

import React from 'react';
import { withRouter } from 'react-router-dom';

let PublicLayout = withRouter(_class = class PublicLayout extends React.PureComponent {
  render() {
    const {
      children
    } = this.props;
    return children;
  }

}) || _class;

export default PublicLayout;