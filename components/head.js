import React, { Component } from "react";
import { Search } from "react-feather";
import Link from "next/link";
import "../style/main.scss";
import "../style/headdesign.scss";
import Slogan from "./slogan";

export class HeadDesign extends Component {
  selectLocation(type, search, handleChange) {
    if (type == "slogan") {
      return (
        <div className="center">
          <div className="hero-social-links slogan">
            <Slogan />
          </div>
        </div>
      );
    } else if (type == "main") {
      return (
        <div className="center">
          <div className="hero-social-links">
            <div className="link">
              <Link href="/signup">
                <a className="social-link">Üye Ol</a>
              </Link>
            </div>
            <div className="link">
              <Link href="/about">
                <a className="social-link">Hakkımda</a>
              </Link>
            </div>
            <div className="link">
              <Link href="/blog">
                <a className="social-link">Blog</a>
              </Link>
            </div>
            <div className="link">
              <Link href="/login">
                <a className="social-link">Üye Girişi</a>
              </Link>
            </div>
            <div className="link">
              <div id="search">
                <div className="link search-icon">
                  <Search />
                </div>
                <div className="link input-div">
                  <input
                    className="search-input"
                    type="text"
                    value={search}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
  render() {
    const { search, handleChange, type } = this.props;
    return (
      <div>
        <div className="hero">
          <Link href="/">
            <a className="hero-title">
              Oguz Kagan Yaglıoglu
              {
                /*<Typical
                steps={[
                  "Hello 👋🏽",
                  1000,
                  "I'm a designer 🖊️",
                  1000,
                  "I'm a developer 💻",
                  1000,
                  "Who am I?",
                  1000,
                  "I am",
                  1000,
                  "Oguz Kagan Yaglıoglu",
                  1500
                ]
                wrapper="p"
              />*/
                //TODO:Bu kod yeni sayfaya geçirilecek
              }
            </a>
          </Link>
          <hr style={{ borderColor: "#707070", maxWidth: "550px" }} />

          {this.selectLocation(type, search, handleChange)}

          <hr
            style={{
              borderColor: "#707070",
              maxWidth: "600px",
              transform: "translateY(2em)"
            }}
          />
        </div>
      </div>
    );
  }
}

export default HeadDesign;
