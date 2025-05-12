import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import Modal from './modals/modal';
import HeaderMobileNav from './modals/mobileNav';

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalContentRef = useRef(null); // Single reference for modal animation

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    // Animate modal out before setting state
    if (modalContentRef.current) {
      gsap.to(modalContentRef.current, {
        y: '100%',
        opacity: 0,
        duration: 0.3,
        ease: 'power2.inOut',
        onComplete: () => {
          setIsModalOpen(false);
        },
      });
    } else {
      setIsModalOpen(false);
    }
  };

  const animateModalIn = () => {
    if (modalContentRef.current) {
      gsap.set(modalContentRef.current, { y: '100%', opacity: 0 });
      gsap.to(modalContentRef.current, {
        y: '0%',
        opacity: 1,
        duration: 0.3,
        ease: 'power2.inOut',
      });
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      animateModalIn();
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }

    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isModalOpen]);

  const listaItems = [{ logo: '/img/mapa.svg' }];

  return (
    <>
      <header className="header-coyuntura">
        <nav className="header-coyuntura__nav">
          <img src="/img/logo-sfvc.svg" alt="Logo" width={100} />
          <img className='header-coyuntura__nav-img-deskopt' src="/img/logo-sfvc.svg" alt="Logo" width={100} />
          {listaItems.map((item, index) => (
            <button className='header-coyuntura__nav-img-mobile' onClick={openModal} key={index}>
              <img src={item.logo} alt="Map logo" width={24} />
            </button>
          ))}
        </nav>
      </header>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal} clase="modal">
          <div className="modalHeaderMobile" ref={modalContentRef}>
            <button className="modal__cerrarbarra" onClick={closeModal}>
              <span className="modal__cerrarbarra-icon" alt="Close icon" />
            </button>
            <HeaderMobileNav />
          </div>
        </Modal>
      )}
    </>
  );
};

export default Header;
