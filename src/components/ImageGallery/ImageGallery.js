import PropTypes from 'prop-types';

import css from './ImageGallery.module.css';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images, onClick }) => {
  return (
    <ul className={css.gallery} onClick={onClick}>
      {images.map((image, index) => {
        return (
          <ImageGalleryItem
            key={index}
            webformatURL={image.webformatURL}
            tags={image.tags}
          />
        );
      })}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      tags: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
    })
  ).isRequired,
  onClick: PropTypes.func.isRequired,
};
