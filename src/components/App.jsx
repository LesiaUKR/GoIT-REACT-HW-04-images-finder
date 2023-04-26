import React, { useState, useEffect } from 'react';
import { Searchbar } from '../components/Searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';
import { ImageGallery } from '../components/ImageGallery/ImageGallery';
import { GlobalStyle } from 'components/Globalstyle.js';
import { Layout } from './Layout.js';
import { fetchImages } from './serviceAPI/ImagesAPI';
import { Loader } from 'components/Loader/Loader';
import { LoadMoreBtn } from 'components/LoadMoreBtn/LoadMoreBtn';
// import { toast } from 'react-toastify';

export const App = () => {
  const [searchText, setSearchText] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  // const [loadMore, setLoadMore] = useState(false);

  useEffect(() => {
    if (!searchText) {
      return 
    }

    setLoading(true);
    setError(null);

    fetchImages(searchText, page)
      .then((responseImages) => {
        setImages(prevImages => [...prevImages, ...responseImages.hits]);
      })
      .catch(error => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [searchText, page]);

  const onChangeQuery = searchText => {
    setSearchText(searchText);
    setPage(1);
    setImages([]);
    setError(null);
    console.log(searchText);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
    };

  return (
    <Layout>
      <GlobalStyle />
      {error && <h2>{error.message}</h2>}
      <ToastContainer autoClose={3000} />
      <Searchbar onSubmit={onChangeQuery} />
      <ImageGallery images={images} />
      {loading && <Loader />}
      {images.length > 0 && <LoadMoreBtn onClick={handleLoadMore} />}
    </Layout>
  );
};
