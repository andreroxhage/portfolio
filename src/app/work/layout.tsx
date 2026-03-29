import React from 'react';

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <main
        className="dark min-h-screen"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 64% 50%, #191919 0%, #000000 70%)',
        }}
      >
        {children}
      </main>
    </div>
  );
}
