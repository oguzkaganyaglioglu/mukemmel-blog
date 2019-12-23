import React, { useState } from 'react'
import PostsList from './postslist';
import Pagination from './pagination';

const Blog = ({ veri }) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = veri.slice(indexOfFirstPost, indexOfLastPost);
    
    function ShowHide(){
        if (postsPerPage<veri.length) {
            return( <Pagination
            postsPerPage={postsPerPage}
            totalPosts={veri.length}
            paginate={paginate}
          />)
        }
    }

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div>
            <PostsList veri={currentPosts}/>
            {ShowHide()}

        </div>
    )
}

export default Blog
