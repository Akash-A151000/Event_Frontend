import React from 'react';
import Correct from '../../assets/correct.png';
import Wrong from '../../assets/cancel.png';

const Message = ({ error, type }) => {
  return (
    <div className='absolute left-1/2 transform -translate-x-1/2 flex gap-1 bg-slate-50 p-2 rounded-lg animation-container'>
      <img
        src={type === 'success' ? Correct : Wrong}
        className='w-6 h-6'
        alt=''
      />
      <p>{error}</p>
    </div>
  );
};

export default Message;
