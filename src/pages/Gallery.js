import React from 'react';
import MultiImage from '../components/MultiImage';

const Gallery = () => {
  return (
    <section className='flex justify-center'>
      <div className='w-10/12'>
        <div className='my-4'>
          <div className='text-center'>{<MultiImage />}</div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
