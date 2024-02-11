import { useNavigate } from 'react-router-dom';
import HeroAnimated from './heroAnimated';
import { useState } from 'react';

function Hero() {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleSend = () => {
    if (selectedOption) {
      // navigate(`/login/${selectedOption}`);
      navigate('/login');
    }
  };
  return (
    <div className="bg-[#072723] h-screen lg:h-full lg:pb-[68px] w-full">
      <div className="max-content">
        <div className="container">
          <div className="flex items-end justify-between mdxl:flex-col gap-[78px] lg:gap-[30px]">
            <div className="max-w-[654px]">
              <p className="text-[80px] lg:text-[65px] lg:leading-[85px] mdxl:text-[50px] xlsm:text-[45px] mdxl:leading-[63px] font-playfair leading-[100px] font-[700] text-[#ffffff]">
                Unlock the Power of Traceability{' '}
              </p>
              <p className="text-[24px] leading-[30px] mdxl:text-[16px] mdxl:leading-[24px] font-[400] text-[#ffffff]">
                with our Innovative Software Solution.{' '}
              </p>
              <div className="flex items-center mt-[62px] mdxl:mt-[40px] xlsm:flex-col xlsm:gap-[10px]">
                <div className="xlsm:w-full">
                  <select
                    value={selectedOption}
                    onChange={e => setSelectedOption(e.target.value)}
                    className=" border-none cursor-pointer rounded-[10px] rounded-tr-[0px] rounded-br-[0px] pr-[12px] py-[20px] pl-[40px] w-[405px] lg:w-[340px] h-[67px] mdxl:h-[45px] xlsm:w-full xlsm:rounded-[12px] mdxl:py-[10px] mdxl:text-[14px] focus:outline-none focus:border-none"
                  >
                    <option value="">Select user type</option>
                    <option value="/">Farmer</option>
                    <option value="/">Aggregator</option>
                    <option value="/">Trader</option>
                  </select>
                </div>
                <button
                  onClick={handleSend}
                  className="px-[40px] py-[20px] h-[67px] mdxl:h-[45px] xlsm:w-full mdxl:py-[10px] bg-[#6AD871] text-[#072723] font-[600] text-[18px] mdxl:text-[14px] leading-[25px] text-center rounded-tl-[0px] rounded-tr-[12px] rounded-br-[12px] xlsm:rounded-[12px] rounded-bl-[0px] border-none focus:outline-none "
                >
                  Get Started
                </button>
              </div>
            </div>
            <div className="w-[604px] h-[562px] mdxl:w-full mdxl:h-full">
              <HeroAnimated />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
