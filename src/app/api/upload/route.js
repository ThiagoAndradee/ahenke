// app/api/upload/route.js
import { NextResponse } from 'next/server';
import multer from 'multer';
import cloudinary from 'cloudinary';

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = multer({ dest: '/tmp/' });

export const POST = async (req) => {
  try {
    const formData = await req.formData();
    const files = formData.getAll('images');

    const uploadPromises = files.map((file) =>
      cloudinary.v2.uploader.upload(file.path, { folder: 'uploads' })
    );

    const results = await Promise.all(uploadPromises);

    const urls = results.map((result) => result.secure_url);

    return NextResponse.json({ urls });
  } catch (error) {
    console.error('Upload failed:', error);
    return NextResponse.error(new Error('Failed to upload image'));
  }
};
