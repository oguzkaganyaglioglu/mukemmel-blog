import React from "react";

function AddClass(currentPage, number) {
  if (currentPage == number) {
    return "page-item active";
  } else {
    return "page-item";
  }
}

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination justify-content-center">
        {pageNumbers.map(number => (
          <li key={number} className={AddClass(currentPage, number)}>
            <a onClick={() => paginate(number)} href="#" className="page-link ">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
