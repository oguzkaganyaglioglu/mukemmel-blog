import React from "react";
import fetch from "isomorphic-unfetch";
import Head from "next/head";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import PaginacionTabla from "../components/pageNav";
import Slider from '../components/slider'
import Slogan from '../components/slogan'


const isDark = true;
const Home = ({ posts }) => (
    
  <div className="container">
    <Head>
      
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <title>Home</title>
      <link href="https://fonts.googleapis.com/css?family=Orbitron&display=swap" rel="stylesheet"></link>
      <link href="https://fonts.googleapis.com/css?family=Megrim&display=swap" rel="stylesheet"></link>

      <link rel="icon" href="/favicon.ico" />
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous"></link>      

    </Head>
    
    
    <div className="hero">
      <h1 className="hero-title">Oguz Kagan Yaglıoglu</h1>
      <hr style={{borderColor:"#707070", width:"550px"}} />
      
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
    

    <Slider />

    

    <div className="cards">
      <div className="card text-white bg-dark mb-3" style={{maxWidth:"18rem"}}>
        <div className="card-header">Header</div>
        <div className="card-body">
          <h5 className="card-title">Dark card title</h5>
          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
      </div>
    </div>

    {posts.map(post => (

      <div className="blog">
        <h2 className="blog-title">
          <Link href={post.slug}>
            <a className="blog-title-link">{post.title}</a>
          </Link>
        </h2>
        <div className="lead">
          
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


    <style jsx global>{`
    
    body::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
      background-color: #001517;
    }
      
    body::-webkit-scrollbar {
      width: 6px;
      background-color: #F5F5F5;
    }
      
    body::-webkit-scrollbar-thumb {
      background-color: #000d0d;
      
    }
    
    `}</style>    


    <style jsx>{`
      :global(body){
        background-color: #001517;
        transition:background-color 1s;
        
      }


      .container {
        max-width: 800px;
        width: 100%;
        margin: 0 auto;
        //font-family: 'Quicksand', sans-serif;
        //background-color: #030013;
        transform: translateY(-4em);
        
      }

      .hero {
        text-align: center;
         margin: 96px 0;
      //   color:#232526;
      
      }
      

      .social-link {
        margin-right: 8px;
        font-weight: 300;
        color:#353F40;
      }

      .hero-title {
        font-size: 48px;
        margin: 0 auto;
        font-weight: 400;
        color:#707070;
        font-family: 'Megrim', cursive;
        
      }

      .lead{
        position: relative;
        height: 90px;
        overflow:hidden;
        line-height:30px;
      }

      .lead:after{
        content: "Devamını oku";
        font-size:18px;
        text-align: right;
        position: absolute;
        bottom: 0;
        right: 0;
        width: 50%;
        height: 1.2em;
        background: linear-gradient(to right,rgba(53, 63, 64, 0),rgba(53, 63, 64,1) 50%);
      }

      .blog-date {
        text-align: right;
        color: #232526;
        
        margin: 12px 0 48px 0;
      }

      .blog-text-link{
        color:#9A9A9A;
        text-decoration: none;
      }

      .blog{
        //border-bottom: 1px #70707047 solid;
      }

      a {
        color: #707070;
        text-decoration: none;
      }
    `}</style>
  </div>
);

Home.getInitialProps = async ({ req }) => {
  // TODO: aşağıdaki satırda bulunan adresi kendi sunucu adresinle değiştirmelisin
  const res = await fetch("http://localhost:3000/api/posts");
  const json = await res.json();
  return { posts: json.posts };
};

export default Home;
