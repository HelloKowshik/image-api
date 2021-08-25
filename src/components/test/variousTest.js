import React, { useEffect, useRef, useState } from 'react';
import MultiImage from './MultiImage';

const TestFunc = () => {
  const [title, setTitle] = useState('React Learning');
  const [isShowing, setIsShowing] = useState(false);
  const mountRef = useRef(null);
  const handleClick = () => setIsShowing(!isShowing);

  useEffect(() => {
    console.log('TestFunc Mounted-1');
    setTitle('Changed By useEffect Hook');
  }, []);

  useEffect(() => {
    if (mountRef.current) {
      console.log('TestFunc Updated');
    } else {
      mountRef.current = true;
    }
  }, [isShowing]);

  return (
    <section className='flex justify-center'>
      {console.log('Re-Rendered')}
      <div className='w-10/12'>
        <div className='my-4'>
          <div className='text-center'>
            <div className='bg-gray-600 text-white p-5 border'>
              <h1 className='text-5xl'>{title}</h1>
            </div>
          </div>
          {isShowing && <MultiImage />}
        </div>
      </div>
    </section>
  );
};

export default TestFunc;
