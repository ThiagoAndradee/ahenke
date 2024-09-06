// app/api/images/route.js
import { NextResponse } from 'next/server';
import cloudinary from 'cloudinary';

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
  try {
    const result = await cloudinary.v2.search
      .expression('folder:uploads')
      .sort_by('created_at', 'desc')
      .max_results(30)
      .execute();

    const images = result.resources.map((file) => ({
      url: file.secure_url,
      public_id: file.public_id,
    }));

    return NextResponse.json(images);
  } catch (error) {
    console.error('Error fetching images from Cloudinary:', error);
    return NextResponse.error(new Error('Failed to fetch images'));
  }
}
