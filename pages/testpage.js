import React from "react";
import fetch from "isomorphic-unfetch";
import Head from "next/head";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import "../style/main.scss";
import StyleCards from "../components/newstylecards"
import "../style/main.scss";



const Home = ({ posts }) => (
      
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
    
   
      
        
        <StyleCards veri={posts}/>
      

        

    
      


    

    <style jsx>
      {`
      .container{
        transform: translateY(0em);
      }
      `}
    </style>

  </div>
);

Home.getInitialProps = async ({ req }) => {
  // TODO: aşağıdaki satırda bulunan adresi kendi sunucu adresinle değiştirmelisin
  const res = await fetch("http://localhost:3000/api/posts");
  const json = await res.json();
  return { posts: json.posts };
};

export default Home;
