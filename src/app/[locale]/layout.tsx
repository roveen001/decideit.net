import type { Metadata } from 'next';
import '../globals.css';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/Header';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import {unstable_setRequestLocale} from 'next-intl/server';

export const metadata: Metadata = {
  title: 'CivicVoice',
  description: "The people's voice, verified.",
};

export default function RootLayout({
  children,
  params: {locale}
}: Readonly<{
  children: React.ReactNode;
  params: {locale: string};
}>) {
  unstable_setRequestLocale(locale);
  const messages = useMessages();

  return (
    <html lang={locale} className="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen flex flex-col">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          <main className="flex-grow">{children}</main>
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
