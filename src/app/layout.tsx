import '@/styles/globals.css';
import { Navbar } from '@/components/layout/Navbar';

export const metadata = {
  title: 'Düşelence — Kişisel Protokol',
  description: 'Kişisel fitness, takviye ve yaşam protokolü takip uygulaması',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#FFFFFF" />
      </head>
      <body className="pb-20 md:pb-0 md:pl-20">
        <main className="min-h-screen">
          {children}
        </main>
        <Navbar />
      </body>
    </html>
  );
}
