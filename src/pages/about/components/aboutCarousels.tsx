import { aboutData } from '@db/aboutData';

function AboutCarousels() {
  return (
    <div className="max-content">
      <div className="container">
        <div className="">
          <div>
            <p className="font-[700] text-[64px] mdxl:text-[50px] mdxl:leading-[63px] leading-[80px] font-playfair text-[#1A1A1A]">
              {aboutData?.title}
            </p>
            <p className="mt-[8px] max-w-[916px] font-[400] text-[20px] leading-[28px] mdxl:text-[16px] mdxl:leading-[24px] text-[#333333]">
              {aboutData?.description}
            </p>
          </div>
          <div className="mt-[48px] grid grid-cols-2 gap-[24px] mdxl:flex mdxl:flex-wrap">
            {aboutData?.aboutArray?.map((item, index) => (
              <div
                key={index}
                className="border-[1px] border-[#A9EFE7] rounded-[20px] p-[24px] max-w-[658px] mdxl:w-[450px]"
              >
                <div className="bg-[#E9FBF9] rounded-[50%] h-[128px] w-[128px] xlsm:w-[60px] xlsm:h-[60px] flex items-center justify-center">
                  <img
                    src={item?.icon}
                    alt="icon"
                    className="w-[80px] h-[80px] xlsm:h-[40px] xlsm:w-[40px]"
                  />
                </div>
                <div className="mt-[48px] xlsm:mt-[24px]">
                  <p className="text-[#072723] font-playfair font-[700] text-[48px] leading-[60px] xlsm:text-[32px] xlsm:leading-[40px]">
                    {item?.title}
                  </p>
                  <p className="text-[#333333] font-primary font-[400] text-[20px] leading-[28px] xlsm:text-[16px] xlsm:leading-[24px]">
                    {item?.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutCarousels;
