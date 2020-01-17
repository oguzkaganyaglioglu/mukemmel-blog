import React, { Component } from "react";
import fetch from "isomorphic-unfetch";
import Head from "next/head";
import HeadDesign from "../components/head";
import Blog from "../components/blog";
import "../style/main.scss";

export class Home extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  state = {
    search: ""
  };
  handleChange(e) {
    this.setState({
      search: e.target.value
    });
  }
  render() {
    const { posts } = this.props;

    return (
      <div className="container editted-container">
        <Head>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
          <title>Home</title>
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
            crossorigin="anonymous"
          ></link>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <HeadDesign
          handleChange={this.handleChange}
          search={this.state.search}
          type="main"
        />
        <h1>{this.state.search}</h1>

        <Blog
          search={this.state.search}
          veri={posts}
          search={this.state.search}
          SetpPP={5}
        />

        <div className="footer"></div>
      </div>
    );
  }
}

Home.getInitialProps = async ({ req }) => {
  // TODO: aşağıdaki satırda bulunan adresi kendi sunucu adresinle değiştirmelisin
  const res = await fetch(`${process.env.DOMAIN}/api/posts`);
  const json = await res.json();
  return { posts: json.posts };
};

export default Home;
