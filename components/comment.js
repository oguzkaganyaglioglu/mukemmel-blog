import React, { Component } from "react";
import "../style/comment.scss";
import AOS from "aos";
import "aos/dist/aos.css";
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

  operation = (type, id, token) => {
    Http.post(
      "comment/setComments",
      {
        commentId: id,
        operation: type
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
    const { token, comments } = this.props;
    return (
      <div>
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
          <PlusCircle id="addComment"/>
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
                          this.operation("edit", comment._id, token);
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
                      <CornerDownRight
                        size={"20px"}
                        id="reply"
                        className="float-right comment-icons"
                        style={{ margin: "0 5px" }}
                      />
                      {comment.userName}
                    </h4>
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
