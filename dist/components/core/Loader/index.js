import React from 'react';
import classNames from 'classnames';
import styles from "./style.module.scss";

const Loader = ({
  spinning = true,
  fullScreen
}) => /*#__PURE__*/React.createElement("div", {
  className: classNames(styles.loader, {
    [styles.hidden]: !spinning,
    [styles.fullScreen]: fullScreen
  })
});

export default Loader;