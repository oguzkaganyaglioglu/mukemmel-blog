import React, { Component } from "react";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: toast => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  }
});

const EVENTS = {
  unauthorized: {
    icon: "error",
    title: "Ulaşmaya çalıştığınız sayfaya yetkiniz bulunmamaktadır."
  },
  refresh: {
    icon: "warning",
    text: 'Bu sorun üzerinde çalışıyoruz',
    title: "Sayfa tam yüklenmez ise lütfen sayfayı yenileyiniz"
  },
  unknown: {
    icon: "error",
    title: "Beklenmeyen bir hata oluştu :("
  },
  invalid_reset_link: {
    icon: "error",
    title: "Bu link daha önceden kullanılmış lütfen yeni bir şifre sıfırlama işlemi başlatın"
  }
};

export class Notifications extends Component {
  componentDidMount() {
    const { events } = this.props;
    Object.keys(events).forEach(event => {
      if (events[event] === "true" && EVENTS[event]) {
        Toast.fire(EVENTS[event]);
      }
    });
  }
  render() {
    return <div></div>;
  }
}

export default Notifications;
