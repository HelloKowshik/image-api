import React, { useRef, useState } from 'react';
import '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';

const TensorFlow = () => {
  const imageRef = useRef();
  const [isLoading, setLoading] = useState(false);
  const [predictions, setPredictions] = useState([]);

  const handlePredict = () => {
    const img = imageRef.current;

    mobilenet.load().then((model) => {
      setLoading(true);
      // Classify the image.
      model.classify(img).then((predictions) => {
        setPredictions(predictions);
        setLoading(false);
      });
    });
  };
  return (
    <div className='flex justify-center'>
      <div className='w-1/3'>
        <h1 className='text-center'>Tensorflow Js</h1>
        <img
          src='https://images.unsplash.com/photo-1511919884226-fd3cad34687c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNTUzNDF8MHwxfHNlYXJjaHw3fHxjYXJ8ZW58MHx8fHwxNjI5ODMzMzA1&ixlib=rb-1.2.1&q=80&w=1080'
          alt='lol'
          width='400'
          crossOrigin='anonymous'
          ref={imageRef}
        />
        <div className='text-center my-3'>
          {predictions.length > 0 &&
            predictions.map((predict, ind) => (
              <div className='flex justify-between' key={ind}>
                <p>{predict.className}</p>
                <p>{Math.floor(predict.probability * 100)}%</p>
              </div>
            ))}
          <button className='p-2 rounded bg-blue-500' onClick={handlePredict}>
            {isLoading && (
              <i className='fas fa-circle-notch fa-spin text-yellow-400'></i>
            )}
            {!isLoading && 'Predict'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TensorFlow;
