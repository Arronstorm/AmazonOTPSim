import { OTPInputContainer, StyledOTPInput } from './styles/OTPInput.styles';

export default function OTPInput({ otp, inputRefs, onOtpChange, onKeyDown, onPaste }) {
  return (
    <OTPInputContainer>
      {otp.map((digit, index) => (
        <StyledOTPInput
          key={index}
          ref={el => inputRefs.current[index] = el}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => onOtpChange(index, e.target.value)}
          onKeyDown={(e) => onKeyDown(index, e)}
          onPaste={index === 0 ? onPaste : undefined}
        />
      ))}
    </OTPInputContainer>
  );
}
