
import fetch from "isomorphic-unfetch";
import Head from "next/head";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import "../style/main.scss";
import StyleCards from "../components/newstylecards";
import PostList from "../components/postslist";
import "../style/main.scss";
import Cards from "../components/cards";

import React, { Component } from 'react'

export class Home extends Component {

  testwindow(){
    console.log(window.location.host)
    console.log("a")
    console.log(req.headers.host)
  }
  
  render() {
    function test(){
      const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'
      const apiUrl = process.browser
        ? `${protocol}://${window.location.host}/api/login.js`
        : `${protocol}://${req.headers.host}/api/login.js`
      return { apiUrl }
    }

    

    return (
      <div>
        <button onClick={this.testwindow}></button>
      </div>
    )
  }
}



Home.getInitialProps = async ({ req }) => {
  // TODO: aşağıdaki satırda bulunan adresi kendi sunucu adresinle değiştirmelisin
  const res = await fetch("http://localhost:3000/api/posts");
  const json = await res.json();
  return { posts: json.posts };
};

export default Home;
