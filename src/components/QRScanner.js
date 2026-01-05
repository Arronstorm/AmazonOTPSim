import { X, Check } from 'lucide-react';
import {
  Wrapper,
  ScannerContainer,
  ScannerHeader,
  ScannerTitle,
  CloseButton,
  VideoContainer,
  Video,
  ScannerOverlay,
  ScannerText,
  ScannerSubtext,
  ScanSuccessPopup,
  ScanSuccessIcon,
  ScanSuccessText,
  ScanSuccessSubtext
} from './styles/QRScanner.styles';

export default function QRScanner({ videoRef, canvasRef, showScanSuccess, onClose }) {
  return (
    <Wrapper>
      <ScannerContainer>
        <ScannerHeader>
          <ScannerTitle>Scan QR Code</ScannerTitle>
          <CloseButton onClick={onClose}>
            <X size={24} />
          </CloseButton>
        </ScannerHeader>

        <VideoContainer>
          <Video ref={videoRef} autoPlay playsInline />
          <canvas ref={canvasRef} style={{display: 'none'}} />
          <ScannerOverlay />

          {showScanSuccess && (
            <ScanSuccessPopup>
              <ScanSuccessIcon>
                <Check size={32} color="white" />
              </ScanSuccessIcon>
              <ScanSuccessText>QR Code Scanned!</ScanSuccessText>
              <ScanSuccessSubtext>Loading order details...</ScanSuccessSubtext>
            </ScanSuccessPopup>
          )}
        </VideoContainer>

        <ScannerText>
          Position the QR code within the frame to scan
        </ScannerText>
        <ScannerSubtext>
          Demo: Will auto-select order in 2 seconds
        </ScannerSubtext>
      </ScannerContainer>
    </Wrapper>
  );
}
