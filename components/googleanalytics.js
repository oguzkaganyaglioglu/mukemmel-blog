import React, { Component } from "react";
import { initGA, logPageView } from "../utils/googleanalytics";

export class GoogleAnalytics extends Component {
  componentDidMount() {
    initGA();
    logPageView();
  }
  render() {
    return <div></div>;
  }
}

export default GoogleAnalytics;
