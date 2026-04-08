import React from 'react';

export default function IdeasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <main className="min-h-screen bg-background">{children}</main>
    </div>
  );
}
