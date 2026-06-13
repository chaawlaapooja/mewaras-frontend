import { Globe, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWebsiteSettings } from '@/hooks/use-settings';
import { SITE_NAME } from '@/constants/config';
import { Skeleton } from '@/components/ui/skeleton';

export function Footer() {
  const { data: settings, isLoading } = useWebsiteSettings();

  return (
    <footer className="mt-20 border-t border-border/60 bg-card/40">
      <div className="container mx-auto grid gap-10 px-4 py-12 md:grid-cols-3">
        <div>
          <h3 className="font-heading text-lg font-semibold">{SITE_NAME}</h3>
          <p className="mt-3 text-sm text-muted-foreground">
            Premium dry fruits, elegant hampers, and bespoke gifting experiences crafted for every
            celebration.
          </p>
        </div>

        <div>
          <h4 className="font-heading text-base font-medium">Explore</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/" className="hover:text-primary">
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-primary">
                Products
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading text-base font-medium">Contact</h4>
          {isLoading ? (
            <div className="mt-3 space-y-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-4 w-56" />
            </div>
          ) : (
            <ul className="mt-3 space-y-3 text-sm text-muted-foreground">
              {settings?.businessPhone ? (
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary" />
                  <a href={`tel:${settings.businessPhone}`}>{settings.businessPhone}</a>
                </li>
              ) : null}
              {settings?.email ? (
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  <a href={`mailto:${settings.email}`}>{settings.email}</a>
                </li>
              ) : null}
              {settings?.address ? (
                <li className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{settings.address}</span>
                </li>
              ) : null}
              {settings?.instagramUrl ? (
                <li className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-primary" />
                  <a href={settings.instagramUrl} target="_blank" rel="noreferrer">
                    Instagram
                  </a>
                </li>
              ) : null}
            </ul>
          )}
        </div>
      </div>
      <div className="border-t border-border/60 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
      </div>
    </footer>
  );
}
