import React, { Component } from "react";
import ReactMarkdown from "react-markdown";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";
import { Button } from "reactstrap";
import Swal from "sweetalert2";
import ReactResizeDetector from "react-resize-detector";
import windowSize from "react-window-size";
import "../style/postlist.scss";

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
    return (
      <div className="ortala">
        <ReactResizeDetector
          handleWidth
          handleHeight
          onResize={this.GetWidth}
        />

            <div className="main-block left-design">
            <div className="textarea">
            <div className="header">
                <h3>Akıllı Lamba</h3>
              </div>
              <div className="text">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et nulla eu velit tempor faucibus. Duis ipsum nunc, hendrerit sit amet tristique tempor, malesuada et ipsum. Vestibulum porta elementum turpis nec pellentesque. Cras egestas vitae nulla quis euismod. Etiam id nisi at sapien cursus tempor at convallis erat. Proin a ornare magna. Morbi aliquam elementum odio quis bibendum. Mauris nec vestibulum enim. Maecenas sed nunc at nisl sodales lacinia. Nam lobortis rhoncus aliquet. Suspendisse potenti. Donec efficitur placerat lacus vitae rutrum. Sed arcu dui, sodales accumsan imperdiet non, semper ac diam. Donec a sem a erat tincidunt gravida. Phasellus condimentum nunc sit amet velit pellentesque, vitae imperdiet nisi pharetra.</p>
              </div>
            </div>    
            <div className="image">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRyN1hJHoxAEd00irAw_mtBvBfS5WI-TnwIDibPtTGuzkNxFX8U" alt=""/>
            </div>       
              <div className="background">
              </div>
              
            </div>
        {veri.map((post, index) => (
          <div
            key={index}
            data-aos={this.AOS(veri.indexOf(post))}
          >
            
          </div>
        ))}
      </div>
    );
  }
}

export default PostsList;
