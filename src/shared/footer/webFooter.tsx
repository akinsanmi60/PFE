import { getYear } from '@utils/constants';
import logo from '../../assets/svg/logoWhite.svg';
import facebook from '../../assets/svg/facebook.svg';
import instagram from '../../assets/svg/instagram.svg';
import twitter from '../../assets/svg/twitter.svg';
function Footer() {
  return (
    <footer className="w-full bg-[var(--dark-primary)] text-white py-[50px] ">
      <div className="max-content">
        <div className="container">
          <div className="">
            <div className="flex justify-between items-center">
              <div>
                <img src={logo} alt="logo" className="w-[182px] h-[50px]" />
              </div>
              <div className="flex gap-[24px] items-center">
                <div className="bg-[#ffffff] rounded-full h-[32px] w-[32px] flex justify-center items-center">
                  <img
                    src={facebook}
                    alt="logo"
                    className="w-[12px] h-[12px]"
                  />
                </div>
                <div className="bg-[#ffffff] rounded-full h-[32px] w-[32px] flex justify-center items-center">
                  <img
                    src={instagram}
                    alt="logo"
                    className="w-[12px] h-[12px]"
                  />
                </div>
                <div className="bg-[#ffffff] rounded-full h-[32px] w-[32px] flex justify-center items-center">
                  <img src={twitter} alt="logo" className="w-[12px] h-[12px]" />
                </div>
              </div>
            </div>
            <p className="text-center font-[400] text-[16px] leading-[29px] mt-[26px]">
              {getYear()} @ Pentrar
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
