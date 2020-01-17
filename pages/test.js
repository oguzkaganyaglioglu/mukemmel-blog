import React from "react";
import fetch from "isomorphic-unfetch";
import Head from "next/head";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import PaginacionTabla from "../components/pageNav";
import Cards from "../components/cards"

import Slogan from '../components/slogan'
import Typical from "react-typical"

import "../style/main.scss";

const Home = ({ posts }) => (
    
  <div className="container editted-container">
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
    



    

    <Cards veri={posts}/>
    <br/>

    
    {posts.map(post => (

      <div className="blog">
        <h2 className="blog-title">
          <Link href={post.slug}>
            <a className="blog-title-link">{post.title}</a>
          </Link>
        </h2>
        <div className="lead blog-detail">
          
          <Link href={post.slug}>
            <a className="blog-text-link"><ReactMarkdown source={post.details} /></a>
          </Link>
        </div>
        <div className="blog-date">{post.date}</div>
        <hr/>
      </div>
    ))}
    
    <div className="footer">
    </div>
  </div>
);

Home.getInitialProps = async ({ req }) => {
  // TODO: aşağıdaki satırda bulunan adresi kendi sunucu adresinle değiştirmelisin
  const res = await fetch(`${process.env.DOMAIN}/api/posts`);
  const json = await res.json();
  return { posts: json.posts };
};

export default Home;
