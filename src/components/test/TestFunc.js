import React from 'react';
import MultiImage from './MultiImage';

const TestFunc = () => {
  return (
    <section className='flex justify-center'>
      <div className='w-10/12'>
        <div className='my-4'>
          <div className='text-center my-2'>
            <div className='bg-gray-600 text-white p-5 border'>
              <h1 className='text-5xl'>React Learning</h1>
            </div>
          </div>
          {<MultiImage />}
        </div>
      </div>
    </section>
  );
};

export default TestFunc;
