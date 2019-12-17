import React from "react";
import fetch from "isomorphic-unfetch";
import Head from "next/head";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import Typical from "react-typical";
import Slogan from '../components/slogan'
import "../style/main.scss";

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

      <div className="hero">
      <Link href="/">
      <a className="hero-title">
      <Typical
            steps={['Hello 👋🏽',
                    1000,
                    "I'm a designer 🖊️",
                    1000,
                    "I'm a developer 💻",
                    1000,
                    "Who am I?",
                    1000,
                    "I am",
                    1000,
                    'Oguz Kagan Yaglıoglu',
                    1500
                    
            ]}
            
            wrapper="p"
            />


        </a>
        </Link>
      <hr style={{borderColor:"#707070", maxWidth:"550px"}} />
      
      <Slogan />

      <div className="hero-social-links">
        <Link href="https://www.twitter.com/oguzkagan05">
          <a className="social-link">Twitter</a>
        </Link>
        <Link href="https://www.instagram.com/oguz_kagan05">
          <a className="social-link">Instagram</a>
        </Link>
      </div>
    </div>

    <div className="blog">
      <h2 className="blog-title">
        <Link >
          <a className="blog-title-link">{post.title}</a>
        </Link>
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
  const res = await fetch(`http://localhost:3000/api/post/${query.postId}`);
  const json = await res.json();
  return { post: json.post };
};

export default BlogPost;
