import React from 'react';

import './LoadingBox.scss';

const LoadingBox = () => {
  return (
    <div className="loading">
      <i className="fa fa-spinner fa-spin"></i> Loading ...
    </div>
  );
};

export default LoadingBox;
