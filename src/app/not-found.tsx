import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center justify-center gap-6 text-center px-4">
        <h1 className="text-2xl md:text-3xl font-medium tracking-tight leading-tight text-foreground">
          Page not found
        </h1>
        <p className="text-lg text-muted-foreground">
          The page you are looking for does not exist.
        </p>
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="corner-squircle rounded-xl px-4 py-2 bg-foreground text-background text-sm font-medium"
          >
            Home
          </Link>
          <Link
            href="/work"
            className="corner-squircle rounded-xl px-4 py-2 border border-border text-sm font-medium text-foreground"
          >
            Work
          </Link>
        </div>
      </div>
    </div>
  );
}
