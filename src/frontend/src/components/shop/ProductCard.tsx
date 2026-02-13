import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Minus } from 'lucide-react';
import { useCart } from '../../store/cart';
import type { Product } from '../../backend';

interface ProductCardProps {
  product: Product;
  imageUrl: string;
}

export default function ProductCard({ product, imageUrl }: ProductCardProps) {
  const { addItem, removeItem, getItemQuantity } = useCart();
  const quantity = getItemQuantity(product.name);
  
  const variant = product.variants[0];
  const price = variant ? Number(variant.price) / 100 : 0;
  const currency = variant?.currency || 'HUF';

  const handleAdd = () => {
    addItem({
      id: product.name,
      name: product.name,
      price,
      currency,
      quantity: 1,
    });
  };

  const handleRemove = () => {
    removeItem(product.name);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="p-0">
        <div className="aspect-square bg-muted/30 flex items-center justify-center p-8">
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-contain"
          />
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <CardTitle className="text-2xl mb-2">{product.name}</CardTitle>
        <CardDescription className="mb-4">
          {product.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="mr-2 mb-2">
              {tag}
            </Badge>
          ))}
        </CardDescription>
        <div className="text-3xl font-bold text-primary mb-4">
          {price.toLocaleString()} {currency}
        </div>
        {product.specs.length > 0 && (
          <div className="space-y-1 text-sm text-muted-foreground">
            {product.specs.slice(0, 2).map((spec) => (
              <div key={spec.name}>
                <span className="font-medium">{spec.name}:</span> {spec.value}
              </div>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="p-6 pt-0">
        {quantity === 0 ? (
          <Button onClick={handleAdd} className="w-full" size="lg">
            <Plus className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        ) : (
          <div className="flex items-center gap-3 w-full">
            <Button onClick={handleRemove} variant="outline" size="icon">
              <Minus className="w-4 h-4" />
            </Button>
            <span className="flex-1 text-center font-semibold text-lg">
              {quantity}
            </span>
            <Button onClick={handleAdd} variant="outline" size="icon">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
