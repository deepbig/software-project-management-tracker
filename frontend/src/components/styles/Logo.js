import React from 'react';
import Logos from './logos.png';

const Logo = (props) => {
  return (
    <img
      alt="Logo"
      src={Logos}
      width="210" height="35"
      {...props}
    />
  );
};

export default Logo;
