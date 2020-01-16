import dynamic from "next/dynamic";
import MarkdownIt from "markdown-it";
import React, { Component, useState } from "react";
const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false
});

export class index extends Component {
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
  render() {
    const { title, details, slug, img, tag } = this.state;
    return (
      <div>
        <input
          onChange={e => {
            this.setState({
              title: e.target.value
            });
          }}
          value={title}
          type="text"
        />
        <input
          onChange={e => {
            this.setState({
              img: e.target.value
            });
          }}
          value={img}
          type="text"
        />
        <input
          onChange={e => {
            this.setState({
              slug: e.target.value
            });
          }}
          value={slug}
          type="text"
        />
        <input
          onChange={e => {
            this.setState({
              tag: e.target.value
            });
          }}
          value={tag}
          type="text"
        />

        <MdEditor
          value={details}
          renderHTML={text => this.mdParser.render(text)}
          onChange={this.handleEditorChange}
        />
      </div>
    );
  }
}

export default index;
