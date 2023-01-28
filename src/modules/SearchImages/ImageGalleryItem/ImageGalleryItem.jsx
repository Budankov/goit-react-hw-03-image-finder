import styles from './image-gallery-item.module.scss';

const ImageGalleryItem = ({ items }) => {
  return items.map(({ id, webformatURL, largeImageURL, tags }) => (
    <li key={id} className={styles.ImageGalleryItem}>
      <img
        src={largeImageURL}
        alt={tags}
        className={styles.ImageGalleryItemImage}
      />
    </li>
  ));
};

export default ImageGalleryItem;

ImageGalleryItem.defaultProps = {
  items: [],
};
