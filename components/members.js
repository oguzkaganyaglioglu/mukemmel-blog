import React, { Component, useState } from "react";
import * as Http from "../utils/http.helper";
import Pagination from "../components/pagination";
import "../style/admin.scss";
import MembersList from "./memberslist";
import PropTypes from "prop-types";

const Members = ({ members, SetpPP, token }) => {
  Members.defaultProps = {
    SetpPP: "5",
    token: "thereisnotoken"
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [membersPerPage] = useState(SetpPP);

  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;

  const filteredveri = members;


  //TODO: search eklenince alttaki yorumları kaldır

  //   const filteredveri = members.filter(member => {
  //     return (
  //       member.tag.toLowerCase().indexOf(search.toLowerCase()) >= 0 ||
  //       member.date.toLowerCase().indexOf(search.toLowerCase()) >= 0 ||
  //       member.details.toLowerCase().indexOf(search.toLowerCase()) >= 0 ||
  //       member.title.toLowerCase().indexOf(search.toLowerCase()) >= 0
  //     );
  //   });

  const currentMembers = filteredveri.slice(
    indexOfFirstMember,
    indexOfLastMember
  );

  function ShowHide() {
    if (membersPerPage < filteredveri.length) {
      return (
        <Pagination
          postsPerPage={membersPerPage}
          totalPosts={members.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      );
    }
  }

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div>
      <MembersList members={currentMembers} token={token} />
      <div data-aos="zoom-out" data-aos-offset="0">
        {ShowHide()}
      </div>
    </div>
  );
};

Members.propTypes = {
  members: PropTypes.array,
  SetpPP: PropTypes.number
};

export default Members;
