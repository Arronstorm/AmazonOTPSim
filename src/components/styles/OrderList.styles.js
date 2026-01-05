import styled from 'styled-components';

export const ListWrapper = styled.div`
  width: 100%;
  max-width: 800px;
  padding: 0 8px;
`;

export const ListHeader = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 24px;
  margin-bottom: 24px;
  text-align: center;
`;

export const ListTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #1e293b;
  margin: 0 0 8px 0;
`;

export const ListSubtitle = styled.p`
  color: #64748b;
  font-size: 14px;
  margin: 0;
`;

export const ScannerButton = styled.button`
  width: 100%;
  padding: 16px;
  background: linear-gradient(to right, #3b82f6, #2563eb);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background: linear-gradient(to right, #2563eb, #1d4ed8);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }
`;

export const ProductList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ProductCard = styled.div`
  background: ${props => props.$verified ? '#f0fdf4' : 'white'};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: ${props => props.$verified ? 'default' : 'pointer'};
  transition: all 0.2s;
  border: 2px solid ${props => props.$verified ? '#86efac' : 'transparent'};

  &:hover {
    box-shadow: ${props => !props.$verified && '0 4px 8px rgba(0, 0, 0, 0.15)'};
    transform: ${props => !props.$verified && 'translateY(-2px)'};
  }
`;

export const ProductInfo = styled.div`
  flex: 1;
`;

export const CustomerName = styled.h3`
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

export const QuantityBadge = styled.span`
  display: inline-block;
  background: #f97316;
  color: white;
  font-size: 12px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 12px;
  margin-left: 8px;
`;

export const VerifiedBadge = styled.div`
  padding: 10px 20px;
  background: #22c55e;
  color: white;
  border-radius: 6px;
  font-weight: 600;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const Footer = styled.p`
  text-align: center;
  font-size: 12px;
  color: #64748b;
  margin-top: 16px;
`;
