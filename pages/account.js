import React, { Component, useState } from "react";
import "../style/main.scss";
import "../style/account.scss";
import Login from "../components/login";
import HeadDesign from "../components/head";
import Head from "next/head";
import Register from "../components/register";
import Swal from "sweetalert2";
import md5 from "md5";
import validate from "validate.js";

class Account extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  state = {
    name: "",
    email: "",
    password: "",
    repassword: "",
    type: "",
    login: ""
  };

  handleChange(e) {
    console.log();
    if (e.target.type == "email") {
      this.setState({
        email: e.target.value
      });
    } else if (e.target.type == "password") {
      this.setState({
        password: e.target.value
      });
    }
  }

  handleSubmit(e) {
    var constraints = {
      from: {
        email: true
      }
    };
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      onOpen: toast => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      }
    });

    const validation = validate({ from: this.state.email }, constraints);

    if (validation == undefined) {
      if (this.state.password.length > 6) {
        Toast.fire({
          icon: "info",
          title: "Bilgilerini kontrol ediyoruz"
        });

        if ("a" == "a") {//TODO:database kontrolü olacak
          this.setState({
            login: true
          });
          Toast.fire({
            icon: "success",
            title: "Signed in successfully"
          });
        }
      }
    } else {
      console.log("geçersiz");
    }

    this.setState({
      password: md5(this.state.password)
    });
  }
  render() {
    return (
      <div>
        <Head>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
          <title>Home</title>
          <link
            href="https://fonts.googleapis.com/css?family=Quicksand&display=swap&subset=latin-ext"
            rel="stylesheet"
          ></link>
          <link
            href="https://fonts.googleapis.com/css?family=Maven+Pro&display=swap&subset=latin-ext"
            rel="stylesheet"
          ></link>
        </Head>

        <div className="ortala">
          <div className="log-reg-background">
            <Login
              handleSubmit={this.handleSubmit}
              password={this.state.password}
              email={this.state.email}
              handleChange={this.handleChange}
            />
            <Register />
          </div>
        </div>
        <div className="footer"></div>
      </div>
    );
  }
}

export default Account;
