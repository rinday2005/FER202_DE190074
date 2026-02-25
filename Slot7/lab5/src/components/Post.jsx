import React from 'react';

const Post = ({ post }) => {
    return (
        <div className="mb-4">
            <h4 className="mb-2" style={{ fontWeight: 'bold', color: '#333' }}>
                {post.title}
            </h4>
            <p className="text-secondary" style={{ lineHeight: '1.6' }}>
                {post.body}
            </p>
        </div>
    );
};

export default Post;
