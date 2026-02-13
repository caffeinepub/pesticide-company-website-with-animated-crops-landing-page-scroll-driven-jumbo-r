import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/shop/ProductCard';
import CartSummary from '../components/shop/CartSummary';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function ShopPage() {
  const { data: products, isLoading, error } = useProducts();

  const productImages: Record<string, string> = {
    'Salaar': '/assets/generated/product-salaar-packshot.dim_800x800.png',
    'Megamite': '/assets/generated/product-megamite-packshot.dim_800x800.png',
    'Jumbo': '/assets/generated/product-jumbo-packshot.dim_800x800.png',
    'Cruzen': '/assets/generated/product-cruzen-packshot.dim_800x800.png',
  };

  return (
    <div className="min-h-screen py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Products</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Professional-grade pesticides engineered for superior crop protection and sustainable agriculture.
          </p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-8">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Failed to load products. Please try again later.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {isLoading ? (
              <div className="grid md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="h-64 w-full" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {products?.map((product) => (
                  <ProductCard
                    key={product.name}
                    product={product}
                    imageUrl={productImages[product.name] || '/assets/generated/product-jumbo-packshot.dim_800x800.png'}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <CartSummary />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
