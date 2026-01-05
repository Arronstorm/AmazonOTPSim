import { useRef, useCallback } from 'react';
import jsQR from 'jsqr';

export default function useCamera() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const scanningRef = useRef(false);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        videoRef.current.play();
      }
      return stream;
    } catch (err) {
      console.error('Error accessing camera:', err);
      alert('Unable to access camera. Please allow camera permissions.');
      throw err;
    }
  };

  const stopCamera = () => {
    scanningRef.current = false;
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  const scanQRCode = useCallback((onScanSuccess) => {
    scanningRef.current = true;

    const tick = () => {
      if (!scanningRef.current || !videoRef.current || !canvasRef.current) {
        return;
      }

      const video = videoRef.current;
      const canvas = canvasRef.current;

      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        const context = canvas.getContext('2d');
        canvas.height = video.videoHeight;
        canvas.width = video.videoWidth;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: 'dontInvert',
        });

        if (code) {
          scanningRef.current = false;
          onScanSuccess(code.data);
          return;
        }
      }

      requestAnimationFrame(tick);
    };

    tick();
  }, []);

  return {
    videoRef,
    canvasRef,
    streamRef,
    startCamera,
    stopCamera,
    scanQRCode
  };
}
