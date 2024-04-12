import { useEffect, useState } from 'react';

function VerifyCountDown() {
  const [countdown, setCountdown] = useState(160);

  useEffect(() => {
    // Countdown logic
    const timer = setInterval(() => {
      setCountdown(prevCountdown => {
        if (prevCountdown === 0) {
          clearInterval(timer);
          return 0;
        }
        return prevCountdown - 1;
      });
    }, 1000);

    // Cleanup function
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      setCountdown(120);
    }
  }, [countdown]);

  // Remaining time in MM:SS format
  const remainingTime = `${Math.floor(countdown / 60)
    .toString()
    .padStart(2, '0')}:${(countdown % 60).toString().padStart(2, '0')}`;

  return (
    <div>
      <p className="text-[14px] leading-[22px] tracking-normal mt-[40px]  text-center font-[500]">
        Resend code in {remainingTime}
      </p>
    </div>
  );
}

export default VerifyCountDown;
