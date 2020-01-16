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
  unexpected: {
    icon: "error",
    title: "Beklenmeyen bir hata oluştu :("
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
    return <div>{this.props.children}</div>;
  }
}

export default Notifications;
