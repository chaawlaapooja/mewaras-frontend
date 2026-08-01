import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useCategories } from '@/hooks/use-categories';
import { cn } from '@/utils/cn';

const BRAND_NAME = 'Mewa Ras';

const staticNavItems = [
  { to: '/', label: 'Home', end: true as const },
  { to: '/about-us', label: 'About Us', end: false as const },
  { to: '/contact-us', label: 'Contact Us', end: false as const },
];

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'text-base font-medium tracking-wide transition-colors hover:text-primary md:text-lg',
    isActive ? 'text-primary' : 'text-muted-foreground',
  );

const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'rounded-lg px-4 py-3.5 text-base font-medium transition-colors hover:bg-muted hover:text-primary md:text-lg',
    isActive ? 'bg-muted/60 text-primary' : 'text-muted-foreground',
  );

export function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { data: categories, isLoading: categoriesLoading } = useCategories();

  const navCategories = useMemo(() => categories?.sort((a, b) => a.id - b.id).slice(0, 2) ?? [], [categories]);

  const isCategoryActive = (slug: string) =>
    location.pathname === '/products' && new URLSearchParams(location.search).get('category') === slug;

  const closeMenu = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-20 items-center justify-between gap-4 px-4 md:h-24 md:px-6">
        <Link
          to="/"
          className="group flex shrink-0 items-center gap-3 sm:gap-4"
          aria-label={`${BRAND_NAME} home`}
        >
          <img
            src="/logo.png"
            alt=""
            className="h-14 w-14 object-contain transition-transform group-hover:scale-105 sm:h-16 sm:w-16 md:h-[4.5rem] md:w-[4.5rem] border-r-42px rounded-full"
          />
          <span className="font-brand text-3xl font-semibold leading-none tracking-wide text-foreground sm:text-4xl md:text-[2.75rem]">
            {BRAND_NAME}
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex xl:gap-10" aria-label="Main navigation">
          {staticNavItems.slice(0, 2).map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={navLinkClass}>
              {item.label}
            </NavLink>
          ))}

          {!categoriesLoading &&
            navCategories.map((category) => (
              <NavLink
                key={category.documentId}
                to={`/products?category=${category.slug}`}
                className={() => navLinkClass({ isActive: isCategoryActive(category.slug) })}
              >
                {category.name}
              </NavLink>
            ))}

          <NavLink to="/contact-us" className={navLinkClass}>
            Contact Us
          </NavLink>
        </nav>

        <Button
          variant="ghost"
          size="icon"
          className="h-11 w-11 lg:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            id="mobile-navigation"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-border/60 lg:hidden"
            aria-label="Mobile navigation"
          >
            <div className="container mx-auto flex flex-col gap-1.5 px-4 py-5 md:px-6">
              {staticNavItems.slice(0, 2).map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={closeMenu}
                  className={mobileNavLinkClass}
                >
                  {item.label}
                </NavLink>
              ))}

              {!categoriesLoading &&
                navCategories.map((category) => (
                  <NavLink
                    key={category.documentId}
                    to={`/products?category=${category.slug}`}
                    onClick={closeMenu}
                    className={() => mobileNavLinkClass({ isActive: isCategoryActive(category.slug) })}
                  >
                    {category.name}
                  </NavLink>
                ))}

              <NavLink to="/contact-us" onClick={closeMenu} className={mobileNavLinkClass}>
                Contact Us
              </NavLink>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
