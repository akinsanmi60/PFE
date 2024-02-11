import { servicesData } from '@db/servicesData';
import { useNavigate } from 'react-router-dom';

function ServiceCards() {
  const navigate = useNavigate();
  return (
    <div className="max-content py-[50px]">
      <div className="container">
        <div>
          {servicesData?.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-[39px] mdxl:flex-col even:flex-row-reverse mdxl:even:flex-col py-[80px] mdxl:py-[40px]"
            >
              <img
                src={item?.img}
                alt="service"
                className="w-[630px] h-[600px] lg:w-[500px] lg:h-[500px] mdxl:w-full xlsm:h-[400px] rounded-[12px] object-cover"
              />
              <div className="">
                <p className="font-[600] text-[#2AA232] text-[20px] leading-[28px] xlsm:text-[16px] xlsm:leading-[22px]">
                  {item?.smallText}
                </p>
                <p className="font-[700] font-playfair mt-[20px] text-[#072723] text-[64px] leading-[80px] mdxl:text-[50px] mdxl:leading-[63px] xlsm:text-[45px] xlsm:leading-[50px]">
                  {item?.title}
                </p>
                <p className="font-[400] mt-[20px] text-[#333333] text-[19px] leading-[28px] mdxl:text-[16px] mdxl:leading-[24px] xlsm:text-[14px] xlsm:leading-[20px]">
                  {item?.subTitle}
                </p>
                <button
                  onClick={() => navigate('/login')}
                  className="mt-[20px] bg-[#2AA232] text-[#FFFFFF] rounded-[40px] px-[40px] py-[21px] mdxl:px-[30px] mdxl:py-[16px] xlsm:px-[20px] xlsm:py-[12px] font-[600] text-[16px] xlsm:text-[14px] leading-[22px] text-center"
                >
                  {item?.btnText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ServiceCards;
