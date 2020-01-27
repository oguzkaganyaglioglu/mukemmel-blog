import React, { Component } from "react";
import GoogleAnalytics from "../components/googleanalytics";
import Head from "next/head";
import "../style/admin.scss";
import "../style/main.scss";
import FooterCopyright from "../components/footer";

export class AdminLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDropDownOpen: false
    };
  }
  componentDidMount() {
    const path = window.location.pathname;
    if (
      path == "/admin/draft" ||
      path == "/admin/new-post" ||
      path == "/admin/post-operations"
    ) {
      this.setState({
        isDropDownOpen: true,
        path: path
      });
    } else {
      this.setState({
        path: path
      });
    }
  }

  render() {
    return (
      <div>
        <GoogleAnalytics />
        <Head>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
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
        </Head>
        <div style={{ marginTop: "50px" }}>
          <div className="container admin-container">
            <div className="row">
              <div className="col-md-4 my-auto">
                <div
                  className="admin-sidebar"
                  style={{
                    margin: "10px",
                    minHeight: "549px",
                    border: "4px solid #B71C1C"
                  }}
                >
                  <h3 className="text-center admin-welcome-text">
                    Admin Paneline Hoş Geldiniz
                  </h3>
                  <hr />
                  <div className="admin-sidebar-menu">
                    <a href="/admin">
                      <h4
                        className="text-left admin-sidebar-menu-items"
                        style={{
                          color:
                            this.state.path == "/admin/dashboard" ||
                            this.state.path == "/admin"
                              ? "#333333"
                              : "",
                          fontWeight:
                            this.state.path == "/admin/dashboard" ||
                            this.state.path == "/admin"
                              ? "400"
                              : ""
                        }}
                      >
                        Gösterge Paneli
                      </h4>
                    </a>
                    <hr />
                    <a href="/admin/members">
                      <h4
                        className="text-left admin-sidebar-menu-items"
                        style={{
                          color:
                            this.state.path == "/admin/members"
                              ? "#333333"
                              : "",
                          fontWeight:
                            this.state.path == "/admin/members" ? "400" : ""
                        }}
                      >
                        Üyeler
                      </h4>
                    </a>
                    <hr />
                    <h4
                      className="text-left admin-sidebar-menu-items"
                      onClick={() => {
                        this.setState({
                          isDropDownOpen: !this.state.isDropDownOpen
                        });
                      }}
                      style={{
                        fontWeight: this.state.isDropDownOpen ? "400" : ""
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
                      <a href="/admin/new-post">
                        <h5
                          className="admin-sidebar-menu-items"
                          style={{
                            color:
                              this.state.path == "/admin/new-post"
                                ? "#333333"
                                : "",
                            fontWeight:
                              this.state.path == "/admin/new-post" ? "400" : ""
                          }}
                        >
                          Yeni Gönderi
                        </h5>
                      </a>
                      <hr />
                      <a href="/admin/post-operations">
                        <h5
                          className="admin-sidebar-menu-items"
                          style={{
                            color:
                              this.state.path == "/admin/post-operations"
                                ? "#333333"
                                : "",
                            fontWeight:
                              this.state.path == "/admin/post-operations"
                                ? "400"
                                : ""
                          }}
                        >
                          Gönderi İşlemleri
                        </h5>
                      </a>
                      <hr />
                      <a href="/admin/draft">
                        <h5
                          className="admin-sidebar-menu-items"
                          style={{
                            color:
                              this.state.path == "/admin/draft"
                                ? "#333333"
                                : "",
                            fontWeight:
                              this.state.path == "/admin/draft"
                                ? "400"
                                : ""
                          }}
                        >
                          Taslaklar
                        </h5>
                      </a>
                      <hr />
                    </div>
                    <a href="/logout">
                    <h4 className="admin-sidebar-menu-items">Çıkış Yap</h4>
                    </a>
                  </div>
                </div>
              </div>
              <div
                className="col-md-8 admin-menu-content"
                style={{
                  backgroundColor: "#ffffff",
                  border: "4px solid #AD1457",
                  padding: "20px"
                }}
              >
                {this.props.children}
              </div>
            </div>
          </div>
        </div>
        <FooterCopyright/>
      </div>
    );
  }
}

export default AdminLayout;
