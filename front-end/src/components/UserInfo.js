import React from 'react';
import CuteCupcakeIcon from './CuteCupcakeIcon';

const UserInfo = ({ username }) => (
  <div className="user-info">
    <span className="username">{username}</span>
    <div className="cupcake-icon-wrapper">
      <CuteCupcakeIcon size={32} />
    </div>
  </div>
);

export default UserInfo;