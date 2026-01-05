import { useState, useEffect } from 'react';
import { Package, ArrowLeft } from 'lucide-react';
import Header from '../components/Header';
import OrderList from '../components/OrderList';
import OTPInput from '../components/OTPInput';
import QRScanner from '../components/QRScanner';
import SuccessModal from '../components/SuccessModal';
import useOTP from '../hooks/useOTP';
import useCamera from '../hooks/useCamera';
import { playBeepSound, playSuccessSound } from '../utils/audioUtils';
import { ordersData } from '../data/orderData';
import {
  Container,
  Wrapper,
  BackButton,
  InfoCard,
  PackageIconWrapper,
  Title,
  Subtitle,
  CustomerInfoBox,
  CustomerName,
  CustomerAddress,
  ProductOrderId,
  ItemsBox,
  PaymentBox,
  BoxTitle,
  ItemsList,
  ItemsListItem,
  PaymentRow,
  PaymentLabel,
  PaymentValue,
  PaymentStatus,
  PaymentAmount,
  OTPCard,
  VerifyButton,
  ResendContainer,
  ResendButton,
  Footer,
  Spinner,
  ButtonContent
} from './styles/OTPVerificationPage.styles';

export default function OTPVerificationPage() {
  const [screen, setScreen] = useState('list');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [showScanSuccess, setShowScanSuccess] = useState(false);
  const [products, setProducts] = useState(ordersData);

  const { otp, inputRefs, handleChange, handleKeyDown, handlePaste, resetOtp, isOtpComplete } = useOTP();
  const { videoRef, canvasRef, startCamera, stopCamera } = useCamera();

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setScreen('otp');
    resetOtp();
  };

  const handleBackToList = () => {
    setScreen('list');
    setSelectedProduct(null);
    resetOtp();
  };

  const handleOpenScanner = () => {
    setScreen('scanner');
    startCamera().then(() => {
      scanQRCode();
    }).catch(err => {
      console.error('Failed to start camera:', err);
      setScreen('list');
    });
  };

  const handleCloseScanner = () => {
    stopCamera();
    setScreen('list');
  };

  const scanQRCode = () => {
    setTimeout(() => {
      const simulatedOrderId = 'ORD-2024-003';
      const product = products.find(p => p.orderId === simulatedOrderId);
      if (product && !product.verified) {
        playBeepSound();
        setShowScanSuccess(true);

        setTimeout(() => {
          setShowScanSuccess(false);
          stopCamera();
          setSelectedProduct(product);
          setScreen('otp');
        }, 1500);
      }
    }, 2000);
  };

  const handleVerify = () => {
    const otpValue = otp.join('');
    if (otpValue.length === 6) {
      setIsVerifying(true);
      setTimeout(() => {
        setIsVerifying(false);
        playSuccessSound();
        setShowSuccess(true);
      }, 1000);
    }
  };

  const handleCloseSuccess = () => {
    setProducts(prevProducts =>
      prevProducts.map(p =>
        p.id === selectedProduct.id ? { ...p, verified: true } : p
      )
    );
    setShowSuccess(false);
    setScreen('list');
    setSelectedProduct(null);
    resetOtp();
  };

  useEffect(() => {
    if (screen === 'otp') {
      inputRefs.current[0]?.focus();
    }
  }, [screen, inputRefs]);

  return (
    <Container>
      {screen === 'list' && (
        <div>
          <Header />
          <OrderList
            products={products}
            onProductSelect={handleProductSelect}
            onOpenScanner={handleOpenScanner}
          />
        </div>
      )}

      {screen === 'otp' && selectedProduct && (
        <Wrapper>
          <div>
            <BackButton onClick={handleBackToList}>
              <ArrowLeft size={20} />
              Back to Orders
            </BackButton>
            <Header />
            <InfoCard>
              <PackageIconWrapper>
                <Package size={64} color="#f97316" />
              </PackageIconWrapper>
              <Title>Verify Your Order</Title>
              <Subtitle>
                Enter the 6-digit verification code for delivery to
              </Subtitle>
              <CustomerInfoBox>
                <CustomerName>{selectedProduct.customerName}</CustomerName>
                <CustomerAddress>{selectedProduct.address}</CustomerAddress>
                <ProductOrderId>Order ID: {selectedProduct.orderId}</ProductOrderId>
              </CustomerInfoBox>

              <ItemsBox>
                <BoxTitle color="#c2410c">
                  <Package size={16} />
                  Items in this order ({selectedProduct.quantity})
                </BoxTitle>
                <ItemsList>
                  {selectedProduct.items.map((item, index) => (
                    <ItemsListItem key={index}>{item}</ItemsListItem>
                  ))}
                </ItemsList>
              </ItemsBox>

              <PaymentBox $isCOD={selectedProduct.paymentStatus !== 'Prepaid'}>
                <BoxTitle color={selectedProduct.paymentStatus === 'Prepaid' ? '#166534' : '#92400e'}>
                  💳 Payment Details
                </BoxTitle>
                <PaymentRow>
                  <PaymentLabel>Payment Method:</PaymentLabel>
                  <PaymentValue>{selectedProduct.paymentMethod}</PaymentValue>
                </PaymentRow>
                <PaymentRow>
                  <PaymentLabel>Payment Status:</PaymentLabel>
                  <PaymentStatus $isPrepaid={selectedProduct.paymentStatus === 'Prepaid'}>
                    {selectedProduct.paymentStatus}
                  </PaymentStatus>
                </PaymentRow>
                <PaymentAmount>
                  Total: {selectedProduct.amount}
                </PaymentAmount>
              </PaymentBox>
            </InfoCard>
          </div>

          <OTPCard>
            <OTPInput
              otp={otp}
              inputRefs={inputRefs}
              onOtpChange={handleChange}
              onKeyDown={handleKeyDown}
              onPaste={handlePaste}
            />

            <VerifyButton
              onClick={handleVerify}
              disabled={!isOtpComplete || isVerifying}
            >
              {isVerifying ? (
                <ButtonContent>
                  <Spinner viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.25" />
                    <path fill="currentColor" opacity="0.75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </Spinner>
                  Verifying...
                </ButtonContent>
              ) : (
                'Verify & Confirm Delivery'
              )}
            </VerifyButton>

            <ResendContainer>
              <ResendButton>Resend Code</ResendButton>
            </ResendContainer>
          </OTPCard>

          <Footer>Secure verification powered by Amazon</Footer>
        </Wrapper>
      )}

      {screen === 'scanner' && (
        <QRScanner
          videoRef={videoRef}
          canvasRef={canvasRef}
          showScanSuccess={showScanSuccess}
          onClose={handleCloseScanner}
        />
      )}

      {showSuccess && selectedProduct && (
        <SuccessModal
          selectedProduct={selectedProduct}
          otp={otp}
          onClose={handleCloseSuccess}
        />
      )}
    </Container>
  );
}
