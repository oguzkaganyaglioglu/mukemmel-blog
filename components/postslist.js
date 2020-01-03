import React, { Component } from "react";
const removeMd = require("remove-markdown");
import ReactMarkdown from "react-markdown";
import textElipsis from "text-ellipsis";
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

  StyleSelect(index, which) {
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
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRyN1hJHoxAEd00irAw_mtBvBfS5WI-TnwIDibPtTGuzkNxFX8U"
              alt=""
            />
          </div>
        );
      }
    } else if (which == "right") {
      if (index % 2 != 0) {
        return (
          <div className="image">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRyN1hJHoxAEd00irAw_mtBvBfS5WI-TnwIDibPtTGuzkNxFX8U"
              alt=""
            />
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

  componentDidMount() {
    AOS.init();
  }

  makeSearch(filtveri) {
    if (
      filtveri.title.indexOf(this.props.search) >= 0 &&
      filtveri.summary.indexOf(this.props.search) >= 0
    ) {
      return filtveri;
    }
  }

  render() {
    const { veri, search } = this.props;
    return (
      <div className="ortala">
        <ReactResizeDetector
          handleWidth
          handleHeight
          onResize={this.GetWidth}
        />

        {veri.map((post, index) => (
          <div key={index} data-aos={this.AOS(veri.indexOf(post))}>
            <div className={this.StyleSelect(veri.indexOf(post), "main")}>
              <div className="front">
                {this.StyleSelect(veri.indexOf(post), "right")}
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
                    <h3>Akıllı Lamba</h3>
                  </div>
                  <div className="text">
                    <p>{textElipsis(removeMd(post.details), 180)}</p>
                  </div>
                  <Link href={post.slug}>
                    <a>
                      <div className="readmore">Devamını Oku</div>
                    </a>
                  </Link>
                </div>
                {this.StyleSelect(veri.indexOf(post), "left")}
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
