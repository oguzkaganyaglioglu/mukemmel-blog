import MarkdownIt from "markdown-it";
import React, { Component, useState } from "react";
import GoogleAnalytics from "../../components/googleanalytics";
import * as Http from "../../utils/http.helper";
import Head from "next/head";
import "../../style/admin.scss";
import "../../style/main.scss";
import AddPost from "../../components/addPost";
import AdminLayout from "../../Layout/admin";

export class NewPost extends Component {
  mdParser = null;
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      details: "",
      slug: "",
      img: "",
      tag: "",
      token: "thereisnotoken"
    };
    this.mdParser = new MarkdownIt();
  }

  componentDidMount() {
    Http.post("gettoken").then(res => {
      this.setState({
        token: res
      });
      if (this.props.datas.modify) {
        Http.post(
          `blog-operations/posts?post=${this.props.datas.slug}`,
          { userToken: this.state.token },
          { userToken: this.state.token }
        ).then(res => {
          if (Object.keys(res).length === 0 && res.constructor === Object) {
            window.location.assign("/admin/new-post");
          } else {
            this.setState({
              old_slug: this.props.datas.slug,
              slug: res.post.slug,
              title: res.post.title,
              details: res.post.details,
              img: res.post.img,
              tag: res.post.tag
            });
          }
        });
      }
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
    const { title, details, slug, img, tag, token, old_slug } = this.state;

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
            old_slug={old_slug}
            modify={this.props.datas.modify}
          />
        </AdminLayout>
      </div>
    );
  }
}

NewPost.getInitialProps = async ({ req, query }) => {
  return {
    datas: {
      modify: query.modify,
      slug: query.slug
    }
  };
};

export default NewPost;
