import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const BotaoWhatsApp = () => {
  const whatsappNumber = "+4917651589468";
  const whatsappMessage = encodeURIComponent("Oi! Gostaria de mais informações sobre a Beabstracto!");

  return (
    <div className="fixed z-50 bottom-8 right-16">
      <a href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
         className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-green-500 hover:bg-green-700 text-white transition duration-300 ease-in-out transform hover:scale-110"
         target="_blank"
         rel="noopener noreferrer"
         title="Fale conosco no WhatsApp">
        <FontAwesomeIcon icon={faWhatsapp} size="2xl" className="text-white" />
      </a>
    </div>
  );
};

export default BotaoWhatsApp;
