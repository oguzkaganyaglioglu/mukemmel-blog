import React, { Component } from "react";
import PropTypes from "prop-types";
import "../style/remove.scss";
import "../style/form.scss";
import "../style/account.scss";

export class Register extends Component {
  static propTypes = {};

  render() {
    return (
      <div className="login-container">
        <div className="login-content">
          <div className="login-text ortala">
            <h3>ÜYE Ol</h3>
          </div>
          <div className="login-inputs">
            <form action="" method="post">
            <input
                className="remove-border textbox purple"
                type="text"
                placeholder="İsim Soyisim"
                name="name"
                id="login-pass"
              />
              <br />
              <input
                className="remove-border textbox purple"
                type="email"
                placeholder="e-posta"
                name="e-mail"
                required
                id="login-email"
              />
              <br />
              <input
                className="remove-border textbox purple"
                type="password"
                placeholder="şifre"
                name="password"
                id="login-pass"
              />
              <br />
              <input
                className="remove-border textbox purple"
                type="password"
                placeholder="şifre"
                name="password"
                id="login-pass"
              />
              <br />

              <div className="ortala-test">
                {/* <div className="login-checkbox purple test-align">
                  <div id="pretty-scale-test">
                    <div className="pretty p-svg p-plain p-bigger p-smooth p-curve p-rotate" id="pretty-scale-test">
                      <input type="checkbox" name="remember-me"/>
                      <div className="state">
                      <img className="svg" src="/check.svg"/>
                        <label>Beni hatırla</label>
                      </div>
                    </div>
                  </div>
                </div> */}
                <div className="test-align">
                  <input
                    className="remove-border middle-button purple"
                    type="submit"
                    value="Üye Ol"
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

export default Register;
