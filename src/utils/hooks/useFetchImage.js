import axios from 'axios';
import { useEffect, useState } from 'react';

const API = process.env.REACT_APP_UNSPLASH_API;
const SECRET = process.env.REACT_APP_ACCESS_KEY;

const useFetchImage = (page, searchText) => {
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = () => {
    const url =
      searchText === null ? 'photos?' : `search/photos?query=${searchText}&`;
    axios
      .get(`${API}/${url}client_id=${SECRET}&page=${page}`)
      .then((response) => {
        setErrors([]);
        searchText === null ? fetchRandom(response) : fetchSearch(response);
        setIsLoading(false);
      })
      .catch((e) => {
        setErrors('Error Occured!');
        setIsLoading(false);
      });
  };

  const fetchSearch = (response) =>
    page > 1
      ? setImages([...response.data.results, ...images])
      : setImages([...response.data.results]);

  const fetchRandom = (response) => setImages([...images, ...response.data]);

  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, [page, searchText]);

  return [images, setImages, errors, isLoading];
};

export default useFetchImage;
