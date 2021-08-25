import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import SingleImage from './SingleImage';
import useFetchImage from '../../utils/hooks/useFetchImage';
import Loading from './Loading';
import useDebounce from '../../utils/hooks/useDebounce';
import { AnimateSharedLayout, AnimatePresence, motion } from 'framer-motion';

const MultiImage = () => {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
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
        <AnimateSharedLayout>
          <InfiniteScroll
            dataLength={images.length}
            next={() => setPage(page + 1)}
            hasMore={true}
            className='flex flex-wrap'
          >
            {images.map((image, i) => (
              <motion.div
                key={i}
                className='w-1/4 p-1 border flex justify-center'
                layoutId={image.urls.regular}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <SingleImage
                  show={() => setShowPreview(image.urls.regular)}
                  i={i}
                  handleRemove={handleRemove}
                  image={image.urls.regular}
                />
              </motion.div>
            ))}
          </InfiniteScroll>
          <AnimatePresence>
            {showPreview && (
              <motion.section
                layoutId={showPreview}
                exit={{ opacity: 0 }}
                onClick={() => setShowPreview(false)}
                className='fixed w-full h-full flex justify-center items-center top-0 left-0 z-40'
              >
                <div className='text-white'>
                  <img
                    src={showPreview}
                    alt={showPreview}
                    className='border rounded'
                    width='600'
                    height='m-auto'
                  />
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </AnimateSharedLayout>
      </div>
      {isLoading && <Loading />}
    </section>
  );
};

export default MultiImage;
