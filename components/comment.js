import React, { Component } from "react";
import "../style/comment.scss";
import AOS from "aos";
import "aos/dist/aos.css";
const jwt = require("jsonwebtoken");
import ReactResizeDetector from "react-resize-detector";
require("dotenv").config();
import * as Http from "../utils/http.helper";
import {
  Slash,
  Edit,
  CornerDownRight,
  ThumbsDown,
  ThumbsUp,
  Trash2,
  PlusCircle
} from "react-feather";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: toast => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  }
});

export class CommentSystem extends Component {
  constructor(props) {
    super(props);

    this.operation = this.operation.bind(this);
  }

  AOS(index) {
    if (index % 2 == 0) {
      return "fade-right";
    } else {
      return "fade-left";
    }
  }

  componentDidMount() {
    AOS.init();
  }

  onResize = () => {
    AOS.refresh();
  }

  edit = (text, id, token) => {
    Swal.fire({
      input: "textarea",
      inputValue: text,
      inputPlaceholder: "Lütfen yorumunuzu buraya yazınız...",
      inputAttributes: {
        "aria-label": "Lütfen yorumunuzu buraya yazınız"
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
            Http.post(
              "comment/setComments",
              {
                commentId: id,
                operation: "edit",
                newComment: comment
              },
              {
                userToken: token
              }
            ).then(res => {
              console.log(res);
              if (res.status) {
                Toast.fire({
                  icon: "success",
                  title: "İşlem başarıyla gerçekleşti"
                });
              } else {
                Toast.fire({
                  icon: "error",
                  title: "İşlem başarısız oldu"
                });
              }
            });
          } else {
            this.edit(comment, id, token);
          }
        });
      }
    });
  }

  operation = (type, id, token) => {
    Http.post(
      "comment/setComments",
      {
        commentId: id,
        operation: type,
      },
      {
        userToken: token
      }
    ).then(res => {
      console.log(res);
      if (res.status) {
        Toast.fire({
          icon: "success",
          title: "İşlem başarıyla gerçekleşti"
        });
      } else {
        Toast.fire({
          icon: "error",
          title: "İşlem başarısız oldu"
        });
      }
    });
  };
  render() {
    const { token, comments, slug } = this.props;
    const handleSendComment = (text, modify) => {
      if (!modify) {
        text = "";
      }
      Swal.fire({
        input: "textarea",
        inputValue: text,
        inputPlaceholder: "Lütfen yorumunuzu buraya yazınız...",
        inputAttributes: {
          "aria-label": "Lütfen yorumunuzu buraya yazınız"
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
              //console.log("sended");
              Http.post(
                "comment/addComment",
                {
                  comment: comment,
                  postSlug: slug
                },
                {
                  userToken: token
                }
              ).then(res => {
                //console.log(res.status);
              });
            } else {
              handleSendComment(comment, true);
            }
          });
        }
      });
    };

    const verify = () => {
      return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          //res.status(403).json(isEmpty(err) ? { message: 'Wrong token!' } : err);
          return false;
        } else {
          //return true;
          return decoded;
        }
      });
    };

    const verifyRoute = comment => {
      
      if (verify() != false) {
        if (verify().admin) {
          return (
            <h4
              className="text-truncate"
              style={{
                color: "rgb(255,255,255)",
                marginTop: "15px",
                marginBottom: "13px",
                marginBottom: "8px",
                paddingBottom: "5px"
              }}
            >
              <Edit
                size={"20px"}
                id="edit"
                className="float-right comment-icons"
                style={{ margin: "0 5px" }}
                onClick={() => {
                  this.edit(comment.comment, comment._id, token);
                }}
              />
              <Trash2
                size={"20px"}
                id="delete"
                className="float-right comment-icons"
                style={{ margin: "0 5px" }}
                onClick={() => {
                  this.operation("delete", comment._id, token);
                }}
              />
              <Slash
                size={"20px"}
                id="ban"
                className="float-right comment-icons"
                style={{ margin: "0 5px" }}
                onClick={() => {
                  this.operation("ban", comment._id, token);
                }}
              />
              {/* <CornerDownRight
                size={"20px"}
                id="reply"
                className="float-right comment-icons"
                style={{ margin: "0 5px" }}
              /> */}
              {comment.userName}
            </h4>
          );
        } else if (verify().userId === comment.userId) {
          return (
            <h4
              className="text-truncate"
              style={{
                color: "rgb(255,255,255)",
                marginTop: "15px",
                marginBottom: "13px",
                marginBottom: "8px",
                paddingBottom: "5px"
              }}
            >
              <Edit
                size={"20px"}
                id="edit"
                className="float-right comment-icons"
                style={{ margin: "0 5px" }}
                onClick={() => {
                  this.edit(comment.comment, comment._id, token);
                }}
              />
              <Trash2
                size={"20px"}
                id="delete"
                className="float-right comment-icons"
                style={{ margin: "0 5px" }}
                onClick={() => {
                  this.operation("delete", comment._id, token);
                }}
              />
              {/*
                    <Slash
                      size={"20px"}
                      id="ban"
                      className="float-right comment-icons"
                      style={{ margin: "0 5px" }}
                      onClick={() => {
                        this.operation("ban", comment._id, token);
                      }}
                    /> 
              <CornerDownRight
                size={"20px"}
                id="reply"
                className="float-right comment-icons"
                style={{ margin: "0 5px" }}
              />
              */}
              {comment.userName}
            </h4>
          );
        } else {
        return (
          <h4
            className="text-truncate"
            style={{
              color: "rgb(255,255,255)",
              marginTop: "15px",
              marginBottom: "13px",
              marginBottom: "8px",
              paddingBottom: "5px"
            }}
          >
            {comment.userName}
          </h4>
        );
      }
      } else {
        return (
          <h4
            className="text-truncate"
            style={{
              color: "rgb(255,255,255)",
              marginTop: "15px",
              marginBottom: "13px",
              marginBottom: "8px",
              paddingBottom: "5px"
            }}
          >
            {comment.userName}
          </h4>
        );
      }
    };

    const commentTime = comment => {
      if (((new Date - new Date(comment.dateCreated)) / (1000 * 3600 * 24 * 30 * 12) > 1)) { // date / (1000 * 3600 * 24 * 30 * 12) ay cinsinden

        return (Math.ceil((new Date - new Date(comment.dateCreated)) / (1000 * 3600 * 24 * 30 * 12)) + " yıl önce");
    
      } else if (((new Date - new Date(comment.dateCreated)) / (1000 * 3600 * 24 * 30) > 1)) { // date / (1000 * 3600 * 24 * 30) ay cinsinden

        return (Math.ceil((new Date - new Date(comment.dateCreated)) / (1000 * 3600 * 24 * 30)) + " ay önce")
        
      } else if (((new Date - new Date(comment.dateCreated)) / (1000 * 3600 * 24) > 1)) { // date / (1000 * 3600 * 24) gün cinsinden

        return (Math.ceil((new Date - new Date(comment.dateCreated)) / (1000 * 3600 * 24)) + " gün önce")
  
      } else if (((new Date - new Date(comment.dateCreated)) / (1000 * 3600) > 1)) { // date / (1000 * 3600) saat cinsinden

        return (Math.ceil((new Date - new Date(comment.dateCreated)) / (1000 * 3600)) + " saat önce")

      } else if (((new Date - new Date(comment.dateCreated)) / (1000 * 60) > 1)) { // date / (1000) dk cinsinden

        return (Math.ceil((new Date - new Date(comment.dateCreated)) / (1000 * 60)) + " dakika önce")

      } else if (((new Date - new Date(comment.dateCreated)) / (1000) > 1)) { // date / (1000) sn cinsinden

        return (Math.ceil((new Date - new Date(comment.dateCreated)) / (1000)) + " saniye önce")

      }
    }

    return (
      <div>
      <ReactResizeDetector handleWidth handleHeight onResize={this.onResize} />
        <h2
          style={{
            margin: "50px 0 40px",
            fontWeight: "400",
            textAlign: "center",
            background:
              "linear-gradient(to right, rgba(51, 51, 51, 0.66) 0%, rgba(255, 30, 131, 0.66) 15.47%, rgba(255, 51, 62, 0.49) 51.03%, rgba(255, 70, 0, 0.73) 83.26%, #000 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          YORUMLAR
          <PlusCircle id="addComment" onClick={handleSendComment} />
        </h2>

        {comments.map((comment, index) => (
          <div
            className="row"
            style={{ margin: "20px 0" }}
            key={index}
            data-aos={this.AOS(comments.indexOf(comment))}
          >
            <div className="col d-flex d-sm-flex d-md-flex d-lg-flex justify-content-center justify-content-sm-center justify-content-md-center justify-content-lg-center">
              <div className="comment-backgroud">
                <div className="comment-front" style={{ filter: "blur(0px)" }}>
                  <div className="float-left">
                    <div className="profile-photo-div">
                      <img
                        className="img-fluid profile-photo"
                        style={{ filter: "brightness(100%)" }}
                        src="/butterfly.jpg"
                      />
                    </div>
                  </div>
                  <div style={{ color: "rgb(255,255,255)" }}>
                    {verifyRoute(comment)}

                    <p style={{ color: "rgb(169,169,169)" }}>
                      <ThumbsUp
                        className="comment-icons"
                        size={"18px"}
                        style={{ margin: "0 7px" }}
                      />
                      <ThumbsDown
                        className="comment-icons"
                        size={"18px"}
                        style={{ margin: "0 7px" }}
                      />
                      {/* 15dk önce  //TODO: zaman eklenecek */}
                      {commentTime(comment)}
                    </p>
                    <p
                      className="text-justify comment-text"
                      style={{ color: "rgb(255,255,255)", padding: "0 10px" }}
                    >
                      {comment.comment}
                      <br />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default CommentSystem;
