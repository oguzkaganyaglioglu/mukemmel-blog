import React, { Component } from 'react'
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import "../style/cards.scss"




class StyleCards extends Component {
  
  
  render() {
    const{veri} = this.props;
    
      
    
    return (
      <div className="kartlar">
        <div className="type1">
        <div className="type1-img">
          <img src="..." alt=""/>
        </div>
        <div className="type1-date">
          10.10.10
        </div>
        <div className="type1-text">
        <div className="title">
          <h5>Lorem ipsum</h5>
        </div>
        <div className="smalltext">
          <p className="smallp">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent cursus mi eget dui vulputate, ut ornare metus elementum. Vestibulum dolor risus, feugiat id iaculis non, facilisis non nibh. Duis hendrerit, nisi ac elementum viverra, lectus nunc tincidunt mauris, sit amet malesuada quam dolor ultricies mi. Vestibulum et justo ac lorem mattis mattis quis ut mauris. Donec erat nibh, gravida in risus ac, dictum varius tortor. Aenean auctor auctor justo. Maecenas in nulla luctus, luctus dui at, vehicula turpis. Etiam rutrum est neque, aliquam placerat nisl consectetur ac. Proin ex orci, fermentum in fermentum sed, varius in turpis. Vivamus a felis dignissim, cursus sem non, semper orci. Proin quis facilisis orci, vel consequat turpis.</p>
        </div>

        </div>
        </div>

        <div className="type2">
          
        </div>
      </div>
      
    )
  }
}

export default StyleCards;
