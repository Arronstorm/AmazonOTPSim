// Audio utility functions for app sounds

export const playBeepSound = () => {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.frequency.value = 1000;
  oscillator.type = 'square';

  gainNode.gain.setValueAtTime(1, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.3);
};

export const playSuccessSound = () => {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();

  // First tone (higher)
  const oscillator1 = audioContext.createOscillator();
  const gainNode1 = audioContext.createGain();
  oscillator1.connect(gainNode1);
  gainNode1.connect(audioContext.destination);
  oscillator1.frequency.value = 800;
  oscillator1.type = 'square';
  gainNode1.gain.setValueAtTime(1, audioContext.currentTime);
  gainNode1.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
  oscillator1.start(audioContext.currentTime);
  oscillator1.stop(audioContext.currentTime + 0.3);

  // Second tone (lower, delayed)
  const oscillator2 = audioContext.createOscillator();
  const gainNode2 = audioContext.createGain();
  oscillator2.connect(gainNode2);
  gainNode2.connect(audioContext.destination);
  oscillator2.frequency.value = 1000;
  oscillator2.type = 'square';
  gainNode2.gain.setValueAtTime(1, audioContext.currentTime + 0.2);
  gainNode2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
  oscillator2.start(audioContext.currentTime + 0.2);
  oscillator2.stop(audioContext.currentTime + 0.5);
};
