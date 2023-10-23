import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import '../assets/styles/index.css'

const WhatsAppButton = () => {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/1234567890', '_blank');
  };

  return (
    <div className="whatsapp-button" onClick={handleWhatsAppClick}>
      <FaWhatsapp className='fs-3 text-white'/>
    </div>
  );
};

export default WhatsAppButton;