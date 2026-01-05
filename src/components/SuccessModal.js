import { Check } from 'lucide-react';
import {
  ModalOverlay,
  ModalContent,
  ModalCenter,
  SuccessIconWrapper,
  SuccessTitle,
  SuccessText,
  CustomerInfoBox,
  CustomerName,
  CustomerAddress,
  ProductOrderId,
  OTPDisplay,
  OTPCode,
  OTPVerified,
  DoneButton
} from './styles/SuccessModal.styles';

export default function SuccessModal({ selectedProduct, otp, onClose }) {
  return (
    <ModalOverlay>
      <ModalContent>
        <ModalCenter>
          <SuccessIconWrapper>
            <Check size={48} color="white" />
          </SuccessIconWrapper>

          <SuccessTitle>Order Delivered Successfully!</SuccessTitle>

          <SuccessText>Delivery confirmed for</SuccessText>

          <CustomerInfoBox>
            <CustomerName>{selectedProduct.customerName}</CustomerName>
            <CustomerAddress>{selectedProduct.address}</CustomerAddress>
            <ProductOrderId>Order ID: {selectedProduct.orderId}</ProductOrderId>
          </CustomerInfoBox>

          <OTPDisplay>
            <OTPCode>OTP: {otp.join('')}</OTPCode>
            <OTPVerified>Verified successfully ✓</OTPVerified>
          </OTPDisplay>

          <DoneButton onClick={onClose}>
            Done
          </DoneButton>
        </ModalCenter>
      </ModalContent>
    </ModalOverlay>
  );
}
