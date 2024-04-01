import { heroImageData } from '@db/heroImageData';
import { useEffect, useState } from 'react';
function HeroAnimated() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const imageData = heroImageData[currentIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % heroImageData?.length);
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className=" mdxl:pb-[40px]">
      <div className="absolute mdxl:hidden xxlA:h-screen">
        <img
          src={imageData?.img}
          alt=""
          className="w-[604px] h-[562px] xxlA:h-screen xxlA:w-screen xxlA:object-cover xxlA:object-left realtive rounded-[4px]"
        />
        <div className="absolute bottom-[16px] right-[12px]">
          <div className="bg-[#FFFFFFBF]  rounded-[4px] p-[8px] min-w-[253px] border-[1px] border-[linear-gradient(103.24deg, rgba(189, 183, 183, 0.78) 40.47%, rgba(0, 0, 0, 0) 77.6%)]">
            <p className="font-[600] font-primary text-[#1A1A1A] text-[18px] leading-[25px]">
              {imageData?.name}
            </p>
            <p className="font-[500] font-primary text-[#333333] text-[12px] leading-[17px]">
              {imageData?.title}
            </p>
          </div>
          <div className="mt-[11px] flex items-center gap-[4px]">
            {heroImageData?.map((_item, i) => (
              <p
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-[18px] h-[5px] rounded-[24px] ${
                  i === currentIndex ? 'bg-primary-white' : 'bg-[#FFFFFF80]'
                }`}
              ></p>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile */}

      <div className=" mdxl:block hidden relative">
        <img
          src={imageData?.img}
          alt=""
          className="w-full h-[562px] xlsm:h-[468px]  rounded-[4px]"
        />
        <div className="absolute bottom-[16px] right-[8px]">
          <div className="bg-[#FFFFFFBF]  rounded-[4px] p-[8px] min-w-[253px] border-[1px] border-[linear-gradient(103.24deg, rgba(189, 183, 183, 0.78) 40.47%, rgba(0, 0, 0, 0) 77.6%)]">
            <p className="font-[600] font-primary text-[#1A1A1A] text-[18px] leading-[25px]">
              {imageData?.name}
            </p>
            <p className="font-[500] font-primary text-[#333333] text-[12px] leading-[17px]">
              {imageData?.title}
            </p>
          </div>
          <div className="mt-[11px] flex items-center gap-[4px]">
            {heroImageData?.map((_item, i) => (
              <p
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-[18px] h-[5px] rounded-[24px] ${
                  i === currentIndex ? 'bg-primary-white' : 'bg-[#FFFFFF80]'
                }`}
              ></p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroAnimated;
