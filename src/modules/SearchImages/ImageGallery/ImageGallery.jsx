import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

import styles from './image-gallery.module.scss';

const ImageGallery = () => {
  return <ul class="gallery"></ul>;
};

export default ImageGallery;

ImageGallery.defaultProps = {
  items: [],
};
