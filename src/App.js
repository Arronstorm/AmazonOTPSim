import React, { useState, useRef, useEffect } from 'react';
import { Check, Package, ShoppingCart, ArrowLeft, QrCode, X } from 'lucide-react';
import { ordersData } from './orderData';

export default function AmazonOTPVerification() {
  const [screen, setScreen] = useState('list'); // 'list', 'otp', 'success', 'scanner'
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [scannedCode, setScannedCode] = useState('');
  const [showScanSuccess, setShowScanSuccess] = useState(false);
  const inputRefs = useRef([]);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  
  const [products, setProducts] = useState(ordersData);

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setScreen('otp');
    setOtp(['', '', '', '', '', '']);
  };

  const handleBackToList = () => {
    setScreen('list');
    setSelectedProduct(null);
    setOtp(['', '', '', '', '', '']);
  };

  const handleOpenScanner = () => {
    setScreen('scanner');
    startCamera();
  };

  const handleCloseScanner = () => {
    stopCamera();
    setScreen('list');
    setScannedCode('');
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        videoRef.current.play();
        scanQRCode();
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      alert('Unable to access camera. Please allow camera permissions.');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  const scanQRCode = () => {
    // Simulated QR scanning - In production, use a library like jsQR
    // For demo purposes, we'll simulate finding a QR code after 2 seconds
    setTimeout(() => {
      const simulatedOrderId = 'ORD-2024-003'; // Simulating scan result
      const product = products.find(p => p.orderId === simulatedOrderId);
      if (product && !product.verified) {
        // Play beep sound
        playBeepSound();
        
        // Show success popup
        setShowScanSuccess(true);
        
        // Hide popup after 1.5 seconds and proceed
        setTimeout(() => {
          setShowScanSuccess(false);
          stopCamera();
          setSelectedProduct(product);
          setScreen('otp');
        }, 1500);
      }
    }, 2000);
  };

  const playBeepSound = () => {
    // Create a beep sound using Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 1000; // Frequency in Hz (higher pitch for more noticeable sound)
    oscillator.type = 'square'; // Square wave for sharper, louder sound
    
    gainNode.gain.setValueAtTime(1, audioContext.currentTime); // Maximum volume
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  };

  const playSuccessSound = () => {
    // Create a pleasant success sound using Web Audio API - LOUDER VERSION
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // First tone (higher) - LOUDER
    const oscillator1 = audioContext.createOscillator();
    const gainNode1 = audioContext.createGain();
    oscillator1.connect(gainNode1);
    gainNode1.connect(audioContext.destination);
    oscillator1.frequency.value = 800;
    oscillator1.type = 'square'; // Changed to square for louder, clearer sound
    gainNode1.gain.setValueAtTime(1, audioContext.currentTime); // Maximum volume
    gainNode1.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    oscillator1.start(audioContext.currentTime);
    oscillator1.stop(audioContext.currentTime + 0.3);
    
    // Second tone (lower, delayed) - LOUDER
    const oscillator2 = audioContext.createOscillator();
    const gainNode2 = audioContext.createGain();
    oscillator2.connect(gainNode2);
    gainNode2.connect(audioContext.destination);
    oscillator2.frequency.value = 1000;
    oscillator2.type = 'square'; // Changed to square for louder, clearer sound
    gainNode2.gain.setValueAtTime(1, audioContext.currentTime + 0.2); // Maximum volume
    gainNode2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    oscillator2.start(audioContext.currentTime + 0.2);
    oscillator2.stop(audioContext.currentTime + 0.5);
  };

  const handleChange = (index, value) => {
    if (value.length > 1) {
      value = value.slice(0, 1);
    }

    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== '' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split('').forEach((char, index) => {
      if (index < 6) {
        newOtp[index] = char;
      }
    });
    setOtp(newOtp);

    const nextEmptyIndex = newOtp.findIndex(val => val === '');
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex]?.focus();
    } else {
      inputRefs.current[5]?.focus();
    }
  };

  const handleVerify = () => {
    const otpValue = otp.join('');
    if (otpValue.length === 6) {
      setIsVerifying(true);
      setTimeout(() => {
        setIsVerifying(false);
        playSuccessSound(); // Play success sound
        setShowSuccess(true);
      }, 1000);
    }
  };

  const handleCloseSuccess = () => {
    // Mark the product as verified
    setProducts(prevProducts =>
      prevProducts.map(p =>
        p.id === selectedProduct.id ? { ...p, verified: true } : p
      )
    );
    setShowSuccess(false);
    setScreen('list');
    setSelectedProduct(null);
    setOtp(['', '', '', '', '', '']);
  };

  useEffect(() => {
    if (screen === 'otp') {
      inputRefs.current[0]?.focus();
    }
  }, [screen]);

  const isOtpComplete = otp.every(digit => digit !== '');

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #f8fafc, #e2e8f0)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px',
      fontFamily: 'Arial, sans-serif'
    },
    wrapper: {
      width: '100%',
      maxWidth: '448px'
    },
    listWrapper: {
      width: '100%',
      maxWidth: '800px'
    },
    header: {
      textAlign: 'center',
      marginBottom: '32px'
    },
    logoContainer: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '16px'
    },
    logo: {
      fontSize: '32px',
      fontWeight: 'bold',
      color: '#1e293b'
    },
    listHeader: {
      background: 'white',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      padding: '24px',
      marginBottom: '24px',
      textAlign: 'center'
    },
    listTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#1e293b',
      margin: '0 0 8px 0'
    },
    listSubtitle: {
      color: '#64748b',
      fontSize: '14px',
      margin: 0
    },
    scannerButton: {
      width: '100%',
      padding: '16px',
      background: 'linear-gradient(to right, #3b82f6, #2563eb)',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontWeight: '600',
      fontSize: '16px',
      cursor: 'pointer',
      marginBottom: '24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      transition: 'all 0.2s',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    },
    productList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    },
    productCard: {
      background: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      padding: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      cursor: 'pointer',
      transition: 'all 0.2s',
      border: '2px solid transparent'
    },
    productCardVerified: {
      background: '#f0fdf4',
      border: '2px solid #86efac',
      cursor: 'default'
    },
    productInfo: {
      flex: 1
    },
    customerName: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#1e293b',
      margin: '0 0 8px 0'
    },
    customerAddress: {
      fontSize: '14px',
      color: '#64748b',
      margin: '0 0 8px 0',
      lineHeight: '1.4'
    },
    productOrderId: {
      fontSize: '12px',
      color: '#94a3b8',
      fontWeight: '500',
      margin: 0
    },
    quantityBadge: {
      display: 'inline-block',
      background: '#f97316',
      color: 'white',
      fontSize: '12px',
      fontWeight: '600',
      padding: '4px 10px',
      borderRadius: '12px',
      marginLeft: '8px'
    },
    itemsBox: {
      background: '#fff7ed',
      border: '2px solid #fed7aa',
      borderRadius: '8px',
      padding: '16px',
      marginTop: '12px'
    },
    paymentBox: {
      background: '#f0fdf4',
      border: '2px solid #bbf7d0',
      borderRadius: '8px',
      padding: '16px',
      marginTop: '12px'
    },
    paymentBoxCOD: {
      background: '#fef3c7',
      border: '2px solid #fde047',
      borderRadius: '8px',
      padding: '16px',
      marginTop: '12px'
    },
    boxTitle: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#1e293b',
      margin: '0 0 12px 0',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    itemsTitle: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#1e293b',
      margin: '0 0 12px 0'
    },
    itemsList: {
      margin: 0,
      paddingLeft: '20px'
    },
    itemsListItem: {
      fontSize: '14px',
      color: '#475569',
      marginBottom: '6px',
      lineHeight: '1.5'
    },
    paymentRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '8px'
    },
    paymentLabel: {
      fontSize: '13px',
      color: '#64748b',
      fontWeight: '500'
    },
    paymentValue: {
      fontSize: '14px',
      color: '#1e293b',
      fontWeight: '600'
    },
    paymentStatusPrepaid: {
      display: 'inline-block',
      background: '#22c55e',
      color: 'white',
      fontSize: '12px',
      fontWeight: '600',
      padding: '4px 12px',
      borderRadius: '12px'
    },
    paymentStatusCOD: {
      display: 'inline-block',
      background: '#f59e0b',
      color: 'white',
      fontSize: '12px',
      fontWeight: '600',
      padding: '4px 12px',
      borderRadius: '12px'
    },
    paymentAmount: {
      fontSize: '18px',
      color: '#f97316',
      fontWeight: 'bold',
      marginTop: '8px',
      paddingTop: '8px',
      borderTop: '1px solid #e2e8f0'
    },
    verifyButton: {
      padding: '10px 28px',
      background: 'linear-gradient(to right, #fb923c, #f97316)',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      fontWeight: '600',
      cursor: 'pointer',
      fontSize: '14px',
      transition: 'all 0.2s'
    },
    verifiedBadge: {
      padding: '10px 20px',
      background: '#22c55e',
      color: 'white',
      borderRadius: '6px',
      fontWeight: '600',
      fontSize: '14px',
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    },
    backButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      background: 'none',
      border: 'none',
      color: '#f97316',
      fontWeight: '600',
      cursor: 'pointer',
      fontSize: '14px',
      marginBottom: '16px',
      padding: '8px 0'
    },
    scannerContainer: {
      position: 'relative',
      background: 'white',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    },
    scannerHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px'
    },
    scannerTitle: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#1e293b',
      margin: 0
    },
    closeButton: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: '4px',
      color: '#64748b'
    },
    videoContainer: {
      position: 'relative',
      width: '100%',
      maxWidth: '400px',
      margin: '0 auto',
      aspectRatio: '1',
      background: '#000',
      borderRadius: '8px',
      overflow: 'hidden'
    },
    video: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    },
    scannerOverlay: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '70%',
      height: '70%',
      border: '3px solid #22c55e',
      borderRadius: '12px',
      boxShadow: '0 0 0 9999px rgba(0,0,0,0.5)'
    },
    scannerText: {
      textAlign: 'center',
      marginTop: '16px',
      color: '#64748b',
      fontSize: '14px'
    },
    scanSuccessPopup: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      background: 'white',
      borderRadius: '12px',
      padding: '24px 32px',
      boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
      zIndex: 10,
      animation: 'scaleIn 0.3s ease-out',
      textAlign: 'center',
      minWidth: '280px'
    },
    scanSuccessIcon: {
      width: '60px',
      height: '60px',
      background: 'linear-gradient(to bottom right, #4ade80, #22c55e)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 16px'
    },
    scanSuccessText: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#1e293b',
      margin: '0 0 8px 0'
    },
    scanSuccessSubtext: {
      fontSize: '14px',
      color: '#64748b',
      margin: 0
    },
    infoCard: {
      background: 'white',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      padding: '24px',
      marginBottom: '24px'
    },
    packageIconWrapper: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '12px'
    },
    title: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#1e293b',
      marginBottom: '8px',
      margin: '0 0 8px 0'
    },
    subtitle: {
      color: '#64748b',
      fontSize: '14px',
      margin: 0
    },
    customerInfoBox: {
      background: '#f8fafc',
      borderRadius: '6px',
      padding: '12px',
      marginTop: '12px',
      borderLeft: '4px solid #f97316'
    },
    otpCard: {
      background: 'white',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      padding: '32px'
    },
    otpInputContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: '12px',
      marginBottom: '24px'
    },
    otpInput: {
      width: '48px',
      height: '56px',
      textAlign: 'center',
      fontSize: '24px',
      fontWeight: 'bold',
      border: '2px solid #cbd5e1',
      borderRadius: '8px',
      outline: 'none',
      transition: 'all 0.2s'
    },
    otpInputFocus: {
      borderColor: '#fb923c',
      boxShadow: '0 0 0 3px rgba(251, 146, 60, 0.2)'
    },
    buttonActive: {
      width: '100%',
      padding: '12px',
      borderRadius: '8px',
      fontWeight: '600',
      color: 'white',
      background: 'linear-gradient(to right, #fb923c, #f97316)',
      border: 'none',
      cursor: 'pointer',
      fontSize: '16px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      transition: 'all 0.2s'
    },
    buttonDisabled: {
      width: '100%',
      padding: '12px',
      borderRadius: '8px',
      fontWeight: '600',
      color: 'white',
      background: '#cbd5e1',
      border: 'none',
      cursor: 'not-allowed',
      fontSize: '16px'
    },
    resendContainer: {
      marginTop: '16px',
      textAlign: 'center'
    },
    resendButton: {
      fontSize: '14px',
      color: '#ea580c',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontWeight: '500'
    },
    footer: {
      textAlign: 'center',
      fontSize: '12px',
      color: '#64748b',
      marginTop: '16px'
    },
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px',
      zIndex: 1000,
      animation: 'fadeIn 0.3s ease-out'
    },
    modalContent: {
      background: 'white',
      borderRadius: '16px',
      boxShadow: '0 20px 25px rgba(0,0,0,0.15)',
      maxWidth: '448px',
      width: '100%',
      padding: '32px',
      animation: 'scaleIn 0.3s ease-out'
    },
    modalCenter: {
      textAlign: 'center'
    },
    successIconWrapper: {
      margin: '0 auto 24px',
      width: '80px',
      height: '80px',
      background: 'linear-gradient(to bottom right, #4ade80, #22c55e)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      animation: 'checkPop 0.5s ease-out'
    },
    successTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#1e293b',
      marginBottom: '8px'
    },
    successText: {
      color: '#64748b',
      marginBottom: '8px'
    },
    otpDisplay: {
      background: '#f0fdf4',
      border: '1px solid #bbf7d0',
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '24px'
    },
    otpCode: {
      fontSize: '14px',
      color: '#166534',
      fontWeight: '500',
      margin: '0 0 4px 0'
    },
    otpVerified: {
      fontSize: '12px',
      color: '#16a34a',
      margin: 0
    },
    spinner: {
      display: 'inline-block',
      width: '20px',
      height: '20px',
      marginRight: '8px',
      animation: 'spin 1s linear infinite'
    }
  };

  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes scaleIn {
            from { transform: scale(0.9); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
          @keyframes checkPop {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.2); }
          }
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>

      {/* Product List Screen */}
      {screen === 'list' && (
        <div style={styles.listWrapper}>
          <div style={styles.header}>
            <div style={styles.logoContainer}>
              <ShoppingCart size={40} color="#f97316" />
              <h1 style={styles.logo}>amazon</h1>
            </div>
          </div>

          <div style={styles.listHeader}>
            <h2 style={styles.listTitle}>Delivery Verification</h2>
            <p style={styles.listSubtitle}>
              Select an order to verify delivery with OTP
            </p>
          </div>

          <button
            style={styles.scannerButton}
            onClick={handleOpenScanner}
            onMouseEnter={(e) => {
              e.target.style.background = 'linear-gradient(to right, #2563eb, #1d4ed8)';
              e.target.style.boxShadow = '0 6px 8px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'linear-gradient(to right, #3b82f6, #2563eb)';
              e.target.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
            }}
          >
            <QrCode size={24} />
            Scan QR Code
          </button>

          <div style={styles.productList}>
            {products.map(product => (
              <div
                key={product.id}
                style={product.verified ? {...styles.productCard, ...styles.productCardVerified} : styles.productCard}
                onClick={() => !product.verified && handleProductSelect(product)}
                onMouseEnter={(e) => {
                  if (!product.verified) {
                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!product.verified) {
                    e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }
                }}
              >
                <div style={styles.productInfo}>
                  <h3 style={styles.customerName}>{product.customerName}</h3>
                  <p style={styles.customerAddress}>{product.address}</p>
                  <p style={styles.productOrderId}>
                    Order ID: {product.orderId}
                    <span style={styles.quantityBadge}>{product.quantity} {product.quantity === 1 ? 'item' : 'items'}</span>
                  </p>
                </div>
                {product.verified && (
                  <div style={styles.verifiedBadge}>
                    <Check size={16} />
                    Verified
                  </div>
                )}
              </div>
            ))}
          </div>

          <p style={styles.footer}>Secure verification powered by Amazon</p>
        </div>
      )}

      {/* OTP Screen */}
      {screen === 'otp' && selectedProduct && (
        <div style={styles.wrapper}>
          {/* Header */}
          <div style={styles.header}>
            <button
              style={styles.backButton}
              onClick={handleBackToList}
            >
              <ArrowLeft size={20} />
              Back to Orders
            </button>
            <div style={styles.logoContainer}>
              <ShoppingCart size={40} color="#f97316" />
              <h1 style={styles.logo}>amazon</h1>
            </div>
            <div style={styles.infoCard}>
              <div style={styles.packageIconWrapper}>
                <Package size={64} color="#f97316" />
              </div>
              <h2 style={styles.title}>Verify Your Order</h2>
              <p style={styles.subtitle}>
                Enter the 6-digit verification code for delivery to
              </p>
              <div style={styles.customerInfoBox}>
                <p style={{...styles.customerName, margin: '0 0 8px 0'}}>{selectedProduct.customerName}</p>
                <p style={{...styles.customerAddress, margin: '0 0 8px 0'}}>{selectedProduct.address}</p>
                <p style={{...styles.productOrderId, margin: 0}}>Order ID: {selectedProduct.orderId}</p>
              </div>
              
              {/* Items Box */}
              <div style={styles.itemsBox}>
                <p style={{...styles.boxTitle, color: '#c2410c'}}>
                  <Package size={16} />
                  Items in this order ({selectedProduct.quantity})
                </p>
                <ul style={styles.itemsList}>
                  {selectedProduct.items.map((item, index) => (
                    <li key={index} style={styles.itemsListItem}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Payment Box */}
              <div style={selectedProduct.paymentStatus === 'Prepaid' ? styles.paymentBox : styles.paymentBoxCOD}>
                <p style={{...styles.boxTitle, color: selectedProduct.paymentStatus === 'Prepaid' ? '#166534' : '#92400e'}}>
                  💳 Payment Details
                </p>
                <div style={styles.paymentRow}>
                  <span style={styles.paymentLabel}>Payment Method:</span>
                  <span style={styles.paymentValue}>{selectedProduct.paymentMethod}</span>
                </div>
                <div style={styles.paymentRow}>
                  <span style={styles.paymentLabel}>Payment Status:</span>
                  <span style={selectedProduct.paymentStatus === 'Prepaid' ? styles.paymentStatusPrepaid : styles.paymentStatusCOD}>
                    {selectedProduct.paymentStatus}
                  </span>
                </div>
                <div style={styles.paymentAmount}>
                  Total: {selectedProduct.amount}
                </div>
              </div>
            </div>
          </div>

          {/* OTP Input Card */}
          <div style={styles.otpCard}>
            <div style={styles.otpInputContainer}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={el => inputRefs.current[index] = el}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#fb923c';
                    e.target.style.boxShadow = '0 0 0 3px rgba(251, 146, 60, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#cbd5e1';
                    e.target.style.boxShadow = 'none';
                  }}
                  style={styles.otpInput}
                />
              ))}
            </div>

            <button
              onClick={handleVerify}
              disabled={!isOtpComplete || isVerifying}
              style={isOtpComplete && !isVerifying ? styles.buttonActive : styles.buttonDisabled}
              onMouseEnter={(e) => {
                if (isOtpComplete && !isVerifying) {
                  e.target.style.background = 'linear-gradient(to right, #f97316, #ea580c)';
                  e.target.style.boxShadow = '0 6px 8px rgba(0,0,0,0.15)';
                }
              }}
              onMouseLeave={(e) => {
                if (isOtpComplete && !isVerifying) {
                  e.target.style.background = 'linear-gradient(to right, #fb923c, #f97316)';
                  e.target.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                }
              }}
            >
              {isVerifying ? (
                <span style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <svg style={styles.spinner} viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.25" />
                    <path fill="currentColor" opacity="0.75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Verifying...
                </span>
              ) : (
                'Verify & Confirm Delivery'
              )}
            </button>

            <div style={styles.resendContainer}>
              <button style={styles.resendButton}>Resend Code</button>
            </div>
          </div>

          <p style={styles.footer}>Secure verification powered by Amazon</p>
        </div>
      )}

      {/* QR Scanner Screen */}
      {screen === 'scanner' && (
        <div style={styles.wrapper}>
          <div style={styles.scannerContainer}>
            <div style={styles.scannerHeader}>
              <h3 style={styles.scannerTitle}>Scan QR Code</h3>
              <button
                style={styles.closeButton}
                onClick={handleCloseScanner}
              >
                <X size={24} />
              </button>
            </div>
            
            <div style={styles.videoContainer}>
              <video
                ref={videoRef}
                style={styles.video}
                autoPlay
                playsInline
              />
              <canvas ref={canvasRef} style={{display: 'none'}} />
              <div style={styles.scannerOverlay}></div>
              
              {/* Scan Success Popup */}
              {showScanSuccess && (
                <div style={styles.scanSuccessPopup}>
                  <div style={styles.scanSuccessIcon}>
                    <Check size={32} color="white" />
                  </div>
                  <p style={styles.scanSuccessText}>QR Code Scanned!</p>
                  <p style={styles.scanSuccessSubtext}>Loading order details...</p>
                </div>
              )}
            </div>
            
            <p style={styles.scannerText}>
              Position the QR code within the frame to scan
            </p>
            <p style={{...styles.scannerText, fontSize: '12px', marginTop: '8px', color: '#94a3b8'}}>
              Demo: Will auto-select order in 2 seconds
            </p>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccess && selectedProduct && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <div style={styles.modalCenter}>
              <div style={styles.successIconWrapper}>
                <Check size={48} color="white" />
              </div>
              
              <h3 style={styles.successTitle}>Order Delivered Successfully!</h3>
              
              <p style={styles.successText}>
                Delivery confirmed for
              </p>
              
              <div style={{...styles.customerInfoBox, marginBottom: '16px'}}>
                <p style={{...styles.customerName, margin: '0 0 8px 0', fontSize: '16px'}}>{selectedProduct.customerName}</p>
                <p style={{...styles.customerAddress, margin: '0 0 8px 0', fontSize: '13px'}}>{selectedProduct.address}</p>
                <p style={{...styles.productOrderId, margin: 0}}>Order ID: {selectedProduct.orderId}</p>
              </div>
              
              <div style={styles.otpDisplay}>
                <p style={styles.otpCode}>OTP: {otp.join('')}</p>
                <p style={styles.otpVerified}>Verified successfully ✓</p>
              </div>

              <button
                onClick={handleCloseSuccess}
                style={styles.buttonActive}
                onMouseEnter={(e) => {
                  e.target.style.background = 'linear-gradient(to right, #f97316, #ea580c)';
                  e.target.style.boxShadow = '0 6px 8px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'linear-gradient(to right, #fb923c, #f97316)';
                  e.target.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                }}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}