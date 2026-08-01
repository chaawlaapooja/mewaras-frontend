import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { Seo } from '@/components/common/seo';
import { PageTransition } from '@/components/common/page-transition';
import { LoadingState } from '@/components/common/loading-state';
import { ErrorState } from '@/components/common/error-state';
import { useWebsiteSettings } from '@/hooks/use-settings';
import { buildWhatsAppUrl } from '@/utils/whatsapp';

export function ContactUsPage() {
  const { data: settings, isLoading, isError, refetch } = useWebsiteSettings();

  return (
    <PageTransition>
      <Seo
        title="Contact Us"
        description="Get in touch with Mewa Ras for orders, custom hampers, and gifting recommendations."
        path="/contact-us"
      />

      <section className="container mx-auto px-4 py-12 md:py-16">
        <p className="text-sm uppercase tracking-[0.25em] text-primary">Get in Touch</p>
        <h1 className="mt-2 font-heading text-4xl font-semibold md:text-5xl">Contact Us</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Reach out for personalized recommendations, bulk orders, or custom hamper requests.
        </p>

        {isLoading ? (
          <div className="mt-10">
            <LoadingState />
          </div>
        ) : null}
        {isError ? (
          <div className="mt-10">
            <ErrorState onRetry={() => void refetch()} />
          </div>
        ) : null}

        {settings ? (
          <ul className="mt-10 grid max-w-xl gap-5 text-muted-foreground">
            {settings.businessPhone ? (
              <li className="flex items-center gap-3 rounded-xl border border-border/60 bg-card/40 p-4">
                <Phone className="h-5 w-5 shrink-0 text-primary" />
                <a href={`tel:${settings.businessPhone}`} className="hover:text-primary">
                  {settings.businessPhone}
                </a>
              </li>
            ) : null}
            {settings.whatsappNumber ? (
              <li className="flex items-center gap-3 rounded-xl border border-border/60 bg-card/40 p-4">
                <MessageCircle className="h-5 w-5 shrink-0 text-primary" />
                <a
                  href={buildWhatsAppUrl(settings.whatsappNumber, 'I would like to enquire')}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-primary"
                >
                  WhatsApp: {settings.whatsappNumber}
                </a>
              </li>
            ) : null}
            {settings.email ? (
              <li className="flex items-center gap-3 rounded-xl border border-border/60 bg-card/40 p-4">
                <Mail className="h-5 w-5 shrink-0 text-primary" />
                <a href={`mailto:${settings.email}`} className="hover:text-primary">
                  {settings.email}
                </a>
              </li>
            ) : null}
            {settings.address ? (
              <li className="flex items-start gap-3 rounded-xl border border-border/60 bg-card/40 p-4">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span>{settings.address}</span>
              </li>
            ) : null}
          </ul>
        ) : null}
      </section>
    </PageTransition>
  );
}
