import { useEffect, useRef, useState } from 'react';

export const useVideoController = () => {
  const [isPaused, setIsPaused] = useState(true);
  const [showIcon, setShowIcon] = useState(true);
  const videoRef = useRef<null | HTMLVideoElement>(null);
  const controllerRef = useRef<null | HTMLDivElement>(null);

  const startOrStop = async () => {
    if (videoRef.current?.paused) {
      await videoRef.current.play();
      setIsPaused(false);
    } else {
      videoRef.current?.pause();
      setIsPaused(true);
    }
  };

  /* Adding an event listener to the video element. to detect video completed to change state IsPaused to true to change play-pause icon */
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('ended', () => {
        setIsPaused(true);
      });
    }
  }, []);

  const mouseOutVideo = () => {
    if (!isPaused) {
      setTimeout(() => {
        setShowIcon(false);
      }, 1000);
    } else {
      setShowIcon(true);
    }
  };
  const mouseInVideo = () => {
    setShowIcon(true);
  };

  return {
    showIcon,
    isPaused,
    videoRef,
    controllerRef,
    startOrStop,
    mouseOutVideo,
    mouseInVideo,
  };
};
