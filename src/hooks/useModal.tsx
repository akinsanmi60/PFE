import { useState } from 'react';

function UseModal() {
  const [isShowing, setIsShowing] = useState(false);

  const toggle = () => {
    setIsShowing(!isShowing);
  };
  const closeModal = () => {
    setIsShowing(false);
  };
  const openModal = () => {
    setIsShowing(true);
  };

  return {
    isShowing,
    toggle,
    closeModal,
    openModal,
  };
}

export default UseModal;
