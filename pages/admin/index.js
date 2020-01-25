import MarkdownIt from "markdown-it";
import React, { Component, useState } from "react";
import GoogleAnalytics from "../../components/googleanalytics";
import * as Http from "../../utils/http.helper";
import Head from "next/head";
import "../../style/admin.scss";
import "../../style/main.scss";
import AddPost from "../../components/addPost";

export class index extends Component {
  mdParser = null;
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      details: "",
      slug: "",
      img: "",
      tag: "",
      isDropDownOpen: false,
      token: "thereisnotoken"
    };
    this.mdParser = new MarkdownIt();
  }

  componentDidMount(){
    Http.post("gettoken").then(res=>{
      this.setState({
        token: res
      })
    })
  }

  handleEditorChange = ({ text }) => {
    this.setState({
      details: text
    });
  };

  setStates = (which, data) => {
    switch (which) {
      case "title":
        this.setState({
          title: data
        });
        break;
      case "slug":
        this.setState({
          slug: data
        });
        break;
      case "img":
        this.setState({
          img: data
        });
        break;
      case "tag":
        this.setState({
          tag: data
        });
        break;

      default:
        break;
    }
  };
  render() {
    const { title, details, slug, img, tag, token } = this.state;
    return (
      <div>
        <GoogleAnalytics />
        <Head>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
          <title>Admin</title>
          <link
            href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
            rel="stylesheet"
            integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN"
            crossOrigin="anonymous"
          ></link>
          <link
            href="https://fonts.googleapis.com/css?family=Orbitron&display=swap"
            rel="stylesheet"
          ></link>
          <link
            href="https://fonts.googleapis.com/css?family=Megrim&display=swap"
            rel="stylesheet"
          ></link>
          <link
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
            crossOrigin="anonymous"
          ></link>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div style={{ marginTop: "50px" }}>
          <div className="container">
            <div className="row">
              <div className="col-md-4 my-auto">
                <div
                  className="admin-sidebar"
                  style={{ margin: "10px", minHeight: "549px" }}
                >
                  <h3 className="text-center admin-welcome-text">
                    Admin Paneline Hoş Geldiniz
                  </h3>
                  <hr />
                  <div className="admin-sidebar-menu">
                    <h4 className="text-left admin-sidebar-menu-items">
                      Gösterge Paneli
                    </h4>
                    <hr />
                    <h4 className="text-left admin-sidebar-menu-items">
                      Üyeler
                    </h4>
                    <hr />
                    <h4
                      className="text-left admin-sidebar-menu-items"
                      onClick={() => {
                        this.setState({
                          isDropDownOpen: !this.state.isDropDownOpen
                        });
                      }}
                    >
                      Gönderiler
                    </h4>
                    <hr />
                    <div
                      className="admin-sidebar-menu-dropdown"
                      style={{
                        display: this.state.isDropDownOpen ? "block" : "none"
                      }}
                    >
                      <h5 className="admin-sidebar-menu-items">Yeni Gönderi</h5>
                      <hr />
                      <h5 className="admin-sidebar-menu-items">
                        Gönderi İşlemleri
                      </h5>
                      <hr />
                      <h5 className="admin-sidebar-menu-items">Taslaklar</h5>
                      <hr />
                    </div>
                    <h4 className="admin-sidebar-menu-items">Çıkış Yap</h4>
                  </div>
                </div>
              </div>
              <div
                className="col-md-8 admin-menu-content"
                style={{ backgroundColor: "#ffffff" }}
              >
                <AddPost
                  title={title}
                  details={details}
                  slug={slug}
                  img={img}
                  tag={tag}
                  handleEditorChange={this.handleEditorChange}
                  mdParser={this.mdParser}
                  setStates={this.setStates}
                  token={token}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default index;
