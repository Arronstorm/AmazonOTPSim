import styled from 'styled-components';

export const OTPInputContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`;

export const StyledOTPInput = styled.input`
  width: 40px;
  height: 48px;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  border: 2px solid #cbd5e1;
  border-radius: 8px;
  outline: none;
  transition: all 0.2s;
  flex: 0 0 auto;

  &:focus {
    border-color: #fb923c;
    box-shadow: 0 0 0 3px rgba(251, 146, 60, 0.2);
  }

  @media (max-width: 480px) {
    width: 36px;
    height: 44px;
    font-size: 18px;
  }

  @media (max-width: 360px) {
    width: 32px;
    height: 40px;
    font-size: 16px;
  }
`;
