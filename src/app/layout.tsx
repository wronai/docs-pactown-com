import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Pactown Docs - Dokumentacja',
  description: 'Dokumentacja platformy Pactown - Executable Markdown SaaS',
  openGraph: {
    title: 'Pactown Docs',
    description: 'Dokumentacja platformy Pactown',
    url: 'https://docs.pactown.com',
    siteName: 'Pactown Docs',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body className="bg-gray-50 text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
