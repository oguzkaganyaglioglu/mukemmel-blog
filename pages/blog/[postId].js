import React, { Component } from "react";
import fetch from "isomorphic-unfetch";
import Head from "next/head";
import ReactMarkdown from "react-markdown";
import "../../style/main.scss";
import HeadDesign from "../../components/head";
import "../../style/blog-post.scss";
import FooterCopyright from "../../components/footer";
import CommentSystem from "../../components/comment";
import GoogleAnalytics from "../../components/googleanalytics";

export class BlogPost extends Component {
  render() {
    const { post, token, comments, slug } = this.props;
    return (
      <div className="container editted-container">
        <GoogleAnalytics />
        <Head>
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <title>{post.title}</title>
          <link
            href="https://fonts.googleapis.com/css?family=Orbitron&display=swap"
            rel="stylesheet"
          ></link>
          <link
            href="https://cdnjs.cloudflare.com/ajax/libs/typicons/2.0.9/typicons.min.css"
            rel="stylesheet"
          ></link>
          <link
            href="https://fonts.googleapis.com/css?family=Megrim&display=swap"
            rel="stylesheet"
          ></link>
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"
            integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4"
            crossOrigin="anonymous"
          ></link>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <HeadDesign type="slogan" />
        <div className="postcontainer">
          <div className="post-background">
            <img src={post.img}></img>
            <div className="blog blog-post">
              <h1 className="blog-title">
                <div className="blog-title-link">{post.title}</div>
              </h1>
              <div className="blog-text">
                <ReactMarkdown source={post.details} />
              </div>
              <div className="blog-date">{post.date}</div>
            </div>
          </div>
        </div>
        <CommentSystem token={token} comments={comments} slug={slug} />
        <FooterCopyright />
        <style jsx global>{`
          img {
            width: 100%;
          }
        `}</style>
      </div>
    );
  }
}

BlogPost.getInitialProps = async ({ req, query }) => {
  // TODO: aşağıdaki satırda bulunan adresi kendi sunucu adresinle değiştirmelisin
  const post_res = await fetch(
    `${process.env.DOMAIN}/${process.env.API_VERSION}/blog/posts?post=${query.postId}`
  );
  const comment_res = await fetch(
    `${process.env.DOMAIN}/${process.env.API_VERSION}/comments/comments?post=${query.postId}`
  );

  const post_json = await post_res.json();
  const comment_json = await comment_res.json();
  return {
    post: post_json.post,
    comments: comment_json.comments,
    token: req.session.userToken,
    slug: query.postId
  };
};

export default BlogPost;
