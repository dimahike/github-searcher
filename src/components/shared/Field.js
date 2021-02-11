import React from 'react';

import './Field.scss';

const Field = ({ value, onChangeHandle, placeholder }) => {
  return (
    <div className="field">
      <input
        type="text"
        // id="name"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChangeHandle(e.target.value)}
      />
      <div className="line"></div>
    </div>
  );
};

export default Field;
