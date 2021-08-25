import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import SingleImage from './SingleImage';
import useFetchImage from '../utils/hooks/useFetchImage';
import Loading from './Loading';
import useDebounce from '../utils/hooks/useDebounce';

const MultiImage = () => {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState(null);
  const debounce = useDebounce();
  const [images, setImages, errors, isLoading] = useFetchImage(
    page,
    searchText
  );

  const handleInput = (e) => {
    const text = e.target.value;
    debounce(() => setSearchText(text));
  };

  const handleRemove = (index) => {
    const newArr = images.filter((im, i) => i !== index);
    setImages(newArr);
  };

  return (
    <section>
      <div className='my-5'>
        <input
          type='text'
          onChange={handleInput}
          className='w-full border rounded shadow p-2'
          placeholder='search image'
        />
      </div>
      {errors.length > 0 && (
        <div className='flex h-screen'>
          <p className='m-auto'>{errors}</p>
        </div>
      )}
      <div>
        <InfiniteScroll
          dataLength={images.length}
          next={() => setPage(page + 1)}
          hasMore={true}
          className='flex flex-wrap'
        >
          {images.map((image, i) => (
            <SingleImage
              key={i}
              i={i}
              handleRemove={handleRemove}
              image={image.urls.regular}
            />
          ))}
        </InfiniteScroll>
      </div>
      {isLoading && <Loading />}
    </section>
  );
};

export default MultiImage;
