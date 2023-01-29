import styles from './button.module.scss';

const Button = ({ children, loadMore }) => {
  return (
    <button onClick={loadMore} className={styles.Button}>
      {children}
    </button>
  );
};

export default Button;
