import rightArrow from '@assets/svg/rightArrow.svg';
import { useNavigate } from 'react-router-dom';
import logoIcon from '@assets/svg/logoIcon.svg';
function AccessCard() {
  const navigate = useNavigate();
  return (
    <div className="max-content py-[64px]">
      <div className="container">
        <div className="bg-[#072723] border-[8px] border-[#6AD871] py-[60px] px-[40px] rounded-[20px] w-full flex items-center gap-[48px] xlsm:flex-col-reverse">
          <div>
            <p className="font-[700] font-playfair text-[64px] leading-[80px] lg:text-[50px] lg:leading-[63px] mdxl:text-[36px] mdxl:leading-[45px] xlsm:text-[28px] xlsm:leading-[36px] text-[#FFFFFF] max-w-[972px]">
              Lorem ipsum dolor sit amet consectetur. Mauris velit sit eleifend
              faucibus urna in id{' '}
            </p>
            <button
              onClick={() => navigate('/login')}
              className="mt-[20px] cursor-pointer flex items-center gap-[10px] bg-[#6AD871] border-[2px] border-[#072723] rounded-[40px] py-[20px] px-[48px] xlsm:py-[12px] xlsm:px-[24px]"
            >
              <p className="font-[600] text-[16px] leading-[20px] text-[#072723] ">
                Get Access
              </p>
              <img src={rightArrow} alt="arrow" className="w-[16px] h-[16px]" />
            </button>
          </div>
          <div>
            <img
              src={logoIcon}
              alt="arrow"
              className="w-[240px] h-[240px] xlsm:w-[150px] xlsm:h-[150px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccessCard;
