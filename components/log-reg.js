import React, { Component } from "react";
import Login from "./login";
import Register from "./register";
import { FaGoogle, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import "../style/remove.scss";
import "../style/log-reg.scss";

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

  render() {
    const { handleSubmitForLogin, handleSubmitForRegister, password, email, name, handleChange } = this.props;
    return (
      <div
        className={`log-reg-container ${this.state.register}`}
        id="log-reg-container"
      >
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
            <button onClick={handleSubmitForRegister} >Üye Ol</button>
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
            <a href="#">Şifremi unuttum</a>
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
