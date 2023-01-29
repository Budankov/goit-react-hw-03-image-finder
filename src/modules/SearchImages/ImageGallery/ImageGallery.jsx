import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

import styles from './image-gallery.module.scss';

const ImageGallery = ({ items, showImageModal }) => {
  return (
    <ul className={styles.ImageGallery}>
      <ImageGalleryItem items={items} showImageModal={showImageModal} />
    </ul>
  );
};

export default ImageGallery;

ImageGallery.defaultProps = {
  items: [],
};
