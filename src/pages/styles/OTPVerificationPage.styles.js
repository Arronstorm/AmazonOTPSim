import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(to bottom right, #f8fafc, #e2e8f0);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  font-family: Arial, sans-serif;
`;

export const Wrapper = styled.div`
  width: 100%;
  max-width: 448px;
  padding: 0 8px;
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  color: #f97316;
  font-weight: 600;
  cursor: pointer;
  font-size: 14px;
  margin-bottom: 16px;
  padding: 8px 0;
`;

export const InfoCard = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 24px;

  @media (max-width: 480px) {
    padding: 16px;
  }
`;

export const PackageIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 12px;
`;

export const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 8px 0;
`;

export const Subtitle = styled.p`
  color: #64748b;
  font-size: 14px;
  margin: 0;
`;

export const CustomerInfoBox = styled.div`
  background: #f8fafc;
  border-radius: 6px;
  padding: 12px 12px 12px 8px;
  margin-top: 12px;
  border-left: 4px solid #f97316;
`;

export const CustomerName = styled.p`
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 8px 0;
`;

export const CustomerAddress = styled.p`
  font-size: 14px;
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

export const ItemsBox = styled.div`
  background: #fff7ed;
  border: 2px solid #fed7aa;
  border-radius: 8px;
  padding: 12px;
  margin-top: 12px;
`;

export const PaymentBox = styled.div`
  background: ${props => props.$isCOD ? '#fef3c7' : '#f0fdf4'};
  border: 2px solid ${props => props.$isCOD ? '#fde047' : '#bbf7d0'};
  border-radius: 8px;
  padding: 12px;
  margin-top: 12px;
`;

export const BoxTitle = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.color || '#1e293b'};
  margin: 0 0 12px 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ItemsList = styled.ul`
  margin: 0;
  padding-left: 20px;
`;

export const ItemsListItem = styled.li`
  font-size: 14px;
  color: #475569;
  margin-bottom: 6px;
  line-height: 1.5;
`;

export const PaymentRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

export const PaymentLabel = styled.span`
  font-size: 13px;
  color: #64748b;
  font-weight: 500;
`;

export const PaymentValue = styled.span`
  font-size: 14px;
  color: #1e293b;
  font-weight: 600;
`;

export const PaymentStatus = styled.span`
  display: inline-block;
  background: ${props => props.$isPrepaid ? '#22c55e' : '#f59e0b'};
  color: white;
  font-size: 12px;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 12px;
`;

export const PaymentAmount = styled.div`
  font-size: 18px;
  color: #f97316;
  font-weight: bold;
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid #e2e8f0;
`;

export const OTPCard = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 24px 16px;
`;

export const VerifyButton = styled.button`
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  font-weight: 600;
  color: white;
  background: ${props => props.disabled ? '#cbd5e1' : 'linear-gradient(to right, #fb923c, #f97316)'};
  border: none;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  font-size: 16px;
  box-shadow: ${props => props.disabled ? 'none' : '0 4px 6px rgba(0, 0, 0, 0.1)'};
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: linear-gradient(to right, #f97316, #ea580c);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }
`;

export const ResendContainer = styled.div`
  margin-top: 16px;
  text-align: center;
`;

export const ResendButton = styled.button`
  font-size: 14px;
  color: #ea580c;
  background: none;
  border: none;
  cursor: pointer;
  font-weight: 500;
`;

export const Footer = styled.p`
  text-align: center;
  font-size: 12px;
  color: #64748b;
  margin-top: 16px;
`;

export const Spinner = styled.svg`
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-right: 8px;
  animation: ${spin} 1s linear infinite;
`;

export const ButtonContent = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;
