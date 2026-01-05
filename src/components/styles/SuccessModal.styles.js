import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

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

const checkPop = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease-out;
`;

export const ModalContent = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 25px rgba(0, 0, 0, 0.15);
  max-width: 448px;
  width: 100%;
  padding: 32px;
  animation: ${scaleIn} 0.3s ease-out;
`;

export const ModalCenter = styled.div`
  text-align: center;
`;

export const SuccessIconWrapper = styled.div`
  margin: 0 auto 24px;
  width: 80px;
  height: 80px;
  background: linear-gradient(to bottom right, #4ade80, #22c55e);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: ${checkPop} 0.5s ease-out;
`;

export const SuccessTitle = styled.h3`
  font-size: 24px;
  font-weight: bold;
  color: #1e293b;
  margin-bottom: 8px;
`;

export const SuccessText = styled.p`
  color: #64748b;
  margin-bottom: 8px;
`;

export const CustomerInfoBox = styled.div`
  background: #f8fafc;
  border-radius: 6px;
  padding: 12px 12px 12px 8px;
  margin-top: 12px;
  border-left: 4px solid #f97316;
  margin-bottom: 16px;
`;

export const CustomerName = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 8px 0;
`;

export const CustomerAddress = styled.p`
  font-size: 13px;
  color: #64748b;
  margin: 0 0 8px 0;
  line-height: 1.4;
`;

export const ProductOrderId = styled.p`
  font-size: 12px;
  color: #94a3b8;
  font-weight: 500;
  margin: 0;
`;

export const OTPDisplay = styled.div`
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 24px;
`;

export const OTPCode = styled.p`
  font-size: 14px;
  color: #166534;
  font-weight: 500;
  margin: 0 0 4px 0;
`;

export const OTPVerified = styled.p`
  font-size: 12px;
  color: #16a34a;
  margin: 0;
`;

export const DoneButton = styled.button`
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  font-weight: 600;
  color: white;
  background: linear-gradient(to right, #fb923c, #f97316);
  border: none;
  cursor: pointer;
  font-size: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;

  &:hover {
    background: linear-gradient(to right, #f97316, #ea580c);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }
`;
