import farmerNetwork from '@assets/png/farmerNetworkImg.png';
import CustomButton from '@shared/Button';
function FarmerNetwork() {
  return (
    <div className="max-content py-[32px]">
      <div className="container">
        <div className="flex gap-[40px] mdxl:flex-col mdxl:items-center">
          <div>
            <img
              src={farmerNetwork}
              alt=""
              className="w-[758px] h-[654px] mdxl:w-full xlsm:h-[450px] rounded-[12px]"
            />
          </div>
          <div className="max-w-[546px] h-[654px] rounded-[12px] bg-background-dark p-[32px] flex flex-col justify-between">
            <div className="text-[#ffffff] max-w-[442px]">
              <p className="font-[700] text-[38px] leading-[48px] xlsm:text-[30px] xlsm:leading-[38px] font-playfair">
                Find a great network to sell produce for export.
              </p>
              <p className="mt-[20px] font-[400] text-[20px] leading-[28px] xlsm:text-[16px] xlsm:leading-[24px]">
                In the realm of agricultural exports, finding the right network
                can make all the difference. Pentar offers farmers a gateway to
                a vast ecosystem of buyers, importers, and distributors,
                facilitating seamless connections and unlocking new
                opportunities for growth.
              </p>
            </div>
            <div className="max-w-[442px] pt-[24px] border-t-[1px] border-[#FFFFFF80]">
              <div className="flex gap-[24px] text-[#ffffff]">
                <p className="font-[500] text-[14px] leading-[20px]">
                  Access to invaluable market insights, trends, and demand
                  forecasts{' '}
                </p>
                <p className="font-[500] text-[14px] leading-[20px]">
                  Empowerment to make informed decisions about what and where to
                  sell{' '}
                </p>
              </div>
              <div className="flex gap-[20px] mt-[32px] items-center xlsm:flex-col xlsm:items-start">
                <CustomButton
                  //   onClick={() => navigate('/login')}
                  className="rounded-[40px] xlsm:w-full py-[12px] px-[24px] text-[16px] leading-[22px] font-[500] text-primary-main bg-primary-white  border-[1px] border-primary-white "
                >
                  Get Started
                </CustomButton>
                <CustomButton className="rounded-[40px] xlsm:w-full py-[12px] px-[24px] text-[16px] leading-[22px] font-[500] text-primary-white border-[1px] border-secondary-light-1 ">
                  Learn More{' '}
                </CustomButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FarmerNetwork;
