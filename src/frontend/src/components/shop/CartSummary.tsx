import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Trash2 } from 'lucide-react';
import { useCart } from '../../store/cart';

export default function CartSummary() {
  const { items, getTotalItems, getTotalPrice, clearCart } = useCart();

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="w-5 h-5" />
          Cart Summary
        </CardTitle>
        <CardDescription>
          {totalItems === 0 ? 'Your cart is empty' : `${totalItems} item${totalItems !== 1 ? 's' : ''} in cart`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {items.length > 0 ? (
          <>
            <div className="space-y-3 mb-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-start text-sm">
                  <div className="flex-1">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-muted-foreground">
                      {item.quantity} × {item.price.toLocaleString()} {item.currency}
                    </div>
                  </div>
                  <div className="font-semibold">
                    {(item.price * item.quantity).toLocaleString()} {item.currency}
                  </div>
                </div>
              ))}
            </div>
            <Separator className="my-4" />
            <div className="flex justify-between items-center text-lg font-bold mb-4">
              <span>Total</span>
              <span className="text-primary">
                {totalPrice.toLocaleString()} HUF
              </span>
            </div>
            <Button
              variant="outline"
              className="w-full mb-2"
              onClick={clearCart}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear Cart
            </Button>
            <Button className="w-full" size="lg">
              Proceed to Checkout
            </Button>
          </>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <ShoppingCart className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>Add products to get started</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
