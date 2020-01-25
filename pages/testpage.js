import React, { Component } from "react";
import * as Http from "../utils/http.helper";
import Swal from "sweetalert2";
import axios from "axios";
const jwt = require("jsonwebtoken");
import fetch from "isomorphic-unfetch";
import Head from "next/head";

export class Testpage extends Component {
  handleSendPost = token => {
    console.log("sended");
    Http.post(
      "comment/addComment",
      {
        title: "Başlık3",
        comment: "Deneme yorumu3"
      },
      {
        userToken: token
      }
    ).then(res => {
      console.log(res.status);
    });
  };

  render() {
    const { token } = this.props;

    const handleSendComment = (text, modify) => {
      if (!modify) {
        text = "";
      }
      Swal.fire({
        input: "textarea",
        inputValue: text,
        inputPlaceholder: "Type your message here...",
        inputAttributes: {
          "aria-label": "Type your message here"
        },
        showCancelButton: true,
        confirmButtonText: "Gönder",
        cancelButtonText: "İptal et"
      }).then(result => {
        if (result.value) {
          const comment = result.value;
          Swal.fire({
            showCancelButton: true,
            title: "Yorumunuzu onaylıyor musunuz?",
            html: `
              <pre><p>${comment}</p></pre>
            `,
            confirmButtonText: "Gönder",
            cancelButtonText: "Düzenle"
          }).then(result => {
            if (result.value) {
              console.log("sended");
              Http.post(
                "comment/addComment",
                {
                  comment: comment
                },
                {
                  userToken: token
                }
              ).then(res => {
                console.log(res.status);
              });
            } else {
              handleSendComment(comment, true);
            }
          });
        }
      });
    };

    return (
      <div>
        <Head>
          <link
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
            crossOrigin="anonymous"
          ></link>
        </Head>
        <button onClick={handleSendComment}>Selamm</button>
      </div>
    );
  }
}
Testpage.getInitialProps = async ({ req }) => {
  return {
    token: req.session.userToken
  };
};

export default Testpage;
