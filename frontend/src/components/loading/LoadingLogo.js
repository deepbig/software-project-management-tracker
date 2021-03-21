import React, { useEffect, useState } from 'react';
import './LoadingLogo.css';


const LoadingLogo = () => {
  const [start, setStart] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStart(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    start === true ?
    <div className="fullScreen">
      <div className="dimScreen">
        <img src="/Logo.png" alt="Logo" className="center" />
      </div>
     </div>
      : null
  )
};

export default LoadingLogo;