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
import axios from "axios";
import * as Http from "../utils/http.helper";
import LogReg from "../components/log-reg";

class Account extends Component {
  constructor(props) {
    super(props);

    this.handleLogin = this.handleLogin.bind(this);
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

  handleLogin(e) {
    e.preventDefault();
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
        Toast.queue([
          {
            icon: "info",
            timer: 1000,
            title: "Bilgilerini kontrol ediyoruz",
            showLoaderOnConfirm: true,
            onClose: () => {
              return Http.post("auth/login", {
                email: this.state.email,
                password: this.state.password
              }).then(res => {
                if (res.status) {
                  //localStorage.setItem("userToken", res.token);//Artık session a kullanıyorum buna gerek yok
                  Toast.fire({
                    icon: "success",
                    title: "Başarıyla giriş yaptınız"
                  });
                } else {
                  Toast.fire({
                    icon: "error",
                    title: "Yanlış veri girdiniz"
                  });
                }
              });
            }
          }
        ]);
      } else {
        Toast.fire({
          icon: "warning",
          title: "Eksik şifre girdiniz"
        });
      }
    } else {
      Toast.fire({
        icon: "warning",
        title: "Geçersiz bir e-posta adresi girdiniz"
      });
    }

    this.setState({
      password: this.state.password
    });
  }
  render() {
    return (
      <div className="container">
        <Head>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
          <title>Home</title>
          <link
            href="https://fonts.googleapis.com/css?family=Orbitron&display=swap"
            rel="stylesheet"
          ></link>
          <link
            href="https://fonts.googleapis.com/css?family=Megrim&display=swap"
            rel="stylesheet"
          ></link>
          <link
            href="https://fonts.googleapis.com/css?family=Quicksand&display=swap&subset=latin-ext"
            rel="stylesheet"
          ></link>
          <link
            href="https://fonts.googleapis.com/css?family=Maven+Pro&display=swap&subset=latin-ext"
            rel="stylesheet"
          ></link>
          <link
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
            crossorigin="anonymous"
          ></link>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <HeadDesign
          handleChange={this.handleChange}
          search={this.state.search}
          type="main"
        />
        {/* <div className="ortala">
          <div className="log-reg-background">
            <Login
              handleSubmit={this.handleLogin}
              password={this.state.password}
              email={this.state.email}
              handleChange={this.handleChange}
            />
            <Register />
          </div>
        </div> */}
        <div>
          <LogReg
            register={this.props.events.register}
            handleSubmit={this.handleLogin}
            password={this.state.password}
            email={this.state.email}
            handleChange={this.handleChange}
          />
        </div>
        <div className="footer"></div>
      </div>
    );
  }
}

Account.getInitialProps = async ({ req, query }) => {
  // TODO: aşağıdaki satırda bulunan adresi kendi sunucu adresinle değiştirmelisin
  //const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'
  return {
    events: {
      register: query.register
    }
  };
};

export default Account;
