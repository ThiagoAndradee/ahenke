require('dotenv').config(); // Carregar variáveis de ambiente do arquivo .env
const express = require('express');
const next = require('next');
const multer = require('multer');
const cors = require('cors'); // Importar o CORS
const cloudinary = require('cloudinary').v2; // Importar o Cloudinary

// Define o ambiente de desenvolvimento
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Configurar o Cloudinary com suas credenciais
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configurar onde as imagens serão armazenadas temporariamente para o upload
const upload = multer({ dest: '/tmp/' });

// Prepara o app Next.js e depois inicializa o servidor Express
app.prepare().then(() => {
  const server = express();

  // Usar o CORS para permitir requisições de outros domínios/portas
  server.use(cors());

  // API para listar as imagens do Cloudinary
  server.get('/api/images', (req, res) => {
    cloudinary.search
      .expression('folder:uploads')  // Buscar na pasta "uploads"
      .sort_by('created_at', 'desc') // Ordenar por data de criação
      .max_results(30) // Limite de 30 resultados
      .execute()
      .then(result => {
        const images = result.resources.map(file => ({
          url: file.secure_url,   // URL segura da imagem
          public_id: file.public_id // Public ID (para deletar ou manipular)
        }));
        res.json(images);
      })
      .catch(err => {
        console.error('Erro ao buscar imagens no Cloudinary:', err);
        res.status(500).json({ error: 'Erro ao buscar imagens' });
      });
  });

  // API para deletar uma imagem específica
  server.post('/api/delete/:publicId', (req, res) => {
    const { publicId } = req.params;

    // Adiciona log para verificar o publicId que foi recebido
    console.log('Requisição para deletar imagem com publicId:', publicId);

    // Formata o publicId e faz a chamada para deletar no Cloudinary
    const formattedPublicId = publicId;
    console.log('Formatted publicId enviado para Cloudinary:', formattedPublicId);

    cloudinary.uploader.destroy(formattedPublicId)
      .then(result => {
        console.log('Resultado da deleção:', result);

        if (result.result === 'not found') {
          console.warn(`Imagem com publicId ${formattedPublicId} não encontrada no Cloudinary.`);
          return res.status(404).json({ error: 'Image not found' });
        }

        console.log(`Imagem ${formattedPublicId} deletada com sucesso.`);
        res.json({ message: 'Image deleted successfully', result });
      })
      .catch(err => {
        console.error('Erro ao deletar imagem no Cloudinary:', err);
        res.status(500).json({ error: 'Failed to delete image' });
      });
  });

  // API para fazer upload de múltiplas imagens usando Cloudinary
  server.post('/api/upload', upload.array('images', 20), (req, res) => {
    const uploadPromises = req.files.map(file => {
      return cloudinary.uploader.upload(file.path, {
        folder: 'uploads', // Diretório onde as imagens serão armazenadas no Cloudinary
      });
    });

    Promise.all(uploadPromises)
      .then(results => {
        const urls = results.map(result => result.secure_url);
        const publicIds = results.map(result => result.public_id); // Captura os public_ids do Cloudinary
        res.json({ urls, publicIds });
      })
      .catch(error => {
        console.error('Falha no upload para Cloudinary:', error);
        res.status(500).json({ error: 'Falha no upload da imagem' });
      });
  });

  // Next.js pages handler
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  const port = process.env.PORT || 3002; // Usar a porta definida no .env ou fallback para 3002
  server.listen(port, err => {
    if (err) throw err;
    console.log(`Server is running on http://localhost:${port}`);
  });
});
