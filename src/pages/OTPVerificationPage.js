import { useState, useEffect } from 'react';
import { Package, ArrowLeft, QrCode } from 'lucide-react';
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
  ScanQRButton,
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
  const [qrScanned, setQrScanned] = useState(false);
  const [showScanner, setShowScanner] = useState(false);

  const { otp, inputRefs, handleChange, handleKeyDown, handlePaste, resetOtp, isOtpComplete } = useOTP();
  const { videoRef, canvasRef, startCamera, stopCamera, scanQRCode: startQRScanning } = useCamera();

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setScreen('otp');
    setQrScanned(false);
    setShowScanner(false);
    resetOtp();
  };

  const handleOpenScanner = () => {
    setShowScanner(true);
    // Start camera when opening scanner
    setTimeout(() => {
      startCamera().then(() => {
        // Start real QR code scanning
        startQRScanning((qrData) => {
          console.log('QR Code scanned:', qrData);
          // Verify the QR code data matches the order (you can customize this validation)
          playBeepSound();
          setShowScanSuccess(true);

          setTimeout(() => {
            setShowScanSuccess(false);
            stopCamera();
            setQrScanned(true);
            setShowScanner(false);
          }, 1500);
        });
      }).catch(err => {
        console.error('Failed to start camera:', err);
        setShowScanner(false);
      });
    }, 100);
  };

  const handleBackToList = () => {
    setScreen('list');
    setSelectedProduct(null);
    setQrScanned(false);
    setShowScanner(false);
    stopCamera();
    resetOtp();
  };

  const handleCloseScanner = () => {
    stopCamera();
    setShowScanner(false);
    if (!qrScanned) {
      // If QR not scanned yet, go back to list
      setScreen('list');
      setSelectedProduct(null);
    }
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
    if (screen === 'otp' && qrScanned) {
      inputRefs.current[0]?.focus();
    }
  }, [screen, qrScanned, inputRefs]);

  return (
    <Container>
      {screen === 'list' && (
        <div>
          <Header />
          <OrderList
            products={products}
            onProductSelect={handleProductSelect}
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
            {!qrScanned ? (
              <>
                <div style={{ marginBottom: '1.5rem', textAlign: 'center', color: '#f97316', fontWeight: '500' }}>
                  Please scan the QR code to enable OTP entry
                </div>
                <ScanQRButton onClick={handleOpenScanner}>
                  <QrCode size={24} />
                  Scan QR Code
                </ScanQRButton>
              </>
            ) : null}

            <OTPInput
              otp={otp}
              inputRefs={inputRefs}
              onOtpChange={handleChange}
              onKeyDown={handleKeyDown}
              onPaste={handlePaste}
              disabled={!qrScanned}
            />

            <VerifyButton
              onClick={handleVerify}
              disabled={!isOtpComplete || isVerifying || !qrScanned}
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
              <ResendButton disabled={!qrScanned}>Resend Code</ResendButton>
            </ResendContainer>
          </OTPCard>

          {showScanner && (
            <QRScanner
              videoRef={videoRef}
              canvasRef={canvasRef}
              showScanSuccess={showScanSuccess}
              onClose={handleCloseScanner}
            />
          )}

          <Footer>Secure verification powered by Amazon</Footer>
        </Wrapper>
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
