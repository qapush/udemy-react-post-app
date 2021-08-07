import React from 'react';

import './post-add-form.css'

const PostAddForm = ({onAdd}) => {
    return (
        <div className="bottom-panel d-flex">
            <input
                type="text"
                placeholder="What are thinking about?" 
                className="form-control new-post-label"
            />
            <button
                type="submit"
                className="btn btn-outline-secondary"
                onClick={ () => onAdd('New enter') }
                >
                New enter
                </button>
        </div>
    )
}

export default PostAddForm;