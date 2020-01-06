import React, { Component } from "react";
import PropTypes from "prop-types";
import "../style/slider.scss";
import { Link } from "react-feather";

export class LikeSlider extends Component {
  static propTypes = {};

  render() {
    const { veri } = this.props;

    return (
      <div className="slider-ortala">
        <div className="slider-background ">
          <div className="small slider-float">
            <div className="small-box box">
              <div className="slider-image-yatay">
                <a href={"blog/" + veri[0].slug}>
                  <img src={veri[0].img} alt="" />
                  <h3 className="box-header" align="left">
                    {veri[0].title}
                  </h3>
                </a>
              </div>
            </div>
            <div className="small-box box">
              <div className="slider-image-yatay">
                <a href={"blog/" + veri[1].slug}>
                  <img src={veri[1].img} alt="" />
                  <h3 className="box-header" align="left">
                    {veri[0].title}
                  </h3>
                </a>
              </div>
            </div>
          </div>
          <div className="big slider-float">
            <div className="big-box box">
              <div className="slider-image-dikey">
                <a href={"blog/" + veri[2].slug}>
                  <img src={veri[2].img} alt="" />
                  <h3 className="box-header-dikey" align="left">
                    {veri[0].title}
                  </h3>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LikeSlider;
