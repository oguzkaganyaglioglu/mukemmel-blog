import React, { Component } from "react";
import PropTypes from "prop-types";
import "../style/remove.scss";
import "../style/form.scss";
import "../style/account.scss";

export class Login extends Component {
  static propTypes = {};

  render() {
    const { handleSubmit, password, email, handleChange } = this.props;
    return (
      <div className="login-container">
        <div className="login-content">
          <div className="login-text ortala">
            <h3>ÜYE GİRİŞİ</h3>
          </div>
          <div className="login-inputs">
            <form>
              <input
                className="remove-border textbox orange"
                type="email"
                placeholder="e-posta"
                name="e-mail"
                value={ email }
                onChange={ handleChange }
                required
                id="login-email"
              />
              <br />
              <input
                className="remove-border textbox orange"
                type="password"
                placeholder="şifre"
                name="password"
                value={ password }
                onChange={ handleChange }
                id="login-pass"
              />
              <br />

              <div className="ortala-test">
                <div className="login-checkbox orange test-align">
                  <div id="pretty-scale-test">
                    <div className="pretty p-svg p-plain p-bigger p-smooth p-curve p-rotate" id="pretty-scale-test">
                      <input type="checkbox" name="remember-me"/>
                      <div className="state">
                      <img className="svg" src="/check.svg"/>
                        <label>Beni hatırla</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="test-align">
                  <input
                    className="remove-border middle-button orange"
                    type="button"
                    value="Giriş Yap"
                    onClick={ handleSubmit }
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
