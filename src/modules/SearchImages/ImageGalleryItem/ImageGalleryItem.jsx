import styles from './image-gallery-item.module.scss';

const ImageGalleryItem = ({ items, showImageModal }) => {
  return items.map(({ id, webformatURL, largeImageURL, tags }) => (
    <li
      onClick={() => showImageModal({ largeImageURL, tags })}
      key={id}
      className={styles.ImageGalleryItem}
    >
      <img
        src={webformatURL}
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
