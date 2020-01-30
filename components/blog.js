import React, { useState } from "react";
import PostsList from "./postslist";
import Pagination from "./pagination";
import PropTypes from "prop-types";
import Button from "reactstrap/lib/Button";
import "../style/showmorebutton.scss";
import AOS from "aos";

const Blog = ({ veri, SetpPP, search, Paginate, showMore, isAdmin, token }) => {
  Blog.defaultProps = {
    SetpPP: "5",
    isAdmin: false,
    token: "thereisnotoken"
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(SetpPP);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const filteredveri = veri.filter(post => {
    return (
      post.tag.toLowerCase().indexOf(search.toLowerCase()) >= 0 ||
      post.date.toLowerCase().indexOf(search.toLowerCase()) >= 0 ||
      post.details.toLowerCase().indexOf(search.toLowerCase()) >= 0 ||
      post.title.toLowerCase().indexOf(search.toLowerCase()) >= 0
    );
  });

  const currentPosts = filteredveri.slice(indexOfFirstPost, indexOfLastPost);

  function ShowHide() {
    if (postsPerPage < filteredveri.length && Paginate != "OFF") {
      return (
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={veri.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      );
    } else if (showMore == "ON" && Paginate == "OFF") {
      // console.log("ShowMore");
      return (
        <div>
          <a href="/blog">
            <div className="show-more-button">
              <div className="show-more-text">Show More</div>
            </div>
          </a>
        </div>
      );
    }
  }

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div>
      <PostsList search={search} veri={currentPosts} isAdmin={isAdmin} token={token} />
      <div data-aos="zoom-out" data-aos-offset="0">
        {ShowHide()}
      </div>
    </div>
  );
};

Blog.propTypes = {
  veri: PropTypes.array,
  SetpPP: PropTypes.number
};

export default Blog;
