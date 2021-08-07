import React from 'react';

import './post-status-filter.css'

const PostStatusFilter = () => {
    return (
        <div className="btn-group">
            <button type="button" className='btn btn-info'>Show all</button>
            <button type="button" className='btn btn-outline-secondary'>Show liked</button>
        </div>
    )
}

export default PostStatusFilter;