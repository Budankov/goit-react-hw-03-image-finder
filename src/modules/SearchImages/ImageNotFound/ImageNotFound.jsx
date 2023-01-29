import styles from './image-not-found.module.scss';

const ImageNotFound = () => {
  return (
    <div className={styles.ImageNotFound}>
      <img
        src="https://fisnikde.com/wp-content/uploads/2019/01/broken-image.png"
        alt=""
      />
    </div>
  );
};

export default ImageNotFound;
