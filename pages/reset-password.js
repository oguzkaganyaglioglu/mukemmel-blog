import Swal from "sweetalert2";
import React, { Component } from "react";
import * as Http from "../utils/http.helper";
import "../style/main.scss";

export class ResetPass extends Component {
  resetPass = () => {
    if (this.props.events.token != undefined) {
      Swal.fire({
        title: "Şifre Sıfırlama",
        allowOutsideClick: false,
        html:
          '<input id="password" class="swal2-input" placeholder="şifre">' +
          '<input id="repassword" class="swal2-input" placeholder="şifre (yeniden)">',
        focusConfirm: false,
        showLoaderOnConfirm: true,
        confirmButtonText: "Tamam",
        preConfirm: () => {
          if (
            document.getElementById("password").value ==
            document.getElementById("repassword").value
          ) {
            return [
              document.getElementById("password").value,
              document.getElementById("repassword").value
            ];
          }
        }
      }).then(result => {
        if (result.value != true) {
          if (result.value[0].length < 6) {
            Swal.fire({
              icon: "error",
              title: "Eksik şifre girdiniz",
              allowOutsideClick: false,
              text: "Şifreniz en az 6 karakter uzunlukta olmak zorundadır",
              confirmButtonText: "Tamam"
            }).then(res => {
              this.resetPass();
            });
          } else {
            Swal.fire({
              icon: "info",
              title: `Şifreniz " ${result.value[0]} " olarak değiştirilecek onaylıyor musunuz?`,
              allowOutsideClick: false,
              focusConfirm: false,
              showLoaderOnConfirm: true,
              showCancelButton: true,
              confirmButtonText: "Onaylıyorum",
              cancelButtonText: "Onaylamıyorum",
              cancelButtonColor: "red",
              preConfirm: () => {
                return Http.post("auth/reset-pass", {
                  userToken: this.props.events.token,
                  newPass: result.value[0]
                });
              }
            }).then(result => {
              if (result.value === undefined) {
                this.resetPass();
              } else {
                if (result.value.status === true) {
                  Swal.fire({
                    icon: "success",
                    title: `Şifreniz Başarıyla Değiştirildi`,
                    text: "Giriş Sayfasına yönlendiriliyorsunuz",
                    allowOutsideClick: false,
                    timerProgressBar: true,
                    showConfirmButton:false,
                    timer: 3000
                  }).then(() => {window.location.assign("/log-reg")});
                } else {
                  switch (result.message) {
                    case "invalid link":
                      Swal.fire({
                        icon: "error",
                        title: `Kullanmış olduğunuz link artık geçersiz`,
                        text: "Lütfen yeniden şifremi unuttum işlemi başlatın",
                        allowOutsideClick: false,
                        timerProgressBar: true,
                        showConfirmButton:false,
                        timer: 3000
                      }).then(() => {window.location.assign("/log-reg")});
                      break;
                  
                    default:
                      Swal.fire({
                        icon: "error",
                        title: `Bir şeyler yanlış gitti :(`,
                        text: "Lütfen daha sonra yeniden deneyiniz",
                        allowOutsideClick: false,
                        timerProgressBar: true,
                        showConfirmButton:false,
                        timer: 3000
                      }).then(() => {window.location.assign("/")});
                      break;
                  }
                }
              }
            });
          }
        }
      });
    } else {
      window.location.assign("/");
    }
  };

  componentDidMount() {
    this.resetPass();
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
