import dynamic from "next/dynamic";
import MarkdownIt from "markdown-it";
import React, { Component, useState } from "react";
import * as Http from "../../utils/http.helper";
const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false
});
import Head from "next/head";
import "../../style/main.scss";

export class test extends Component {
  mdParser = null;
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      details: "",
      slug: "",
      img: "",
      tag: ""
    };

    this.mdParser = new MarkdownIt();
  }
  handleEditorChange = ({ text }) => {
    this.setState({
      details: text
    });
  };

  handleSendPost = () => {
    const { title, details, slug, img, tag } = this.state;
    console.log("sended");
      Http.post("blog/addPost", {
        title: title,
        slug: slug,
        details: details,
        tag: tag,
        img: img
      }).then(res => {console.log(res.status)})
  };
  render() {
    const { title, details, slug, img, tag } = this.state;

    return (
      <div>
        <Head>
          <link
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
            crossorigin="anonymous"
          ></link>
        </Head>
        <div
          className="container"
          style={{
            backgroundColor: "rgba(0,0,0,0)",
            paddingRight: "4px",
            paddingBottom: "4px",
            paddingTop: "0px",
            paddingLeft: "0px"
          }}
        >
          <div className="row">
            <div className="col-md-4 m-auto">
              <div style={{ marginTop: "30px" }}>
                <div className="input-group" style={{ margin: "auto" }}>
                  <div className="input-group-prepend">
                    <span className="input-group-text">Slug</span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Postun adresini belirle"
                    onChange={e => {
                      this.setState({
                        slug: e.target.value
                      });
                    }}
                    value={slug}
                    type="text"
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-primary"
                      type="button"
                      disabled
                    ></button>
                  </div>
                </div>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Title</span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Lütfen başlık giriniz"
                    name="title"
                    onChange={e => {
                      this.setState({
                        title: e.target.value
                      });
                    }}
                    value={title}
                    type="text"
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-primary"
                      type="button"
                      disabled
                    ></button>
                  </div>
                </div>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Img</span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    name="img"
                    onChange={e => {
                      this.setState({
                        img: e.target.value
                      });
                    }}
                    value={img}
                    type="text"
                    placeholder="Lütfen resim linki giriniz"
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-primary"
                      type="button"
                      disabled
                    ></button>
                  </div>
                </div>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Tag</span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Lütfen tagları virgül ile ayırın"
                    onChange={e => {
                      this.setState({
                        tag: e.target.value
                      });
                    }}
                    value={tag}
                    type="text"
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-primary"
                      type="button"
                      disabled
                    ></button>
                  </div>
                </div>
                <div className="d-xl-flex justify-content-xl-center">
                  <button
                    className="btn btn-primary"
                    type="button"
                    style={{ marginRight: "5px", marginLeft: "5px" }}
                  >
                    Taslak Kaydet
                  </button>
                  <button
                    className="btn btn-primary"
                    type="button"
                    style={{ marginRight: "5px", marginLeft: "5px" }}
                    onClick={this.handleSendPost}
                  >
                    Yayınla
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <MdEditor
                value={details}
                renderHTML={text => this.mdParser.render(text)}
                onChange={this.handleEditorChange}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default test;
