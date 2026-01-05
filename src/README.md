# Project Structure

This React project follows a clean, organized folder structure with **styled-components** for styling, separating concerns and improving maintainability.

## Directory Structure

```
src/
├── components/                 # Reusable UI components
│   ├── Header.js              # Amazon header with logo
│   ├── OrderList.js           # List of orders with verification status
│   ├── OTPInput.js            # OTP input fields component
│   ├── QRScanner.js           # QR code scanner component
│   ├── SuccessModal.js        # Success verification modal
│   └── styles/                # Styled-components for components
│       ├── Header.styles.js
│       ├── OrderList.styles.js
│       ├── OTPInput.styles.js
│       ├── QRScanner.styles.js
│       └── SuccessModal.styles.js
│
├── pages/                     # Page-level components
│   ├── OTPVerificationPage.js # Main verification page
│   └── styles/                # Styled-components for pages
│       └── OTPVerificationPage.styles.js
│
├── hooks/                     # Custom React hooks
│   ├── useCamera.js           # Camera management hook
│   └── useOTP.js              # OTP input logic hook
│
├── utils/                     # Utility functions
│   └── audioUtils.js          # Audio/sound utilities
│
├── data/                      # Static data and constants
│   └── orderData.js           # Order mock data
│
├── App.js                     # Root application component
├── index.js                   # Application entry point
└── index.css                  # Global styles
```

## Styling with Styled-Components

All component styles are extracted into separate `.styles.js` files using **styled-components**. This approach provides:

### Benefits
- ✅ **Clean Component Files**: Logic and markup are separated from styles
- ✅ **Component-Scoped Styles**: No CSS class name conflicts
- ✅ **Dynamic Styling**: Easy to use props for conditional styles
- ✅ **Better Performance**: Automatic critical CSS injection
- ✅ **Full CSS Support**: All CSS features including animations, media queries, pseudo-classes

### Style File Naming Convention
- Components: `ComponentName.styles.js`
- Location: Same directory as component in a `styles/` folder

### Example Usage

**Component File** ([Header.js](components/Header.js)):
```javascript
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
```

**Style File** ([Header.styles.js](components/styles/Header.styles.js)):
```javascript
import styled from 'styled-components';

export const HeaderContainer = styled.div`
  text-align: center;
  margin-bottom: 32px;
`;

export const LogoContainer = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
`;

export const Logo = styled.h1`
  font-size: 32px;
  font-weight: bold;
  color: #1e293b;
`;
```

### Dynamic Props in Styled-Components
Use `$` prefix for transient props (props not passed to DOM):

```javascript
export const ProductCard = styled.div`
  background: ${props => props.$verified ? '#f0fdf4' : 'white'};
  cursor: ${props => props.$verified ? 'default' : 'pointer'};
`;

// Usage
<ProductCard $verified={product.verified}>...</ProductCard>
```

## Component Descriptions

### Components
- **Header**: Displays the Amazon logo and branding
- **OrderList**: Shows all orders with their verification status
- **OTPInput**: Handles 6-digit OTP input with auto-focus
- **QRScanner**: Camera-based QR code scanning interface
- **SuccessModal**: Displays success message after verification

### Pages
- **OTPVerificationPage**: Main page orchestrating all components and state

### Hooks
- **useCamera**: Manages camera permissions and stream
- **useOTP**: Handles OTP input state and validation logic

### Utils
- **audioUtils**: Provides beep and success sound effects

### Data
- **orderData**: Mock order data for the application

## Folder Structure Benefits

1. **Separation of Concerns**: Each folder has a specific purpose
2. **Clean Components**: Component logic is not cluttered with inline styles
3. **Reusability**: Components and styles can be easily reused
4. **Maintainability**: Easy to locate and modify specific functionality
5. **Scalability**: Simple to add new components, pages, or utilities
6. **Testing**: Isolated components are easier to test
7. **Type Safety**: Better IDE autocomplete for styled components

## Adding New Components

1. Create component file in `src/components/ComponentName.js`
2. Create styles file in `src/components/styles/ComponentName.styles.js`
3. Import and use styled components in your component

Example:
```javascript
// components/NewComponent.js
import { Container, Title } from './styles/NewComponent.styles';

export default function NewComponent() {
  return (
    <Container>
      <Title>Hello World</Title>
    </Container>
  );
}

// components/styles/NewComponent.styles.js
import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px;
`;

export const Title = styled.h2`
  color: #333;
  font-size: 24px;
`;
```

## Dependencies

- **styled-components**: ^6.x - CSS-in-JS library for component styling
- **lucide-react**: Icon library
- **react**: ^18.x
