import React, { useState } from "react";
import PostsList from "./postslist";
import Pagination from "./pagination";
import PropTypes from "prop-types";

const Blog = ({ veri, SetpPP, search }) => {
  Blog.defaultProps = {
    SetpPP: "5"
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(SetpPP);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const filteredveri = veri.filter(post => {
    return post.summary.indexOf(search) >= 0;
  });

  const currentPosts = filteredveri.slice(indexOfFirstPost, indexOfLastPost);

  function ShowHide() {
    if (postsPerPage < filteredveri.length) {
      return (
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={veri.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      );
    }
  }

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div>
      <PostsList search={search} veri={currentPosts} />
      //ToDo: üstteki satır silinecek
      {ShowHide()}
    </div>
  );
};

Blog.propTypes = {
  veri: PropTypes.array,
  SetpPP: PropTypes.number
};

export default Blog;
