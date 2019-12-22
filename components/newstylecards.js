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
        <div className="type1-title">
          <h5>Lorem ipsum</h5>
        </div>
        <div className="type1-smalltext">
          <p className="type1-smallp">&emsp;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent cursus mi eget dui vulputate, ut ornare metus elementum. Vestibulum dolor risus, feugiat id iaculis non, facilisis non nibh. Duis hendrerit, nisi ac elementum viverra, lectus nunc tincidunt mauris, sit amet malesuada quam dolor ultricies mi. Vestibulum et justo ac lorem mattis mattis quis ut mauris. Donec erat nibh, gravida in risus ac, dictum varius tortor. Aenean auctor auctor justo. Maecenas in nulla luctus, luctus dui at, vehicula turpis. Etiam rutrum est neque, aliquam placerat nisl consectetur ac. Proin ex orci, fermentum in fermentum sed, varius in turpis. Vivamus a felis dignissim, cursus sem non, semper orci. Proin quis facilisis orci, vel consequat turpis.</p>
        </div>

        </div>
        </div>

        <div className="type2">
          <div className="type2-img">
            <img src="..." alt=""/>
          </div>
          <div className="type2-date">
          10.10.10
        </div>
        <div className="type2-text">
        <div className="type2-title">
          <h5>Lorem ipsum</h5>
        </div>
        <div className="type2-smalltext">
          <p className="type2-smallp">&emsp;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent cursus mi eget dui vulputate, ut ornare metus elementum. Vestibulum dolor risus, feugiat id iaculis non, facilisis non nibh. Duis hendrerit, nisi ac elementum viverra, lectus nunc tincidunt mauris, sit amet malesuada quam dolor ultricies mi. Vestibulum et justo ac lorem mattis mattis quis ut mauris. Donec erat nibh, gravida in risus ac, dictum varius tortor. Aenean auctor auctor justo. Maecenas in nulla luctus, luctus dui at, vehicula turpis. Etiam rutrum est neque, aliquam placerat nisl consectetur ac. Proin ex orci, fermentum in fermentum sed, varius in turpis. Vivamus a felis dignissim, cursus sem non, semper orci. Proin quis facilisis orci, vel consequat turpis.</p>
        </div>

        </div>
</div>

        <div class="card mb-3" style={{maxWidth: "540px"}}>
  <div class="row no-gutters">
    <div class="col-md-4">
      <img src="..." class="card-img" alt="..."/>
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
      </div>
    </div>
  </div>
</div>
        

        
      </div>
      
    )
  }
}

export default StyleCards;
