'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import clsx from 'clsx';

export default function LightboxGallery({ photos }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const openModal = (index) => {
    setCurrentImage(index);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const nextImage = () => {
    setCurrentImage((currentImage + 1) % photos.length);
  };

  const prevImage = () => {
    setCurrentImage((currentImage - 1 + photos.length) % photos.length);
  };

  // Adiciona navegação por teclado
  useEffect(() => {
    if (isOpen) {
      const handleKeyDown = (event) => {
        if (event.key === 'ArrowRight') {
          nextImage();
        } else if (event.key === 'ArrowLeft') {
          prevImage();
        } else if (event.key === 'Escape') {
          closeModal();
        }
      };

      window.addEventListener('keydown', handleKeyDown);

      // Remove o listener ao fechar o modal
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, currentImage]); // Atualiza sempre que o modal é aberto ou a imagem atual muda

  // Rotations para as imagens tortinhas
  let rotations = ['rotate-2', '-rotate-2', 'rotate-1', '-rotate-1', 'rotate-3', '-rotate-3'];

  return (
    <>
      {/* Seção de fotos tortinhas */}
      <div className="flex flex-wrap justify-center gap-5 py-4 sm:gap-8">
        {photos.map((image, imageIndex) => (
          <div
            key={imageIndex}
            className={clsx(
              'relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 sm:w-72 sm:rounded-2xl dark:bg-zinc-800',
              rotations[imageIndex % rotations.length] // Aplica a rotação de forma alternada
            )}
            onClick={() => openModal(imageIndex)}  // Abre a lightbox ao clicar na imagem
          >
            <Image
              src={image}
              alt={`Photography portfolio image ${imageIndex + 1}`}
              sizes="(min-width: 640px) 18rem, 11rem"
              className="absolute inset-0 h-full w-full object-cover cursor-pointer"
              loading="lazy"
              quality={60}  // Comprime a imagem para melhor desempenho
            />
          </div>
        ))}
      </div>

      {/* Modal para lightbox em tela cheia */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <button
            className="absolute top-5 right-5 text-white text-2xl"
            onClick={closeModal}
          >
            &times;
          </button>
          <button
            className="absolute left-5 text-white text-2xl"
            onClick={prevImage}
          >
            &#10094;
          </button>
          <div className="flex justify-center items-center">
            <div
              className={clsx(
                'relative aspect-[9/10] w-80 flex-none overflow-hidden rounded-xl bg-zinc-100 sm:w-[50rem] sm:rounded-2xl dark:bg-zinc-800',
                rotations[currentImage % rotations.length] // Mantém as imagens tortinhas no lightbox também
              )}
            >
              <Image
                src={photos[currentImage]}
                alt={`Photography image ${currentImage + 1}`}
                layout="fill"
                objectFit="contain"
                loading="lazy"
                quality={60}  // Mantém compressão no modal
              />
            </div>
          </div>
          <button
            className="absolute right-5 text-white text-2xl"
            onClick={nextImage}
          >
            &#10095;
          </button>
        </div>
      )}
    </>
  );
}
