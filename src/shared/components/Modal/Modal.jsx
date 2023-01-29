import { Component } from 'react';
import { createPortal } from 'react-dom';

import PropTypes from 'prop-types';

import styles from './modal.module.scss';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.close);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.close);
  }

  close = ({ target, currentTarget, code }) => {
    if (target === currentTarget || code === 'Escape') {
      this.props.closeModal();
    }
  };

  render() {
    const { children } = this.props;
    const { close } = this;

    return createPortal(
      <div className={styles.Overlay} onClick={close}>
        <div className={styles.Modal}>{children}</div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
