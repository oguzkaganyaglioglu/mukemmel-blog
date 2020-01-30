import React, { useState, Component } from "react";
import { Search } from "react-feather";
import Link from "next/link";
const jwt = require("jsonwebtoken");
import * as http from "../utils/http.helper";
import "../style/main.scss";
import "../style/headdesign.scss";
import "../style/remove.scss";
import Slogan from "./slogan";

export class HeadDesign extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      token: "thereisnotoken"
    }
  }
  

  verify = () => {
    
    return jwt.verify(
      this.state.token,
      process.env.JWT_SECRET,
      (err, decoded) => {
        if (err) {
          //res.status(403).json(isEmpty(err) ? { message: 'Wrong token!' } : err);
          return false;
        } else {
          //return true;
          return decoded;
        }
      }
    );


  };

  route = (textd, linkd, textuser, linkuser, textadmin, linkadmin) => {
    if (this.verify()) {
      if (this.verify().admin) {
        return (
          <Link href={`/${linkadmin}`}>
            <a className="social-link" onClick={()=>{window.location.assign(`/${linkadmin}`)}}>{textadmin}</a>
          </Link>
        );
      } else {
        return (
          <Link href={`/${linkuser}`}>
            <a className="social-link" onClick={()=>{window.location.assign(`/${linkuser}`)}}>{textuser}</a>
          </Link>
        );
      }
    } else {
      return (
        <Link href={`/${linkd}`}>
          <a className="social-link" onClick={()=>{window.location.assign(`/${linkd}`)}}>{textd}</a>
        </Link>
      );
    }
  };

  selectLocation(type, search, handleChange, token) {
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
            {this.route("Üye Ol", "log-reg?register=true", "Ana Sayfa", "", "Admin", "admin")}
              {/* <Link href="/log-reg?register=true">
                <a className="social-link">Üye Ol</a>
              </Link> */}
            </div>
            <div className="link">
              <Link href="/about">
                <a className="social-link" onClick={()=>{window.location.assign(`/about`)}}>Hakkımda</a>
              </Link>
            </div>
            <div className="link">
              <Link href="/blog">
                <a className="social-link" onClick={()=>{window.location.assign(`/blog`)}}>Blog</a>
              </Link>
            </div>
            <div className="link">
            {this.route("Üye Girişi", "log-reg", "Çıkış", "logout", "Çıkış", "logout")}
              {/* <Link href="/log-reg">
                <a className="social-link">Üye Girişi</a>
              </Link> */}
            </div>
            <div className="link">
              <div id="search">
                <div className="link search-icon">
                  <Search />
                </div>
                <div className="link input-div">
                  <input
                    className="remove-border search-input"
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
componentDidMount(){
  http.post("gettoken").then(res=>{
    this.setState({
      token: res
    })
  })
}
  render() {
    HeadDesign.defaultProps = {
      token: "thereisnotoken"
    };
    
    
    const { search, handleChange, type, token } = this.props;
    return (
      <div>
      
        <div className="hero">
          <Link href="/">
            <a className="hero-title" data-text="Oguz Kagan Yaglıoglu" onClick={()=>{window.location.assign(`/`)}}>
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
