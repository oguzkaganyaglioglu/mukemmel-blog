import React, { Component } from 'react'
import ReactMarkdown from "react-markdown";
import AOS from 'aos';
import 'aos/dist/aos.css'; 

class PostsList extends Component {




    StyleSelect(index){
        if (index%2==0) {
            return 'card mb-3 left'
        }else{
            return 'card mb-3 right'
        }
    }

    AOS(index){
        if (index%2==0) {
            return 'fade-right'
        }else{
            return 'fade-left'
        }
    }

    componentDidMount() {
        AOS.init();
      }
    
    render() {
        const {veri}= this.props;
        console.log(this.StyleSelect(veri.indexOf(veri[3])));
        return (
            <div className="ortala">
                {veri.map(post => (
                    
                <div data-aos={this.AOS(veri.indexOf(post))} className={this.StyleSelect(veri.indexOf(post))} style={{maxWidth: "540px"}}>
                {console.log(this.StyleSelect(veri.indexOf(post)))}
                <div className="row no-gutters">
                <div className="col-md-4">
                <img src="..." className="card-img" alt="..."/>
                </div>
                <div className="col-md-8">
                <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text" style={{fontSize:"1em"}}><ReactMarkdown source={post.details.slice(0,50)+"..."} /></p>
                <p className="card-text"><small class="text-muted">{post.date}</small></p>
                </div>
                </div>
                </div>
            </div>

            ))}
            <style jsx>{`
            .right{
                margin-left:5em !important;
                background:#2B1738 !important;
                
                
            }
            .left{
                margin-right:5em !important;
                background:#1F1738 !important;
            }
            .ortala {
                margin-left: 10%;
                margin-right:10%;
                
            }
            `}</style>
            </div>
        )
    }
}



export default PostsList;
