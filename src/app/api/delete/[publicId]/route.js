export async function POST(req, { params }) {
    const { publicId } = params;
    
    // Log para ver o publicId que foi passado
    console.log('PublicId recebido no request:', publicId);
    
    // Não alterar o publicId, pois o Cloudinary precisa do caminho completo
    const formattedPublicId = publicId;
  
    console.log('PublicId enviado para a API do Cloudinary:', formattedPublicId);  // Log do publicId final
    
    try {
      // Tenta deletar a imagem no Cloudinary
      const result = await cloudinary.uploader.destroy(formattedPublicId);
    
      console.log('Resultado da deleção no Cloudinary:', result); // Log do resultado da requisição ao Cloudinary
    
      if (result.result === 'not found') {
        console.warn(`Imagem com publicId ${formattedPublicId} não encontrada no Cloudinary.`);
        return NextResponse.json({ error: 'Image not found' }, { status: 404 });
      }
    
      console.log('Imagem deletada com sucesso:', result);  // Log de sucesso
      return NextResponse.json({ message: 'Image deleted successfully', result }, { status: 200 });
    } catch (error) {
      console.error('Erro ao tentar deletar imagem no Cloudinary:', error);
      return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 });
    }
  }
  