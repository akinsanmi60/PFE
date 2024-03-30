import { useNavigate } from 'react-router-dom';
import HeroAnimated from './heroAnimated';
import { useState } from 'react';
import { allUserType } from '@db/heroImageData';
import Dropdown from '@shared/Select/uncontrolledSelect';
import { authPaths } from '@utils/paths';

function Hero() {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleSend = () => {
    navigate(
      `${authPaths.registerFarmerAggregator(
        false,
        'register-form',
        selectedOption.toLowerCase(),
      )}`,
    );
  };

  return (
    <div className="h-screen w-full bg-background-main mdxl:h-full">
      <div className="max-content">
        <div className="container">
          <div className="flex items-center justify-between mdxl:flex-col-reverse gap-[78px] lg:gap-[30px]">
            <div className="mdxl:w-full mb-[50px]">
              <p className="text-[80px] lg:text-[65px] lg:leading-[68px] mdxl:text-[47px] xlsm:text-[45px] mdxl:leading-[63px] font-playfair leading-[100px] font-[700] text-[#ffffff] xlsm:w-full w-[700px] tracking-normal">
                Unlock the Power of Traceability
              </p>
              <p className="text-[22px] leading-[30px] mdxl:text-[16px] xlsm:w-full mdxl:leading-[24px] font-[400] text-[#ffffff] w-[645px] sixm:w-[500px] mt-[10px]">
                Start your export journey with a traceable supply chain, surpass
                regulatory requirements, and unleash efficiency!{' '}
              </p>
              <div className="flex items-center mt-[62px] mdxl:mt-[40px] xlsm:flex-col xlsm:gap-[10px]">
                <div className="w-[70%] xlsm:w-full">
                  <Dropdown
                    dropDownArray={allUserType}
                    setSelectedOption={setSelectedOption}
                  />
                </div>
                <button
                  onClick={handleSend}
                  className="px-[40px] py-[20px] h-[67px] xlsm:w-full  mdxl:py-[10px] bg-secondary-light-1 text-primary-white font-[600] text-[18px] mdxl:text-[14px] leading-[25px] text-center rounded-tl-[0px] rounded-tr-[12px] rounded-br-[12px] xlsm:rounded-[12px] rounded-bl-[0px] border-none focus:outline-none"
                >
                  Get Started
                </button>{' '}
              </div>
            </div>
            <div className="w-[604px] h-[562px] mdxl:w-full mdxl:h-full xxlA:h-screen">
              <HeroAnimated />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
