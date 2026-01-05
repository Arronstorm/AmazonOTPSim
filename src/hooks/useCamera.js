import { useRef } from 'react';

export default function useCamera() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

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
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  return {
    videoRef,
    canvasRef,
    streamRef,
    startCamera,
    stopCamera
  };
}
