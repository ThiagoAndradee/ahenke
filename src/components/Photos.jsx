"use client"

import { useState, useEffect } from 'react';
import LightboxGallery from '@/components/LightboxGallery'; 

function Photos() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const repoUrl = 'https://api.github.com/repos/AhenkeFoto/ahenkefotos/contents/images';

    fetch(repoUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch images from GitHub');
        }
        return res.json();
      })
      .then((data) => {
        const images = data.filter(file => file.type === 'file' && file.download_url);
        setPhotos(images.map(image => image.download_url));
      })
      .catch((error) => {
        console.error('Error fetching images:', error);
      });
  }, []);

  return (
    <div className="mt-16 sm:mt-20" id="portfolio">
      {photos.length > 0 ? (
        <LightboxGallery photos={photos} />  
      ) : (
        <p>Carregando fotos...</p>
      )}
    </div>
  );
}

export default Photos;
