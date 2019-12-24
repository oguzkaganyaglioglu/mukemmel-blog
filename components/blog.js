import React, { useState } from 'react'
import PostsList from './postslist';
import Pagination from './pagination';
import PropTypes from 'prop-types';

const Blog = ({ veri, SetpPP }) => {
    Blog.defaultProps = {
        SetpPP: '5'
      };


    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(SetpPP);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = veri.slice(indexOfFirstPost, indexOfLastPost);
    
    function ShowHide(){
        if (postsPerPage<veri.length) {
            return( <Pagination
            postsPerPage={postsPerPage}
            totalPosts={veri.length}
            paginate={paginate}
            currentPage={currentPage}
          />)
        }
    }

    const paginate = pageNumber => setCurrentPage(pageNumber);

    
    return (
        <div>
            <PostsList veri={currentPosts} />
            {ShowHide()}

        </div>
    )
}

Blog.PropTypes = {
    veri:PropTypes.array,
    SetpPP:PropTypes.number
};

export default Blog
