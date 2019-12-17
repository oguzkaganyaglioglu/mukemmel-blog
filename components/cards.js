import React, { Component } from 'react'
import Link from "next/link";
import ReactMarkdown from "react-markdown";




class Cards extends Component {
  
  
  render() {
    const{veri} = this.props;
    
      
    
    return (
      
      <div className="Kartlar">
      {veri.slice(0,3).map(post => (
        
        
        <div className="cards" key={post.id} style={{display:"inline-block", margin:"10px 10px 0"}}>
        
        <div className="card text-white bg-dark mb-3" style={{maxWidth:"16rem"}}>
        <Link href={post.slug}>
        <a className="card text-white bg-dark">
        <div className="card-header">{post.title}</div>
        
        <div className="card-body lead">
        {/*<h5 className="card-title">Dark card title</h5>*/}
        <p className="card-text" ><ReactMarkdown source={post.details.slice(0,50)+"..."}/></p>
        </div>
        <div className="card-header" style={{textAlign: "right", color:"#00000030"}}>{post.date}</div>
        </a>
      </Link>
      </div>
      
    </div>
    

       
      ))}
      
      <style jsx>
        {`
        a {
            transition: 0.5s;
        }
          .Kartlar{
            overflow: auto;
            white-space: nowrap;
          }
          .Kartlar::-webkit-scrollbar-track {
          -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
            background-color: #001517;
          }
            
          .Kartlar::-webkit-scrollbar {
            
            
            height: 6px;
            background-color: #F5F5F5;
          }

          .Kartlar::-webkit-scrollbar-thumb {
            -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
            background-color: #001517;
            
          }
        }
        
        
        ::-webkit-scrollbar-thumb:hover {
        background: #000d0d; 
        }
        
                  
        `}
      </style>
      </div>
    )
  }
}

export default Cards;
