import { getYear } from '@utils/constants';
import logo from '@assets/svg/logoWhite.svg';
import facebook from '@assets/svg/facebook.svg';
import instagram from '@assets/svg/instagram.svg';
import twitter from '@assets/svg/twitter.svg';
import { useNavigate } from 'react-router-dom';
import { authPaths } from '@utils/paths';

const socialLinks = [
  {
    title: 'Facebook',
    link: 'https://www.facebook.com/',
    icon: facebook,
  },
  {
    title: 'Instagram',
    link: 'https://www.instagram.com/',
    icon: instagram,
  },
  {
    title: 'Twitter',
    link: 'https://www.twitter.com/',
    icon: twitter,
  },
];
function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="w-full bg-[var(--dark-primary)] bg-[url('/src/assets/png/pentrarHeroBg.png')] bg-repeat bg-cover text-primary-white  pt-[23px] pb-[20px] ">
      <div className="max-content">
        <div className="container">
          <div className="flex justify-between items-center">
            <div>
              <img src={logo} alt="logo" className="w-[182px] h-[50px]" />
            </div>
            <div className="flex gap-[24px] items-center">
              {socialLinks.map((link, index) => (
                <a key={index} href={link?.link} target="_blank">
                  <div className="bg-[#ffffff] rounded-full h-[32px] w-[32px] flex justify-center items-center">
                    <img
                      src={link?.icon}
                      alt="logo"
                      className="w-[12px] h-[12px]"
                    />
                  </div>
                </a>
              ))}
            </div>
          </div>
          <p className="text-center font-[400] text-[14px] leading-[29px] mt-[15px]">
            Copyright{' '}
            <span
              className="cursor-pointer"
              onClick={() => navigate(authPaths.adminLogin())}
            >
              Pentrar
            </span>{' '}
            &copy; {getYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
