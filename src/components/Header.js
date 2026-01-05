import { ShoppingCart } from 'lucide-react';
import { HeaderContainer, LogoContainer, Logo } from './styles/Header.styles';

export default function Header() {
  return (
    <HeaderContainer>
      <LogoContainer>
        <ShoppingCart size={40} color="#f97316" />
        <Logo>amazon</Logo>
      </LogoContainer>
    </HeaderContainer>
  );
}
