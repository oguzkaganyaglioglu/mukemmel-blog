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
          <div className="test">
          <div className="hero-social-links">
          <div className="link">
            <Link href="https://www.twitter.com/oguzkagan05">
              <a className="social-link">Twitter</a>
            </Link>
            </div>
            <div className="link">
            <Link href="https://www.instagram.com/oguz_kagan05">
              <a className="social-link">Instagram</a>
            </Link>
            </div>
            <div className="link">
            <div id="search">
            <div className="link search-icon"><Search /></div>
            <div className="link input-div"><input className="search-input" type="text" value={search} onChange={handleChange} />
            </div>
            </div>
            </div>
            </div>
            
          </div>
          <hr style={{ borderColor: "#707070", maxWidth: "600px", transform: "translateY(2em)" }} />
        </div>
      </div>
    );
  }
}

export default HeadDesign;
