import styled, { keyframes } from 'styled-components';

const scaleIn = keyframes`
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  max-width: 448px;
  padding: 0 8px;
`;

export const ScannerContainer = styled.div`
  position: relative;
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const ScannerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const ScannerTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: #64748b;
`;

export const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  aspect-ratio: 1;
  background: #000;
  border-radius: 8px;
  overflow: hidden;
`;

export const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const ScannerOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  height: 70%;
  border: 3px solid #22c55e;
  border-radius: 12px;
  box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.5);
`;

export const ScannerText = styled.p`
  text-align: center;
  margin-top: 16px;
  color: #64748b;
  font-size: 14px;
`;

export const ScannerSubtext = styled.p`
  text-align: center;
  margin-top: 8px;
  color: #94a3b8;
  font-size: 12px;
`;

export const ScanSuccessPopup = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: 12px;
  padding: 24px 32px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  z-index: 10;
  animation: ${scaleIn} 0.3s ease-out;
  text-align: center;
  min-width: 280px;
`;

export const ScanSuccessIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(to bottom right, #4ade80, #22c55e);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
`;

export const ScanSuccessText = styled.p`
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 8px 0;
`;

export const ScanSuccessSubtext = styled.p`
  font-size: 14px;
  color: #64748b;
  margin: 0;
`;
