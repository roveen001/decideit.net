import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'decideit',
  description: "The people's voice, verified.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen flex flex-col relative overflow-hidden">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute inset-0 bg-grid-slate-100/50 [mask-image:linear-gradient(to_bottom,white_10%,transparent_50%)]"></div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="grid grid-cols-4 gap-x-32 gap-y-16 text-5xl font-bold text-slate-200/50 select-none">
                {Array.from({ length: 40 }).map((_, i) => (
                  <div key={i} className="opacity-20">
                    <span className="text-destructive/30">decide</span><span className="text-green-600/30">it</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Header />
          <main className="flex-grow relative z-10">{children}</main>
          <Footer />
          <Toaster />
      </body>
    </html>
  );
}
