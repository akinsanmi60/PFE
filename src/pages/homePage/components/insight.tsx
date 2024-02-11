import { insightData } from '@db/insightData';

function Insight() {
  return (
    <div className="max-content py-[50px]">
      <div className="container">
        <p className="font-[700] font-playfair text-[64px] leading-[80px] xlsm:text-[45px] xlsm:leading-[60px]">
          Insight and announcement
        </p>
        <div className="mt-[48px] flex gap-[20px] lg:flex-wrap">
          {insightData?.map((item, index) => (
            <div key={index} className="w-[434px] p-[12px] pb-[24px]">
              <img
                src={item?.img}
                alt="image"
                className="h-[186px] w-full rounded-[8px] object-cover"
              />
              <div className="mt-[20px]">
                <p className="font-[500] text-primary-main text-[24px] leading-[30px]">
                  {item?.title}
                </p>
                <p className="mt-[12px] font-[400] text-[15px] leading-[22px] text-primary-lighter">
                  {item?.subTitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Insight;
