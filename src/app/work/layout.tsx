import React from 'react';

export default function WorkLayout({
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
