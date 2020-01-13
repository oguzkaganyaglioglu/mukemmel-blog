import React, { Component } from 'react'
import Swal from "sweetalert2";
import axios from "axios";
const jwt = require("jsonwebtoken");

export class testpage extends Component {


  
  render() {

    const clicked = () =>{
      const token = localStorage.getItem("userToken");
      const decode = jwt.decode(token);
        
      Swal.fire(decode);
      
    }
    return (
      <div>
        <button onClick={clicked}>Selamm</button>
      </div>
    )
  }
}

export default testpage
