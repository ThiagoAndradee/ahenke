import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'

import '@/styles/tailwind.css'

export const metadata = {
  title: 'Pamela Ahenke - Fashion Photographer in Munich',
  description: 'Pamela Ahenke is a professional fashion photographer based in Munich, Germany. Specializing in capturing the essence of style, beauty, and fashion, she brings a unique and creative vision to every photoshoot. Whether for editorial projects, commercial fashion campaigns, or personal photography sessions, Pamelas work is characterized by elegance, artistry, and attention to detail.',
  keywords: 'Pamela Ahenke, fashion photographer Munich, fashion photography Germany, Munich photographer, editorial fashion, beauty photography, commercial photographer, professional photographer Munich, fashion campaigns, photography sessions, creative photographer Munich, German fashion photographer',
  author: 'Pamela Ahenke',
  locale: 'en_DE',
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="flex h-full bg-zinc-50 dark:bg-black">
        <Providers>
          <div className="flex w-full">
            <Layout>{children}</Layout>
          </div>
        </Providers>
      </body>
    </html>
  )
}
