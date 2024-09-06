"use client"

import { useState, useEffect } from 'react';
import LightboxGallery from '@/components/LightboxGallery'; 

function Photos() {
  const [photos, setPhotos] = useState([]);
  const apiBaseUrl = typeof window !== "undefined" && window.location.origin 
    ? window.location.origin 
    : 'http://localhost:3002'; // Usar o mesmo fallback do admin

  useEffect(() => {
    fetch(`${apiBaseUrl}/api/images`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch images');
        }
        return res.json();
      })
      .then(data => setPhotos(data))
      .catch(error => {
        console.error('Error fetching images:', error);
      });
  }, [apiBaseUrl]);

  return (
    <div className="mt-16 sm:mt-20" id="portfolio">
      <LightboxGallery photos={photos.map(photo => photo.url)} /> {/* Passar apenas URLs das fotos */}
    </div>
  );
}

export default Photos;
