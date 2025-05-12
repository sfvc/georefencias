import { forwardRef, useEffect } from 'react';

const Modal = forwardRef(({ isOpen, onClose, children, clase }, ref) => {
  useEffect(() => {
    if (isOpen) {
      console.log('Modal abierto');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={clase} onClick={onClose} ref={ref}>
      {children}
    </div>
  );
});

export default Modal;