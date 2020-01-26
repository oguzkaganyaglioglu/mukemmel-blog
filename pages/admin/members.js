import React, { Component, useState } from "react";
import AdminLayout from "../../Layout/admin";
import Members from "../../components/members";
import * as Http from "../../utils/http.helper";
import AOS from "aos";

export class members extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    AOS.init();
    Http.post("gettoken")
      .then(res => {
        this.setState({
          token: res
        });
      })
      .then(() => {
        Http.post(
          "admin-user-operations/members",
          {},
          { userToken: this.state.token }
        ).then(res => {
          this.setState({
            members: res.members
          });
        });
      });
  }
  render() {
    const { members } = this.state;
    return (
      <div>
        <AdminLayout>
          {members == undefined ? (
            ""
          ) : (
            <Members members={members} SetpPP={10} />
          )}
        </AdminLayout>
      </div>
    );
  }
}

export default members;
