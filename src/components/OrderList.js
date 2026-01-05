import { Check } from 'lucide-react';
import {
  ListWrapper,
  ListHeader,
  ListTitle,
  ListSubtitle,
  ProductList,
  ProductCard,
  ProductInfo,
  CustomerName,
  CustomerAddress,
  ProductOrderId,
  QuantityBadge,
  VerifiedBadge,
  Footer
} from './styles/OrderList.styles';

export default function OrderList({ products, onProductSelect }) {
  return (
    <ListWrapper>
      <ListHeader>
        <ListTitle>Delivery Verification</ListTitle>
        <ListSubtitle>
          Select an order to verify delivery with OTP
        </ListSubtitle>
      </ListHeader>

      <ProductList>
        {products.map(product => (
          <ProductCard
            key={product.id}
            $verified={product.verified}
            onClick={() => !product.verified && onProductSelect(product)}
          >
            <ProductInfo>
              <CustomerName>{product.customerName}</CustomerName>
              <CustomerAddress>{product.address}</CustomerAddress>
              <ProductOrderId>
                Order ID: {product.orderId}
                <QuantityBadge>
                  {product.quantity} {product.quantity === 1 ? 'item' : 'items'}
                </QuantityBadge>
              </ProductOrderId>
            </ProductInfo>
            {product.verified && (
              <VerifiedBadge>
                <Check size={16} />
                Verified
              </VerifiedBadge>
            )}
          </ProductCard>
        ))}
      </ProductList>

      <Footer>Secure verification powered by Amazon</Footer>
    </ListWrapper>
  );
}
