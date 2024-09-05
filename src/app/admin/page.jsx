"use client"

import { useState, useEffect } from 'react';
import { Container } from '@/components/Container';
import { ContainerInner, ContainerOuter } from '@/components/Container';

function AdminPage() {
  const [photos, setPhotos] = useState([]);
  const [files, setFiles] = useState([]);  // Armazena os arquivos selecionados para upload
  const [previewImages, setPreviewImages] = useState([]);  // Previews das imagens selecionadas

  // Construir o URL base para as APIs
  const apiBaseUrl = typeof window !== "undefined" && window.location.origin 
    ? window.location.origin 
    : 'http://localhost:3002'; // Fallback para desenvolvimento

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

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    setFiles(selectedFiles);

    // Gerar previews das imagens
    const previewUrls = Array.from(selectedFiles).map(file =>
      URL.createObjectURL(file)
    );
    setPreviewImages(previewUrls);
  };

  const handleUpload = () => {
    const formData = new FormData();
    Array.from(files).forEach(file => {
      formData.append('images', file);  // Adiciona múltiplos arquivos com o campo 'images'
    });

    fetch(`${apiBaseUrl}/api/upload`, {
      method: 'POST',
      body: formData,
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to upload image');
        }
        return res.json();
      })
      .then(() => {
        // Recarregar as imagens após o upload
        fetch(`${apiBaseUrl}/api/images`)
          .then(res => res.json())
          .then(data => setPhotos(data));

        // Limpar as imagens selecionadas e previews
        setFiles([]);
        setPreviewImages([]);
      })
      .catch(error => {
        console.error('Error uploading images:', error);
      });
  };

  const handleRemovePreview = (index) => {
    const updatedFiles = Array.from(files).filter((_, i) => i !== index);
    const updatedPreviews = previewImages.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    setPreviewImages(updatedPreviews);
  };

  const handleDelete = (filename) => {
    setPhotos((prevPhotos) => prevPhotos.filter(photo => !photo.includes(filename)));

    fetch(`${apiBaseUrl}/api/images/${filename}`, {
      method: 'DELETE',
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to delete image');
        }
      })
      .catch(error => {
        console.error('Error deleting image:', error);
      });
  };

  return (
    <div>
      <ContainerOuter>
        <div className="border-t border-zinc-100 pb-16 pt-10 dark:border-zinc-700/40">
          <ContainerInner>

            {/* Botão de Upload de Imagens */}
            <div className="mb-4 p-4 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-800">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Agregar imagenes
              </label>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="mt-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
              />
            </div>

            {/* Lista de Pré-visualização das Imagens Selecionadas */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              {previewImages.map((image, index) => (
                <div key={index} className="relative border rounded-lg p-2 bg-gray-100 dark:bg-gray-700">
                  <img
                    src={image}
                    alt={`Preview ${index}`}
                    className="h-20 w-20 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => handleRemovePreview(index)}
                    className="absolute top-0 right-0 bg-red-600 text-white rounded-full px-2 py-1 text-xs"
                  >
                    Borrar
                  </button>
                </div>
              ))}
            </div>

            {/* Botão de Upload */}
            {files.length > 0 && (
              <button
                onClick={handleUpload}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Subir imagenes
              </button>
            )}

            {/* Lista de Imagens já Carregadas */}
            <div className="mt-8">
              <h2 className="text-lg font-semibold">Imagens carregadas</h2>
              <div className="grid grid-cols-3 gap-4 mt-4">
                {photos.map(photo => (
                  <div key={photo} className="relative border rounded-lg p-2 bg-gray-100 dark:bg-gray-700">
                    <img
                      src={photo}
                      alt="Imagem carregada"
                      className="h-20 w-20 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => handleDelete(photo.split('/').pop())}
                      className="absolute top-0 right-0 bg-red-600 text-white rounded-full px-2 py-1 text-xs"
                    >
                      Remover
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </ContainerInner>
        </div>
      </ContainerOuter>
    </div>
  );
}

export default AdminPage;
