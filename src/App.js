import React, { Component } from "react";
import testModules from "./testModules";
import ExtraTopBar from "./testModules/components/ExtraTopBar";
import { Admin, Authorize } from "./lib";

const topBarExtra = (
  <Authorize roles={["admin"]}>
    <ExtraTopBar />
  </Authorize>
);

export default class App extends Component {
  render() {
    return (
      <Admin title="JS Core" modules={testModules} topBarExtra={topBarExtra} />
    );
  }
}
