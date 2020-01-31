import React, { Component } from "react";
import Head from "next/head";
import validate from "validate.js";
import * as Http from "../utils/http.helper";
import "../style/main.scss";
import HeadDesign from "../components/head";
import "../style/blog-post.scss";
import "../style/remove.scss";
import "../style/about.scss";
import FooterCopyright from "../components/footer";
import GoogleAnalytics from "../components/googleanalytics";
import Swal from "sweetalert2";

export class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      mail: "",
      message: ""
    };
  }
  render() {
    return (
      <div className="container editted-container">
        <GoogleAnalytics />
        <Head>
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <title>Hakkımda</title>
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

        <HeadDesign type="main" />
        <div className="postcontainer">
          <div className="post-background">
            <img src=""></img>
            <div className="blog blog-post">
              <h1 className="blog-title">
                <div className="blog-title-link">
                  <h1>Merhaba</h1>
                </div>
              </h1>
              <div className="blog-text">
                <div>
                  <div className="container">
                    <div className="row">
                      <div className="col-md-12">
                        <hr />
                        <p>
                          Ben Oğuz Kağan, 
                          <br />
                          <br />
                            Mersin Üniversitesi bilgisayar mühendisliği hazırlık
                          sınıfı öğrencisiyim. Blog yazmaya 2020 yılında
                          başladım. Başlama sebebim ise aslında Selman
                          Kahya&#39; nın düzenlediği bir yarışmaydı.
                          <br />
                          <br />
                             Bloğumda sizlere yazılımla ilgili konuları ve
                          yaptığım projelerimden bazılarını nasıl
                          yapabileceğinizi anlatıyorum.
                          <br />
                          <br />
                             İletişim için aşağıdaki formu kullanabilirsiniz
                          veya bana{" "}
                          <a href="mailto: oguzkagan05@gmail.com">
                            oguzkagan05@gmail.com
                          </a>
                           adresine mail atarak ulaşabilirsiniz
                          <br />
                          <br />
                        </p>
                        <hr />
                        <h2 className="text-center">İletişim Formu</h2>
                        <hr />
                        <form id="form" className="topBefore">
                          <input
                            type="text"
                            className="form-control form-elements remove-border"
                            id="name"
                            value={this.state.name}
                            onChange={e => {
                              this.setState({
                                name: e.target.value
                              });
                            }}
                            placeholder="İsim SOYİSİM"
                            name="name"
                            required
                          />
                          <input
                            type="email"
                            className="form-control form-elements remove-border"
                            value={this.state.mail}
                            onChange={e => {
                              this.setState({
                                mail: e.target.value
                              });
                            }}
                            placeholder="e-mail"
                            name="e-mail"
                            required
                          />
                          <textarea
                            className="form-control form-elements remove-border"
                            id="message"
                            value={this.state.message}
                            onChange={e => {
                              this.setState({
                                message: e.target.value
                              });
                            }}
                            name="text"
                            placeholder="Mesajınızı yazın"
                            required
                          ></textarea>
                          <button
                            className="btn btn-light btn-block form-elements remove-border"
                            id="submitbutton"
                            name="text"
                            onClick={e => {
                              const Toast = Swal.mixin({
                                toast: true,
                                position: "top-end",
                                showConfirmButton: false,
                                timer: 3000,
                                timerProgressBar: true,
                                onOpen: toast => {
                                  toast.addEventListener(
                                    "mouseenter",
                                    Swal.stopTimer
                                  );
                                  toast.addEventListener(
                                    "mouseleave",
                                    Swal.resumeTimer
                                  );
                                }
                              });
                              e.preventDefault();
                              var constraints = {
                                from: {
                                  email: true
                                }
                              };
                              const validation = validate(
                                { from: this.state.mail },
                                constraints
                              );
                              validation === undefined &&
                              this.state.name != "" &&
                              this.state.message != ""
                                ? Toast.fire({
                                    title:
                                      "Mesaj gönderimini onaylıyor musunuz?",
                                    icon: "info",
                                    showLoaderOnConfirm: true,
                                    showConfirmButton: true,
                                    timer: false,
                                    confirmButtonText: "Onaylıyorum",
                                    showCancelButton: true,
                                    cancelButtonText: "Onaylamıyorum",
                                    focusConfirm: true,
                                    preConfirm: () => {
                                      return Http.post("auth/send-message", {
                                        mail: this.state.mail,
                                        name: this.state.name,
                                        message: this.state.message
                                      });
                                    }
                                  }).then(res => {
                                    res.value === undefined
                                      ? Toast.fire({
                                          icon: "info",
                                          title: "Mesaj gönderimi iptal edildi"
                                        })
                                      : res.value.status === true
                                      ? Toast.fire({
                                          icon: "success",
                                          title:
                                            "Mesajınız başarıyla gönderildi"
                                        })
                                      : Toast.fire({
                                          icon: "error",
                                          title: "Bir sorun oluştu"
                                        });
                                  })
                                : Toast.fire({
                                    title: "Lütfen formu doldurun",
                                    icon: "info"
                                  });
                            }}
                            placeholder="Mesajınızı yazın"
                          >
                            GÖNDER
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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

export default About;
