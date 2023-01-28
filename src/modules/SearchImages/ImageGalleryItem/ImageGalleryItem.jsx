import styles from './image-gallery-item.module.scss';

const ImageGalleryItem = ({ items }) => {
  return items.map(({ id, title }) => (
    <li className={styles.galleryItem}>
      <img src="" alt="" />
    </li>
  ));
};

export default ImageGalleryItem;

ImageGalleryItem.defaultProps = {
  items: [],
};
