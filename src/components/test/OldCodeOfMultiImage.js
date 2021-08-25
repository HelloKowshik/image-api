import React, { useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import SingleImage from './SingleImage';
import useScroll from '../../utils/hooks/useScroll';
import useFetchImage from '../../utils/hooks/useFetchImage';
import Loading from './Loading';

const MultiImage = () => {
  const [page, setPage] = useState(1);
  const [images, setImages, errors, isLoading] = useFetchImage(page);
  const [inputImg, setInputImg] = useState('');
  const inputRef = useRef(null);
  // const scrollPosition = useScroll();

  const handleChange = (e) => setInputImg(e.target.value);

  const handleClick = () => {
    if (inputImg !== '') {
      setImages([...images, inputImg]);
      setInputImg('');
    }
  };

  const handleRemove = (index) => {
    const newArr = images.filter((im, i) => i !== index);
    setImages(newArr);
  };

  // useEffect(() => {
  //   if (scrollPosition >= document.body.offsetHeight - window.innerHeight) {
  //     setPage(page + 1);
  //   }
  // }, [scrollPosition]);

  // useEffect(() => {
  //   inputRef.current.focus();
  // }, []);

  // useEffect(() => (totlaImages.current = totlaImages.current + 1));

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section>
      {errors.length > 0 && (
        <div className='flex h-screen'>
          <p className='m-auto'>{errors[0]}</p>
        </div>
      )}
      <div className='flex flex-wrap'>
        <InfiniteScroll dataLength={images.length}>
          {images.map((image, i) => (
            <SingleImage
              i={i}
              handleRemove={handleRemove}
              image={image.urls.regular}
              key={i}
            />
          ))}
        </InfiniteScroll>
      </div>
      <center>
        {errors.length === 0 && (
          <button onClick={() => setPage(page + 1)}>Load More</button>
        )}
      </center>
      <div className='flex justify-between my-2'>
        <input
          type='text'
          className='p-2 border border-gray-800 shadow rounded w-full'
          value={inputImg}
          // ref={inputRef}
          onChange={handleChange}
        />
        <button
          disabled={inputImg === ''}
          className={`p-2 text-white ml-2 ${
            inputImg === '' ? 'bg-green-300' : 'bg-green-600'
          }`}
          onClick={handleClick}
        >
          Add New
        </button>
      </div>
    </section>
  );
};

export default MultiImage;
