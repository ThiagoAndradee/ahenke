"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Para navegação em Next.js
import { Container } from "@/components/Container";
import { ContainerInner, ContainerOuter } from "@/components/Container";

function AdminPage() {
  const [photos, setPhotos] = useState([]);
  const [files, setFiles] = useState([]);  // Armazena os arquivos selecionados para upload
  const [previewImages, setPreviewImages] = useState([]);  // Pré-visualização das imagens selecionadas
  const [isLoading, setIsLoading] = useState(false);  // Status de carregamento
  const [uploadMessage, setUploadMessage] = useState("");
  const router = useRouter();

  // Verificação de login
  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      router.push("/login"); // Redireciona para a página de login se não estiver logado
    }
  }, [router]);

  // Carregar as imagens existentes do repositório GitHub
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
        setPhotos(images); // Salva os detalhes das imagens, incluindo SHA para deletar
      })
      .catch((error) => {
        console.error('Error fetching images:', error);
      });
  }, []);

  // Lidar com a seleção de arquivos para upload
  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    setFiles(selectedFiles);

    // Gerar pré-visualizações das imagens
    const previewUrls = Array.from(selectedFiles).map(file =>
      URL.createObjectURL(file)
    );
    setPreviewImages(previewUrls);
  };

  // Fazer o upload de múltiplos arquivos
  const handleUpload = async () => {
    setIsLoading(true); // Iniciar o carregamento
    setUploadMessage(""); // Resetar a mensagem de status

    const uploadPromises = Array.from(files).map(file => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = async () => {
          const base64File = reader.result.split(',')[1];  // Remove o prefixo `data:image/...`
          const fileName = file.name;
          const repoUrl = `https://api.github.com/repos/AhenkeFoto/ahenkefotos/contents/images/${fileName}`;

          const body = {
            message: `Upload de ${fileName}`, // Commit message
            content: base64File, // Arquivo em Base64
            branch: "main" // Branch do repositório
          };

          try {
            const response = await fetch(repoUrl, {
              method: 'PUT',
              headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,  // Usando a variável de ambiente
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(body),
            });

            if (!response.ok) {
              const errorData = await response.json();
              console.error('Erro ao enviar imagem para o GitHub:', errorData);
              reject('Failed to upload image to GitHub');
            }

            const data = await response.json();
            console.log('Imagem carregada com sucesso:', data);
            resolve(data);

          } catch (error) {
            console.error('Erro ao enviar imagem:', error);
            reject(error);
          }
        };

        reader.onerror = () => {
          console.error('Erro ao ler o arquivo:', reader.error);
          reject(reader.error);
        };
      });
    });

    try {
      const results = await Promise.all(uploadPromises);
      setUploadMessage("Imagens carregadas com sucesso!"); // Sucesso no upload
    } catch (error) {
      setUploadMessage("Erro ao carregar algumas imagens."); // Falha no upload
    } finally {
      setIsLoading(false); // Finalizar o carregamento
    }
  };

  // Remover pré-visualizações de imagens
  const handleRemovePreview = (index) => {
    const updatedFiles = Array.from(files).filter((_, i) => i !== index);
    const updatedPreviews = previewImages.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    setPreviewImages(updatedPreviews);
  };

  // Excluir imagens carregadas
  const handleDelete = async (fileName, sha) => {
    const repoUrl = `https://api.github.com/repos/AhenkeFoto/ahenkefotos/contents/images/${fileName}`;

    const body = {
      message: `Deleting ${fileName}`,
      sha: sha,  // SHA do arquivo que foi listado ao buscar as imagens
      branch: "main",
    };

    const response = await fetch(repoUrl, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error('Failed to delete image from GitHub');
    }

    console.log('Imagem deletada com sucesso');
  };

  return (
    <div>
      <ContainerOuter>
        <div className="border-t border-zinc-100 pb-16 pt-10 dark:border-zinc-700/40">
          <ContainerInner>
            {/* Botão de Upload de Imagens */}
            <div className="mb-4 p-4 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-800">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Agregar imágenes
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
                    Remover
                  </button>
                </div>
              ))}
            </div>

            {/* Feedback visual de upload */}
            {isLoading ? (
              <p>Carregando imagens...</p>
            ) : (
              <p>{uploadMessage}</p>
            )}

            {/* Botão de Upload */}
            {files.length > 0 && (
              <button
                onClick={handleUpload}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Subir imágenes
              </button>
            )}

            {/* Lista de Imagens já Carregadas */}
            <div className="mt-8">
              <h2 className="text-lg font-semibold">Imagens carregadas</h2>
              <div className="grid grid-cols-3 gap-4 mt-4">
                {photos.map(photo => (
                  <div key={photo.sha} className="relative border rounded-lg p-2 bg-gray-100 dark:bg-gray-700">
                    <img
                      src={photo.download_url}
                      alt="Imagem carregada"
                      className="h-20 w-20 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => handleDelete(photo.name, photo.sha)}  // Chama o handleDelete para cada imagem
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
