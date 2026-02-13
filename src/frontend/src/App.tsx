import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import LandingPage from './pages/LandingPage';
import ShopPage from './pages/ShopPage';
import SiteLayout from './components/layout/SiteLayout';

const rootRoute = createRootRoute({
  component: SiteLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: LandingPage,
});

const shopRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/shop',
  component: ShopPage,
});

const routeTree = rootRoute.addChildren([indexRoute, shopRoute]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
