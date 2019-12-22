import React from "react";
import fetch from "isomorphic-unfetch";
import Head from "next/head";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import "../style/main.scss";
import StyleCards from "../components/newstylecards";
import PostList from "../components/postslist";
import "../style/main.scss";



const Home = ({ posts }) => (
      
  <div className="container">

<Head>
      
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>Home</title>
        <link href="https://fonts.googleapis.com/css?family=Orbitron&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css?family=Megrim&display=swap" rel="stylesheet"></link>
        <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous"></link>
        <link rel="icon" href="/favicon.ico" />
        
      </Head>
    
   
      
        
        {/*<StyleCards veri={posts}/>*/}

        <PostList veri={posts}/>

        
      

        

    
      


    

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
