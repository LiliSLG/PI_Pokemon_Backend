import React from 'react';
import style from './NotFound404Page.module.css'; 

const NotFound = () => {
  return (
    <div className={style.container}>
      <h1>404</h1>
      <p>Page Not Found</p>
    </div>
  );
};

export default NotFound;