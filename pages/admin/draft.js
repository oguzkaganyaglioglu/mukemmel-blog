import MarkdownIt from "markdown-it";
import React, { Component, useState } from "react";
import GoogleAnalytics from "../../components/googleanalytics";
import * as Http from "../../utils/http.helper";
import Head from "next/head";
import Blog from "../../components/blog";
import "../../style/admin.scss";
import "../../style/main.scss";
import AOS from "aos";
import AdminLayout from "../../Layout/admin";
import { Search } from "react-feather";

export class Draft extends Component {
  mdParser = null;
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      details: "",
      slug: "",
      img: "",
      tag: "",
      token: "thereisnotoken",
      search: ""
    };
    this.mdParser = new MarkdownIt();
  }

  onResize = () => {
    AOS.refresh();
  };

  handleChange = e => {
    this.setState({
      search: e.target.value
    });
  };

  componentDidMount() {
    AOS.init();
    Http.post("gettoken")
      .then(res => {
        this.setState({
          token: res
        });
      })
      .then(() => {
        Http.post(
          "blog-operations/draftposts",
          {},
          { userToken: this.state.token }
        ).then(res => {
          this.setState({
            draftposts: res.posts
          });
        });
      });
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
    const { title, details, slug, img, tag, token, draftposts } = this.state;

    return (
      <div>
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
        <AdminLayout>
          <input
            className="form-control-sm"
            style={{ margin: "10px 10%", width: "81%" }}
            type="text"
            placeholder="Search"
            aria-label="Search"
            value={this.state.search}
            onChange={this.handleChange}
          ></input>
          {draftposts == undefined ? (
            ""
          ) : (
            <Blog
              search={this.state.search}
              veri={draftposts}
              SetpPP={3}
              isAdmin={true}
              token={token}
            />
          )
          /*  */
          }
        </AdminLayout>
      </div>
    );
  }
}

export default Draft;
