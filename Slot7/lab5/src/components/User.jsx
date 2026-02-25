import React from 'react';

const User = ({ user }) => {
    return (
        <div className="border rounded p-3 mb-3 bg-white shadow-sm">
            <h5 className="mb-1 font-weight-bold">{user.name}</h5>
            <p className="text-secondary mb-0" style={{ fontSize: '0.9rem' }}>
                {user.email}
            </p>
        </div>
    );
};

export default User;
