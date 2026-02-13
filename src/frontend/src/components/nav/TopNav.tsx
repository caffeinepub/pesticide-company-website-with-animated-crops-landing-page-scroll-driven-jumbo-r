import { Link, useRouterState } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../../store/cart';

export default function TopNav() {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center hover:opacity-80 transition-opacity py-2">
            <img 
              src="/assets/SanofilLogo-removebg-preview.png" 
              alt="Sanofil AgriProtect" 
              className="h-16 w-auto object-contain -my-2"
            />
            <span className="sr-only">AgriProtect Home</span>
          </Link>

          <nav className="flex items-center gap-2">
            <Button
              variant={currentPath === '/' ? 'default' : 'ghost'}
              asChild
            >
              <Link to="/">Home</Link>
            </Button>
            <Button
              variant={currentPath === '/shop' ? 'default' : 'ghost'}
              asChild
              className="relative"
            >
              <Link to="/shop">
                <ShoppingBag className="w-4 h-4 mr-2" />
                Shop
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
