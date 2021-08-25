import { useState } from 'react';

const useDebounce = () => {
  const [typingTime, setTypingTime] = useState('');

  const debounce = (setFunc, waitTime = 1000) => {
    clearTimeout(typingTime);
    const timeOut = setTimeout(() => setFunc(), waitTime);
    setTypingTime(timeOut);
  };
  return debounce;
};

export default useDebounce;
