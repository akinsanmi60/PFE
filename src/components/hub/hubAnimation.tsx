import { hubData } from '@db/hubData';
import { useEffect, useState } from 'react';

function HubAnimation() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const imageData = hubData[currentIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % hubData?.length);
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="">
      <div
        className={`w-full py-[20px] px-[40px] text-primary-white flex items-center justify-between rounded-[8px] font-primary`}
        style={{ backgroundColor: imageData?.theme }}
      >
        <div className="w-[700px] lg:w-[580px]">
          <p className="font-[500] text-[16px] leading-[22px]">
            {imageData?.smallText}
          </p>
          <p className="font-[500] text-[26px] leading-[32px] lg:text-[24px] lg:leading-[32px] mt-[16px]">
            {imageData?.bigText}
          </p>
          <div className="mt-[11px] flex items-center gap-[4px]">
            {hubData?.map((_item, i) => (
              <p
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-[6px] h-[6px] rounded-full ${
                  i === currentIndex ? 'bg-primary-white' : 'bg-[#F2F2F280]'
                }`}
              ></p>
            ))}
          </div>
        </div>
        <div>
          <img
            src={imageData?.img}
            alt=""
            className="w-[281px] h-[200px] object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default HubAnimation;
