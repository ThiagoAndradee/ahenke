'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { SimpleLayout } from '@/components/SimpleLayout';
import { Container } from '@/components/Container';

export default function ThankYouPage({ params }) {
  const [hasReviewed, setHasReviewed] = useState(false); // Estado para controlar se o link foi clicado
  const { name } = params; // Nome do cliente
  const searchParams = useSearchParams();
  const pixiesetLink = searchParams.get('link'); // Link Pixieset
  const pin = searchParams.get('pin'); // PIN

  const handleReviewClick = () => {
    setHasReviewed(true); // Marca o link como clicado
  };

  return (
    <>
      <Container className="mt-16 sm:mt-32">
        <SimpleLayout
          title={`Thanks a lot for our session, ${decodeURIComponent(name)}!`}
          intro="I hope you had as much fun as I did! For accessing and downloading your photos I'd like to kindly ask you to:"
        />
        <Container className="pt-8">
          <ol className="font-semibold text-lg">
            <li>
              1. Share how was your experience {'('}and maybe some love{' '}of our session{')'}{' '}
              <a
                className="underline text-purple-600 hover:text-purple-800 transition-colors duration-200"
                href="https://www.tripadvisor.com/UserReviewEdit-g187309-d26836698-Christmas_in_Munich_Give_The_Gift_of_a_Photo_Shoot-Munich_Upper_Bavaria_Bavaria.html"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleReviewClick} // Marca como revisado
              >
                here
              </a>{' '}
              💚🤗
            </li>

            <li
              className={`mt-4 ${
                hasReviewed ? 'text-black' : 'text-gray-400'
              }`}
            >
              2. Download your photos and enjoooy! {'( your PIN is: '} 
              <span
                className={`font-semibold ${
                  hasReviewed ? 'text-[#6F886C]' : 'text-gray-400'
                }`}
              >
                {pin}
              </span>{')'}✨👇🏼
            </li>
          </ol>
        </Container>
        <div
          className={`relative w-full h-[1000px] px-8 ring-4 rounded-3xl mt-12 ring-[#6F886C] ${
            hasReviewed ? 'opacity-100' : 'opacity-50 pointer-events-none'
          }`}
        >
          <iframe
            src={decodeURIComponent(pixiesetLink)}
            className="absolute inset-0 w-full h-full rounded-3xl"
            frameBorder="0"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </Container>
    </>
  );
}
