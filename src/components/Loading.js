import React from 'react';

const Loading = () => {
  return (
    <div className='flex h-screen'>
      <div className='m-auto'>
        <i className='fas fa-circle-notch fa-spin text-5xl text-blue-400'></i>
      </div>
    </div>
  );
};

export default Loading;
