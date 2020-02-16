import React, { Component } from "react";
import Head from "next/head";

export class FooterCopyright extends Component {
  render() {
    return (
      <div>
        <Head>
          <link
            href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
            rel="stylesheet"
            integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN"
            crossOrigin="anonymous"
          ></link>
        </Head>
        <footer id="footerpad">
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-lg-8 mx-auto">
                <ul className="list-inline text-center">
                  <li className="list-inline-item">
                    <a href="https://twitter.com/oguzkagan05/with_replies" target="_blank">
                      <span className="fa-stack fa-lg">
                        <i className="fa fa-circle fa-stack-2x"></i>
                        <i className="fa fa-twitter fa-stack-1x fa-inverse"></i>
                      </span>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="https://www.instagram.com/oguz_kagan05/" target="_blank">
                      <span className="fa-stack fa-lg">
                        <i className="fa fa-circle fa-stack-2x"></i>
                        <i className="fa fa-instagram fa-stack-1x fa-inverse"></i>
                      </span>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="https://github.com/oguzkaganyaglioglu" target="_blank">
                      <span className="fa-stack fa-lg">
                        <i className="fa fa-circle fa-stack-2x"></i>
                        <i className="fa fa-github fa-stack-1x fa-inverse"></i>
                      </span>
                    </a>
                  </li>
                </ul>
                <p className="copyright text-muted text-center">
                  Copyright © Oğuz Kağan YAĞLIOĞLU 2020
                </p>
              </div>
            </div>
          </div>
          <style jsx>
            {`
              #footerpad {
                padding-top: 70px;
                padding-bottom: 20px;
                //background-color: #000000;
              }
              a {
                color: rgb(33, 37, 41);
              }

              a:focus,
              a:hover {
                color: #0085a1;
              }
            `}
          </style>
        </footer>
      </div>
    );
  }
}

export default FooterCopyright;
