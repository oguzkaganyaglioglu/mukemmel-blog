import Swal from "sweetalert2";
import React, { Component } from "react";
import "../style/main.scss"

export class ResetPass extends Component {
  componentDidMount() {

    if (this.props.events.token != undefined) {
      Swal.fire({
        title: "Şifre Sıfırlama",
        allowOutsideClick:false,
        html:
          '<input id="password" class="swal2-input" placeholder="şifre">' +
          '<input id="repassword" class="swal2-input" placeholder="şifre (yeniden)">',
        focusConfirm: false,
        showLoaderOnConfirm:true,
        preConfirm: () => {
          if (document.getElementById("password").value == document.getElementById("repassword").value) {
            return [
              document.getElementById("password").value,
              document.getElementById("repassword").value
            ];
          }
          
        }
      }).then(result=>{
        if (result.value != true) {
          Swal.fire("Şifreler eşleşti")
        }
      })
    } else {
        window.location.assign("/")
    }
  }
  render() {
    return <div></div>;
  }
}
ResetPass.getInitialProps = async ({ req, query }) => {
    // TODO: aşağıdaki satırda bulunan adresi kendi sunucu adresinle değiştirmelisin
    //const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'
    return {
      events: {
        token: query.token
      }
    };
  };
export default ResetPass;
