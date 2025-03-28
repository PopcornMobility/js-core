import React from "react";
import { Layout } from "antd";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import classNames from "classnames";
import TopBar from "../../components/core/TopBar";
import Menu from "../../components/core/Menu";

const mapStateToProps = ({ settings }) => ({
  isBorderless: settings.isBorderless,
  isSquaredBorders: settings.isSquaredBorders,
  isFixedWidth: settings.isFixedWidth,
  isMenuShadow: settings.isMenuShadow,
  isMenuTop: settings.isMenuTop
});

@withRouter
@connect(mapStateToProps)
class MainLayout extends React.PureComponent {
  render() {
    const {
      children,
      isBorderless,
      isSquaredBorders,
      isFixedWidth,
      isMenuShadow,
      isMenuTop,
      menu
    } = this.props;
    return (
      <Layout
        className={classNames({
          settings__borderLess: isBorderless,
          settings__squaredBorders: isSquaredBorders,
          settings__fixedWidth: isFixedWidth,
          settings__menuShadow: isMenuShadow,
          settings__menuTop: isMenuTop
        })}
      >
        <Menu menu={menu} />
        <Layout>
          <Layout.Header>
            <TopBar />
          </Layout.Header>
          <Layout.Content style={{ height: "100%", position: "relative" }}>
            <div className="utils__content">{children}</div>
          </Layout.Content>
          <Layout.Footer />
        </Layout>
      </Layout>
    );
  }
}

export default MainLayout;
