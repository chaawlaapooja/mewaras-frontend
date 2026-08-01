import { lazy, Suspense, type ReactNode } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainLayout } from '@/components/layout/main-layout';
import { LoadingState } from '@/components/common/loading-state';

const HomePage = lazy(() =>
  import('@/pages/home-page').then((module) => ({ default: module.HomePage })),
);
const ProductsPage = lazy(() =>
  import('@/pages/products-page').then((module) => ({ default: module.ProductsPage })),
);
const CategoryPage = lazy(() =>
  import('@/pages/category-page').then((module) => ({ default: module.CategoryPage })),
);
const ProductDetailPage = lazy(() =>
  import('@/pages/product-detail-page').then((module) => ({ default: module.ProductDetailPage })),
);
const NotFoundPage = lazy(() =>
  import('@/pages/not-found-page').then((module) => ({ default: module.NotFoundPage })),
);
const AboutUsPage = lazy(() =>
  import('@/pages/about-us-page').then((module) => ({ default: module.AboutUsPage })),
);
const ContactUsPage = lazy(() =>
  import('@/pages/contact-us-page').then((module) => ({ default: module.ContactUsPage })),
);

const withSuspense = (element: ReactNode) => (
  <Suspense fallback={<div className="container mx-auto px-4 py-12"><LoadingState /></div>}>
    {element}
  </Suspense>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: withSuspense(<HomePage />) },
      { path: 'products', element: withSuspense(<ProductsPage />) },
      { path: 'products/:slug', element: withSuspense(<ProductDetailPage />) },
      { path: 'about-us', element: withSuspense(<AboutUsPage />) },
      { path: 'contact-us', element: withSuspense(<ContactUsPage />) },
      { path: 'category/:slug', element: withSuspense(<CategoryPage />) },
      { path: '*', element: withSuspense(<NotFoundPage />) },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
