import React, { Component } from "react";
import ReactMarkdown from "react-markdown";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";
import { Button } from "reactstrap";
import Swal from "sweetalert2";
import ReactResizeDetector from "react-resize-detector";
import windowSize from "react-window-size";

class PostsList extends Component {
  state = {
    isMobile: false
  };

  StyleSelect(index) {
    if (index % 2 == 0) {
      return "card mb-3 left";
    } else {
      return "card mb-3 right";
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

    console.log(veri[0]);

    return (
      <div className="ortala">
        <ReactResizeDetector
          handleWidth
          handleHeight
          onResize={this.GetWidth}
        />
        {veri.map(post => (
          <div
            data-aos={this.AOS(veri.indexOf(post))}
            className={this.StyleSelect(veri.indexOf(post))}
            style={{ maxWidth: "540px" }}
          >
            {/*console.log(this.StyleSelect(veri.indexOf(post)))*/}

            <div className="row no-gutters">
              <div className="col-md-4">
                <img
                  src={this.IsMobile(post, this.state.isMobile)}
                  className="card-img"
                  alt="..."
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text" style={{ fontSize: "1em" }}>
                    <ReactMarkdown source={post.summary} />
                  </p>
                  <p className="card-text">
                    <small class="text-muted">{post.date}</small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
        <style jsx>{`
          .right {
            margin-left: 5em !important;
            background: #2b1738 !important;
          }
          .left {
            margin-right: 5em !important;
            background: #1f1738 !important;
          }
          .ortala {
            margin-left: 10%;
            margin-right: 10%;
          }
          .link {
            margin-left: 11em;
          }
        `}</style>
      </div>
    );
  }
}

export default PostsList;
