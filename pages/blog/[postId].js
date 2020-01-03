import React from "react";
import fetch from "isomorphic-unfetch";
import Head from "next/head";
import ReactMarkdown from "react-markdown";
import "../../style/main.scss";
import HeadDesign from "../../components/head";

const BlogPost = ({ post }) => (
  <div className="container">
    <Head>
      
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>Home</title>
        <link href="https://fonts.googleapis.com/css?family=Orbitron&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css?family=Megrim&display=swap" rel="stylesheet"></link>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" 
          integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" 
          crossorigin="anonymous"></link>
        <link rel="icon" href="/favicon.ico" />
        
      </Head>

      <HeadDesign
          type="slogan"
        />

    <div className="blog">
      <h2 className="blog-title">    
          <div className="blog-title-link">{post.title}</div>
      </h2>
      <div className="blog-text">
        <ReactMarkdown source={post.details} />
      </div>
      <div className="blog-date">{post.date}</div>
    </div>

  </div>
);

BlogPost.getInitialProps = async ({ req, query }) => {
  // TODO: aşağıdaki satırda bulunan adresi kendi sunucu adresinle değiştirmelisin
  const res = await fetch(`${process.env.DOMAIN}api/post/${query.postId}`);
  const json = await res.json();
  return { post: json.post };
};

export default BlogPost;
