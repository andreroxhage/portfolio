import React from 'react';
import Footer from '@/app/sections/Footer';

export default function IdeasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <main
        className="min-h-screen"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 64% 50%, #191919 0%, #000000 70%)',
        }}
      >
        {children}
        <Footer />
      </main>
    </div>
  );
}
