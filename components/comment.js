import React, { Component } from "react";
import { Slash, Edit, CornerDownRight, ThumbsDown, ThumbsUp, Trash2 } from "react-feather";

export class CommentSystem extends Component {
  render() {
    return (
      <div>
        <div className="row">
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
                      marginBottom: "13px"
                    }}
                  >
                    <div className="float-right"><Edit/></div>
                    <div className="float-right"><Trash2/></div>
                    <div className="float-right"><Slash/></div>
                    <div className="float-right"><CornerDownRight/></div>
                    Oğuz Kağan
                    Yağlıoğlu
                  </h4>
                  <p style={{ color: "rgb(169,169,169)" }}>
                    <i
                      className="typcn typcn-thumbs-up float-left"
                      style={{ color: "rgb(255,255,255)", padding: "0 7px" }}
                    ></i>
                    <i
                      className="typcn typcn-thumbs-down float-left"
                      style={{ color: "rgb(255,255,255)", padding: "0 7px" }}
                    ></i>
                    15dk önce
                  </p>
                  <p
                    className="text-justify comment-text"
                    style={{ color: "rgb(255,255,255)", padding: "0 10px" }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nulla eget ultrices tortor, quis rhoncus magna. Praesent
                    lacus purus, imperdiet sodales mauris sed, malesuada
                    ullamcorper nisi. Cras laoreet magna in metus aliquet, ut
                    eleifend ex pulvinar. Proin ac sapien nec justo ornare
                    blandit. Maecenas sed tempus neque, at aliquet ex. Etiam
                    luctus odio id pulvinar vehicula. Sed varius risus id lorem
                    tincidunt rhoncus. Vestibulum sit amet dui quam. Nunc et
                    cursus enim. Aenean posuere justo eu nisi tempor, fermentum
                    aliquet arcu scelerisque. Nulla rutrum massa id pulvinar
                    facilisis. Sed at dictum mi. Integer purus purus, ornare eu
                    eros nec, consequat suscipit sapien. Nam vestibulum sodales
                    nibh ut scelerisque. Nunc molestie felis turpis, eget
                    vestibulum ligula mattis a.
                    <br />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <style jsx>
          {`
            .comment-backgroud {
            width: auto;
            max-width: 750px;
            border-radius: 61px 0px;
            background: linear-gradient(to left, rgba(255,30,131,0.5), rgba(255,70,0,0.5));
            box-shadow: 0px 0px 10px #fff;
            position: relative;
            padding: 4px;
            }

            .comment-front {
            height: 100%;
            border-radius: 58.5px 0px;
            background: #050014;
            opacity: 1;
            padding: 4px;
            }

            .profile-photo-div {
            width: 90px;
            height: 90px;
            border-radius: 50%;
            -webkit-box-shadow: 0px 0px 50px 0px rgba(4,201,221,1);
            -moz-box-shadow: 0px 0px 50px 0px rgba(4,201,221,1);
            box-shadow: 0px 0px 50px 0px rgba(4,201,221,1);
            overflow: hidden;
            margin: 10px;
            margin-right: 20px;
            }

            .profile-photo {
            width: 90px;
            height: 90px;
            /**/filter: drop-shadow(0px 0px 6px #04c9dd);*/
            }
            `}
        </style>
      </div>
    );
  }
}

export default CommentSystem;
