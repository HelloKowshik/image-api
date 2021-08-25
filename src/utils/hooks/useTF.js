import { useState } from 'react';
import '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';

const useTF = () => {
  const [isLoading, setLoading] = useState(false);
  const [predictions, setPredictions] = useState([]);

  const predict = (img) => {
    setLoading(true);
    mobilenet.load().then((model) => {
      model.classify(img).then((predictions) => {
        setPredictions(predictions);
        setLoading(false);
      });
    });
  };
  return [predict, predictions, setPredictions, isLoading];
};

export default useTF;
