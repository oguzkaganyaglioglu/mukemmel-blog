import React, { Component } from "react";
import { Trash2, Slash, Award, Crosshair, Heart } from "react-feather";
import * as Http from "../utils/http.helper";
import Swal from "sweetalert2";

export class MembersList extends Component {
  render() {
    const { members, token } = this.props;

    const getStatus = (isBanned, isDeleted, isAdmin) => {
      if (isBanned) {
        return "Banlanmış";
      } else if (isDeleted) {
        return "Silinmiş";
      } else if (isAdmin) {
        return "Admin";
      } else {
        return "Normal";
      }
    };

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
    return (
      <div>
        <div className="text-center create-new-post">
          <h3 className="create-new-post-title-text">Üye İşlemleri</h3>
          <hr />
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>İsim</th>
                  <th>Mail</th>
                  <th>Kayıt Tarihi</th>
                  <th>Durum</th>
                  <th>Operations</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member, index) => (
                  <tr key={index}>
                    <td>{member.firstName}</td>
                    <td>{member.email}</td>
                    <td>
                      {member.dateCreated
                        .toString()
                        .split("T")[0]
                        .replace(/-/g, " ")}
                    </td>
                    <td>
                      {getStatus(member.banned, member.deleted, member.admin)}
                    </td>
                    <td>
                      {member.banned || member.deleted ? (
                        <Heart
                          className="operationIcons"
                          size="18px"
                          onClick={() => {
                            Http.post(
                              "admin-user-operations/modify-user",
                              {
                                id: member._id,
                                admin: member.admin,
                                banned: false,
                                deleted: false
                              },
                              { userToken: token }
                            ).then(res => {
                              if (res.status) {
                                Toast.fire({
                                  icon: "success",
                                  title: "İşlem başarıyla gerçekleştirildi",
                                  timer: 1000
                                }).then(() => {
                                  window.location.reload();
                                });
                              } else {
                                Toast.fire({
                                  icon: "error",
                                  title: "Bir hata oluştu",
                                  timer: 1000
                                }).then(() => {
                                  Toast.fire({
                                    icon: "info",
                                    title:
                                      "Sunucudan alınan yanıt konsola yazdırıldı"
                                  });
                                  console.log(res);
                                });
                              }
                            });
                          }}
                        />
                      ) : (
                        ""
                      )}
                      {member.banned ? (
                        ""
                      ) : (
                        <Slash
                          className="operationIcons"
                          size="18px"
                          onClick={() => {
                            Http.post(
                              "admin-user-operations/modify-user",
                              {
                                id: member._id,
                                admin: member.admin,
                                banned: true,
                                deleted: member.deleted
                              },
                              { userToken: token }
                            ).then(res => {
                              if (res.status) {
                                Toast.fire({
                                  icon: "success",
                                  title: "İşlem başarıyla gerçekleştirildi",
                                  timer: 1000
                                }).then(() => {
                                  window.location.reload();
                                });
                              } else {
                                Toast.fire({
                                  icon: "error",
                                  title: "Bir hata oluştu",
                                  timer: 1000
                                }).then(() => {
                                  Toast.fire({
                                    icon: "info",
                                    title:
                                      "Sunucudan alınan yanıt konsola yazdırıldı"
                                  });
                                  console.log(res);
                                });
                              }
                            });
                          }}
                        />
                      )}
                      {member.deleted ? (
                        ""
                      ) : (
                        <Trash2
                          className="operationIcons"
                          size="18px"
                          onClick={() => {
                            Http.post(
                              "admin-user-operations/modify-user",
                              {
                                id: member._id,
                                admin: member.admin,
                                banned: member.banned,
                                deleted: true
                              },
                              { userToken: token }
                            ).then(res => {
                              if (res.status) {
                                Toast.fire({
                                  icon: "success",
                                  title: "İşlem başarıyla gerçekleştirildi",
                                  timer: 1000
                                }).then(() => {
                                  window.location.reload();
                                });
                              } else {
                                Toast.fire({
                                  icon: "error",
                                  title: "Bir hata oluştu",
                                  timer: 1000
                                }).then(() => {
                                  Toast.fire({
                                    icon: "info",
                                    title:
                                      "Sunucudan alınan yanıt konsola yazdırıldı"
                                  });
                                  console.log(res);
                                });
                              }
                            });
                          }}
                        />
                      )}
                      {member.deleted ? (
                        <Crosshair
                          className="operationIcons"
                          size="18px"
                          onClick={() => {
                            Http.post(
                              "admin-user-operations/force-delete-user",
                              {
                                id: member._id
                              },
                              { userToken: token }
                            ).then(res => {
                              if (res.status) {
                                Toast.fire({
                                  icon: "success",
                                  title: "İşlem başarıyla gerçekleştirildi",
                                  timer: 1000
                                }).then(() => {
                                  window.location.reload();
                                });
                              } else {
                                Toast.fire({
                                  icon: "error",
                                  title: "Bir hata oluştu",
                                  timer: 1000
                                }).then(() => {
                                  Toast.fire({
                                    icon: "info",
                                    title:
                                      "Sunucudan alınan yanıt konsola yazdırıldı"
                                  });
                                  console.log(res);
                                });
                              }
                            });
                          }}
                        />
                      ) : (
                        ""
                      )}
                      {member.banned || member.deleted ? (
                        ""
                      ) : (
                        <Award
                          className="operationIcons"
                          size="18px"
                          onClick={() => {
                            Http.post(
                              "admin-user-operations/modify-user",
                              {
                                id: member._id,
                                admin: !member.admin,
                                banned: member.banned,
                                deleted: member.deleted
                              },
                              { userToken: token }
                            ).then(res => {
                              if (res.status) {
                                Toast.fire({
                                  icon: "success",
                                  title: "İşlem başarıyla gerçekleştirildi",
                                  timer: 1000
                                }).then(() => {
                                  window.location.reload();
                                });
                              } else {
                                Toast.fire({
                                  icon: "error",
                                  title: "Bir hata oluştu",
                                  timer: 1000
                                }).then(() => {
                                  Toast.fire({
                                    icon: "info",
                                    title:
                                      "Sunucudan alınan yanıt konsola yazdırıldı"
                                  });
                                  console.log(res);
                                });
                              }
                            });
                          }}
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default MembersList;
