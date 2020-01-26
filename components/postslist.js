import React, { Component } from "react";
const removeMd = require("remove-markdown");
import ReactMarkdown from "react-markdown";
import textElipsis from "text-ellipsis";
import * as Http from "../utils/http.helper";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";
import { Button } from "reactstrap";
import { Clock, Tag } from "react-feather";
import Swal from "sweetalert2";
import ReactResizeDetector from "react-resize-detector";
import windowSize from "react-window-size";
import "../style/postlist.scss";

class PostsList extends Component {
  state = {
    isMobile: false
  };

  StyleSelect(index, which, img) {
    if (which == "main") {
      if (index % 2 == 0) {
        return "main-block left-design";
      } else {
        return "main-block right-design";
      }
    } else if (which == "background") {
      if (index % 2 == 0) {
        return "background left";
      } else {
        return "background right";
      }
    } else if (which == "left") {
      if (index % 2 == 0) {
        return (
          <div className="image">
            <img src={img} alt="" />
          </div>
        );
      }
    } else if (which == "right") {
      if (index % 2 != 0) {
        return (
          <div className="image">
            <img src={img} alt="" />
          </div>
        );
      }
    }
  }

  AOS(index) {
    if (index % 2 == 0) {
      return "fade-right";
    } else {
      return "fade-left";
    }
  }

  IsMobile = (post, isMobile) => {
    if (isMobile == true) {
      return post.yatay;
    } else {
      return post.dikey;
    }
  };

  GetWidth = () => {
    var w = window.innerWidth;
    if (w < 767) {
      this.setState({
        isMobile: true
      });
    } else {
      this.setState({
        isMobile: false
      });
    }
  };

  render() {
    const { veri, searchi, isAdmin, token } = this.props;

    const deletePost = (slug) => {
      Swal.fire({
        title: "Emin misiniz?",
        text: "Bu işlem geri alınamaz!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          Http.post(
            "blog-operations/delete-post",
            { slug: slug },
            { userToken: token }
          ).then(res => {
            if (res.status) {
              Swal.fire("Silindi!", "İşlem başarıyla gerçekleşti", "success").then(()=>{window.location.reload()});
            } else {
              Swal.fire(
                "Bir hata oluştu",
                "Detaylar konsola yazdırılıyor",
                "error"
              );
            }
          });
        } else {
          Swal.fire("İptal Edildi", "Post hala güvende :)", "error");
        }
      });
    };

    return (
      <div className="ortala">
        <ReactResizeDetector
          handleWidth
          handleHeight
          onResize={this.GetWidth}
        />

        {veri.map((post, index) => (
          <div
            key={index}
            className="post"
            is-admin={isAdmin ? "true" : "false"}
            data-aos={this.AOS(veri.indexOf(post))}
          >
            <div className={this.StyleSelect(veri.indexOf(post), "main")}>
              <div className="front">
                {this.StyleSelect(veri.indexOf(post), "right", post.img)}
                <div className="textarea">
                  <div className="icons">
                    <div className="highlight clock">
                      <Clock size="16" color="#000" />
                      {post.date}
                    </div>
                    <div className="highlight tag">
                      <Tag size="16" color="#000" />
                      {post.tag}
                    </div>
                  </div>
                  <div className="header">
                    <h3>{post.title}</h3>
                  </div>
                  <div className="text">
                    <p>{textElipsis(removeMd(post.details), 180)}</p>
                  </div>

                  <Link
                    href={
                      isAdmin
                        ? "/admin/new-post?modify=true&slug=" + post.slug
                        : "blog/" + post.slug
                    }
                  >
                    <a>
                      <div className="readmore">
                        {isAdmin ? "Düzenle" : "Devamını Oku"}
                      </div>
                    </a>
                  </Link>

                  {isAdmin ? (
                    <div
                      style={{ cursor: "pointer" }}
                      className="readmore"
                      onClick={() => {
                        deletePost(post.slug)
                      }}
                    >
                      Sil
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                {this.StyleSelect(veri.indexOf(post), "left", post.img)}
              </div>
              <div
                className={this.StyleSelect(veri.indexOf(post), "background")}
              ></div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default PostsList;
