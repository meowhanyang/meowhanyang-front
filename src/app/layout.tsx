import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/Toaster';
import Providers from './providers';
import UserProvider from '@/providers/UserInfoProvider';
import JotaiProvider from '@/providers/JotaiProvider';
import React from 'react';
import AuthSession from '@/providers/AuthSession';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '냥.zip | 길냥이 돌봄 기록',
  description: '당신이 마주친 모든 길냥이들을 위해',
  keywords: ['길고양이', '길냥이'],
  authors: [{ name: '냥집' }],
  openGraph: {
    title: '냥.zip | 길냥이 돌봄 기록',
    description: '당신이 마주친 모든 길냥이들을 위해',
    images: ['/og-image.png']
  },
  icons: {
    icon: [
      { url: '/images/favicon/favicon.ico' },
      {
        url: '/images/favicon/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png'
      },
      {
        url: '/images/favicon/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png'
      }
    ],
    apple: [
      {
        url: '/images/favicon/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png'
      }
    ],
    other: [
      {
        url: '/images/favicon/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        url: '/images/favicon/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={`${inter.className} relative w-full bg-[#f9f9f9]`}>
        <Providers>
          <AuthSession>
            <JotaiProvider>
              <UserProvider>{children}</UserProvider>
            </JotaiProvider>
          </AuthSession>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
