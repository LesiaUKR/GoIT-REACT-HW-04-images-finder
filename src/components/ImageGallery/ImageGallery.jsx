import PropTypes from 'prop-types';
import React from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageList} from './ImageGallery.styled';

export function ImageGallery({ images, error }) {
  return (
    <ImageList>
      {images.map(({ id, tags, webformatURL, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          tag={tags}
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
        />
      ))}
    </ImageList>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      tags: PropTypes.string,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ).isRequired,
};