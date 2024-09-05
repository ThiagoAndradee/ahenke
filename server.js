const express = require('express');
const next = require('next');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors'); // Importar o CORS

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Configurar onde as imagens serão armazenadas
const upload = multer({ dest: './public/uploads/' });

app.prepare().then(() => {
  const server = express();

  // Usar o CORS para permitir requisições de outros domínios/portas
  server.use(cors());

  // API para listar as imagens
  server.get('/api/images', (req, res) => {
    const directoryPath = path.join(__dirname, 'public/uploads/');
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        return res.status(500).send('Erro ao listar as imagens');
      }
      const images = files.map(file => `/uploads/${file}`);
      res.json(images);
    });
  });

  // API para fazer upload de múltiplas imagens (campo 'images')
  server.post('/api/upload', upload.array('images', 35), (req, res) => {  // Alterado para múltiplos uploads
    res.json({ files: req.files });
  });

  // API para deletar imagem
  server.delete('/api/images/:filename', (req, res) => {
    const filePath = path.join(__dirname, 'public/uploads/', req.params.filename);
    fs.unlink(filePath, err => {
      if (err) {
        return res.status(500).send('Erro ao deletar a imagem');
      }
      res.status(200).send('Imagem deletada');
    });
  });

  // Next.js pages handler
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(3002, err => {
    if (err) throw err;
    console.log('Server is running on http://localhost:3002');
  });
});
