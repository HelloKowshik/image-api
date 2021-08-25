import { useEffect, useState } from 'react';

const useScroll = () => {
  const [scrollPosition, setScrollPosition] = useState(null);

  const handleScroll = () => setScrollPosition(window.scrollY);

  useEffect(() => {
    document.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return scrollPosition;
};

export default useScroll;
