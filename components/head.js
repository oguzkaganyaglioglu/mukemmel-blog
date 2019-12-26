import React, { Component } from "react";
import { Search, Target } from "react-feather";
import Typical from "react-typical";
import Head from "next/head";
import Link from "next/link";
import "../style/main.scss";
import "../style/headdesign.scss";

export class HeadDesign extends Component {
  render() {
    const { search, handleChange } = this.props;
    return (
      <div>
        <div className="hero">
          <Link href="/">
            <a className="hero-title">
              <Typical
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
                ]}
                wrapper="p"
              />
            </a>
          </Link>
          <hr style={{ borderColor: "#707070", maxWidth: "550px" }} />

          {/*<Slogan />*/}

          <div className="hero-social-links">
            <Link href="https://www.twitter.com/oguzkagan05">
              <a className="social-link">Twitter</a>
            </Link>
            <Link href="https://www.instagram.com/oguz_kagan05">
              <a className="social-link">Instagram</a>
            </Link>
            <div id="search">
              <Search />
            </div>
            Hello {search} <br />
            <input type="text" value={search} onChange={handleChange} />
          </div>
          <hr style={{ borderColor: "#707070", maxWidth: "600px" }} />
        </div>
      </div>
    );
  }
}

export default HeadDesign;
