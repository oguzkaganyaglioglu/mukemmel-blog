import React, { Component } from "react";
import Login from "./login";
import Register from "./register";
import { FaGoogle, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import * as Http from "../utils/http.helper";
import "../style/remove.scss";
import "../style/log-reg.scss";
import Head from "next/head";
import Swal from "sweetalert2";

export class LogReg extends Component {
  constructor() {
    super();
    this.state = { register: "" };
    this.setFormType = this.setFormType.bind(this);
  }

  setFormType(e) {
    if (e.target.id == "signUp") {
      this.setState({ register: "right-panel-active" });
      //console.log("signup");
    } else {
      this.setState({ register: "" });
    }
  }

  componentDidMount() {
    if (this.props.register) {
      this.setState({
        register: "right-panel-active"
      });
    }
  }

  sendMail = () => {
    Swal.fire({
      title: "Şifremi Sıfırla",
      input: "email",
      inputPlaceholder: "lütfen e-mail adresinizi giriniz",
      showLoaderOnConfirm: true,
      confirmButtonText:"Tamam",
      preConfirm: (email) => {
        return Http.post("auth/forgot-pass", { email: email })
        
      }
    }).then(res => {
      if (res.value.status === true) {
        Swal.fire({
          title: "Mail adresinize şifre sıfırlama linki gönderdik",
          text:"Spam kutunuzu kontrol etmeyi unutmayın",
          icon: "success",
          confirmButtonText:"Tamam"
        });
      } else if (res.value.reason == "falseuser") {
        Swal.fire({
          title: "Hatalı mail adresi girdiniz",
          icon: "error"
        });
      } else {
        Swal.fire({
          title: "Bir hata oluştu lütfen daha sonra tekrar deneyiniz",
          icon: "error",
          confirmButtonText:"Tamam"
        });
      }
    });
  };

  render() {
    const {
      handleSubmitForLogin,
      handleSubmitForRegister,
      password,
      email,
      name,
      handleChange
    } = this.props;
    return (
      <div
        className={`log-reg-container ${this.state.register}`}
        id="log-reg-container"
      >
        <Head>
          <script src="https://smtpjs.com/v3/smtp.js"></script>
        </Head>
        <div className="form-container sign-up-container">
          <form action="#">
            <h1>Hesap Oluştur</h1>
            <div className="social-container">
              Sosyal giriş özelliği çok yakında eklenecek
            </div>
            {
              //TODO: Sosyal giriş ekle
              /* <div className="social-container">
              <a href="#" className="social">
                <FaFacebookF />
              </a>
              <a href="#" className="social">
                <FaGoogle />
              </a>
              <a href="#" className="social">
                <FaLinkedinIn />
              </a>
            </div> */
            }
            <input
              className="remove-border log-reg-input"
              type="text"
              placeholder="İsim"
              value={name}
              onChange={handleChange}
            />
            <input
              className="remove-border log-reg-input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleChange}
            />
            <input
              className="remove-border log-reg-input"
              type="password"
              placeholder="Şifre"
              value={password}
              onChange={handleChange}
            />
            <button onClick={handleSubmitForRegister}>Üye Ol</button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form action="#">
            <h1>Üye Girişi</h1>
            <div className="social-container">
              Sosyal giriş özelliği çok yakında eklenecek
            </div>
            {
              //TODO: Sosyal giriş ekle
              /* <div className="social-container">
              <a href="#" className="social">
                <FaFacebookF />
              </a>
              <a href="#" className="social">
                <FaGoogle />
              </a>
              <a href="#" className="social">
                <FaLinkedinIn />
              </a>
            </div> */
            }
            <input
              className="remove-border log-reg-input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleChange}
            />
            <input
              className="remove-border log-reg-input"
              type="password"
              placeholder="Şifre"
              value={password}
              onChange={handleChange}
            />
            <a href="#" onClick={this.sendMail}>
              Şifremi unuttum
            </a>
            <button onClick={handleSubmitForLogin}>Üye Girişi</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Merhaba</h1>
              <p>
                Tekrar hoşgeldin giriş yapmak için alttaki butonu
                kullanabilirsin
              </p>
              <button onClick={this.setFormType} className="ghost" id="signIn">
                Üye Girişi
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Merhaba</h1>
              <p>Aramıza katılmak için aşağıdaki butonu kullanabilirsin</p>
              <button onClick={this.setFormType} className="ghost" id="signUp">
                Üye Ol
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LogReg;
