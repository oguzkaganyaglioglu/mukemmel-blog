import React, { Component } from "react";
import { Trash2, Slash, Award, Crosshair, Heart } from "react-feather";

export class MembersList extends Component {
  render() {
    const { members } = this.props;

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
                        <Heart className="operationIcons" size="18px" />
                      ) : (
                        ""
                      )}
                      {member.banned ? (
                        ""
                      ) : (
                        <Slash className="operationIcons" size="18px" />
                      )}
                      {member.deleted ? (
                        ""
                      ) : (
                        <Trash2 className="operationIcons" size="18px" />
                      )}
                      {member.deleted ? (
                        <Crosshair className="operationIcons" size="18px" />
                      ) : (
                        ""
                      )}
                      {member.banned || member.deleted ? (
                        ""
                      ) : (
                        <Award className="operationIcons" size="18px" />
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
