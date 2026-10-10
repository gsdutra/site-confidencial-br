import type { Metadata, Viewport } from 'next';
import { Barlow, Barlow_Condensed } from 'next/font/google';
import './globals.css';

const body = Barlow({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--f-body' });
const display = Barlow_Condensed({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--f-display' });

export const metadata: Metadata = {
  title: 'Confidencial Brasil · Uniformes e roupas para eventos',
  description:
    'Confecção própria de uniformes corporativos e roupas para eventos: polos, camisas, jaquetas, coletes e moletons com bordado e estampa.',
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#070a15', colorScheme: 'dark' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${body.variable} ${display.variable}`}>
      <body>{children}</body>
    </html>
  );
}
