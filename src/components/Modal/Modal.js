import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { Component } from 'react';

import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onEscKeyPress);
  }

  componentWillUnmount = () => {
    window.removeEventListener('keydown', this.onEscKeyPress);
  };

  onEscKeyPress = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };
  onBackdropClose = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className={css.overlay} onClick={this.onBackdropClose}>
        <div className={css.modal}>{this.props.children}</div>
      </div>,
      modalRoot
    );
  }
}
export default Modal;

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};
