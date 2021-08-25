import React, { useRef, useState } from 'react';
import useTF from '../utils/hooks/useTF';

const SingleImage = ({ i, handleRemove, image, show }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [predict, predictions, setPredictions, isLoading] = useTF();
  const imageRef = useRef();

  return (
    <div className='w-1/4 p-1 border flex justify-center'>
      <div
        className='relative'
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {(predictions.length > 0 || isLoading) && (
          <span
            className='absolute bg-gray-800 text-white rounded-lg shadow px-2 left-0 ml-5'
            onClick={() => setPredictions([])}
          >
            {isLoading && <p>loading...</p>}
            {predictions.map((predict, index) => (
              <div className='flex justify-between text-sm' key={index}>
                <p>{predict.className}</p>
                <p>{Math.floor(predict.probability * 100)}%</p>
              </div>
            ))}
          </span>
        )}
        <i
          className={`fas fa-times absolute right-0 cursor-pointer opacity-25 hover:opacity-100 ${
            isHovering ? '' : 'hidden'
          }`}
          onClick={() => handleRemove(i)}
        ></i>
        <i
          className={`fas fa-search absolute left-0 cursor-pointer opacity-25 hover:opacity-100 ${
            isHovering ? '' : 'hidden'
          }`}
          onClick={() => predict(imageRef.current)}
        ></i>
        <img
          ref={imageRef}
          crossOrigin='anonymous'
          src={image}
          alt={image}
          width='100%'
          height='auto'
          onClick={show}
        />
      </div>
    </div>
  );
};

export default SingleImage;
