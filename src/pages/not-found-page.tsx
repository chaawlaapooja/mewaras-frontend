import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Seo } from '@/components/common/seo';

export function NotFoundPage() {
  return (
    <>
      <Seo title="Page Not Found" description="The page you are looking for does not exist." path="/404" />
      <section className="container mx-auto flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4 py-20 text-center">
        <h1 className="font-heading text-5xl font-semibold">404</h1>
        <p className="text-muted-foreground">The page you are looking for could not be found.</p>
        <Button asChild>
          <Link to="/">Back to home</Link>
        </Button>
      </section>
    </>
  );
}
