import React, { Component } from "react";
import "../style/main.scss";
import "../style/account.scss";
import Login from "../components/login";
import Head from "next/head";

export class Account extends Component {
  render() {
    return (
      <div>
        <Head>
          <link
            href="https://fonts.googleapis.com/css?family=Quicksand&display=swap&subset=latin-ext"
            rel="stylesheet"
          ></link>
          <link
            href="https://fonts.googleapis.com/css?family=Maven+Pro&display=swap&subset=latin-ext"
            rel="stylesheet"
          ></link>
        </Head>
        <div className="center">
          <Login />
          <div className="account-background"></div>
        </div>
      </div>
    );
  }
}

export default Account;
