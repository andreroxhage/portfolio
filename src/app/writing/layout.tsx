import React from 'react';

export default function WritingLayout({
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
