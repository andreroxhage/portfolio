import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center justify-center gap-6 text-center px-4">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-heading leading-tight text-foreground">
          Page not found
        </h1>
        <p className="text-lg text-muted-foreground">
          The page you are looking for does not exist.
        </p>
        <div className="flex items-center gap-4">
          <Button asChild>
            <Link href="/">Home</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/work">Work</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
