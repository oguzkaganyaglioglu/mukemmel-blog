import React, { Component } from "react";
import PropTypes from "prop-types";
import "../style/remove.scss";
import "../style/form.scss";
import "../style/account.scss";

export class Login extends Component {
  static propTypes = {};

  render() {
    return (
      <div className="login-container">
        <div className="login-content">
          <div className="login-text ortala">
            <h3>ÜYE GİRİŞİ</h3>
          </div>
          <div className="login-inputs">
            <input
              className="remove-border textbox orange"
              type="email"
              placeholder="e-posta"
              name=""
              id="login-email"
            />
            <br />
            <input
              className="remove-border textbox orange"
              type="password"
              placeholder="şifre"
              name=""
              id="login-pass"
            />
            <br />
            <div className="ortala-test">
              <div className="login-checkbox orange test-align">
                <input type="checkbox" name="" id="remember-me" />
                <label htmlFor="remember-me">Beni hatırla</label>
              </div>
              <div className="test-align">
                <input
                  className="remove-border middle-button orange"
                  type="submit"
                  value="Giriş Yap"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
