import { insightData } from '@db/insightData';
import CustomButton from '@shared/Button';

function Insight() {
  return (
    <div className="bg-gray-100 mt-[100px] py-[100px]">
      <div className="max-content">
        <div className="container">
          <div className="flex flex-col items-center">
            <div className="max-w-[643px]">
              <p className="font-[700] text-center font-playfair text-[40px]  leading-[48px] xlsm:text-[32px] xlsm:leading-[38px]  text-primary-main">
                Insights & Announcement
              </p>
              <p className="mt-[16px] font-[400] text-center font-primary text-[16px] leading-[24px] xlsm:text-[14px] xlsm:leading-[21px] text-primary-light">
                We offer a myriad of services that empower your export journey
                with a traceable supply chain, surpass regulatory requirements,
                and unleash efficiency!
              </p>
              <div className=" flex justify-center">
                <CustomButton className=" mt-[32px] font-[500] font-primary text-[14px] leading-[20px] text-primary-white bg-secondary-light-1">
                  Explore all articles
                </CustomButton>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-[48px] gap-[24px] flex lg:flex-wrap justify-center">
          {insightData?.slice(0, 3)?.map((item, i) => (
            <div
              key={i}
              className="rounded-[8px] w-[357px] bg-primary-white overflow-hidden"
            >
              <img
                src={item?.img}
                alt="image"
                className="w-[357px] h-[200px] transition duration-300 transform hover:scale-110 object-cover object-top"
              />
              <div className="p-[24px]">
                <p className="font-[500] font-primary text-[14px] leading-[21px] xlsm:text-[12px] xlsm:leading-[18px] text-primary-light">
                  {item?.type.toUpperCase()}
                </p>
                <p
                  // onClick={() => router.push(`/blog/${item?.title}`)}
                  className="mt-[8px] font-[700] font-primary line-clamp-2 text-[24px] leading-[31px] xlsm:text-[20px] xlsm:leading-[26px] text-primary-main hover:underline cursor-pointer"
                >
                  {item?.title}
                </p>

                <p className="mt-[16px] font-[300] font-primary text-[16px] line-clamp-4 leading-[24px] xlsm:text-[14px] xlsm:leading-[21px] text-primary-light">
                  {item?.textBlockA?.slice(0, 1)?.map((item: any) => (
                    <p key={item}>{item?.paragraph}</p>
                  ))}{' '}
                </p>
                <CustomButton
                  // onClick={() => router.push(`/blog/${item?.title}`)}
                  className=" mt-[32px] font-[500] font-primary text-[14px] leading-[20px] text-primary-white bg-secondary-light-1"
                >
                  Learn more
                </CustomButton>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Insight;
