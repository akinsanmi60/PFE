import { useNavigate } from 'react-router-dom';
import { navLinks } from '@db/headerData';
import { useState } from 'react';
import logo from '@assets/svg/logo.svg';
import menuOpen from '@assets/svg/menuOpen.svg';
import menuClose from '@assets/svg/menuCLose.svg';
import CustomButton from '@shared/Button';
import { useDetailContext } from '@contexts/saveDetailContext';
import { authPaths, webPaths } from '@utils/paths';
import { useAuthContext } from '@contexts/authContext';
import LoginButton from './loginButton';

function Header() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { saveDetails } = useDetailContext();
  const { authUser } = useAuthContext();

  const handleNavigate = (path: string) => {
    setOpen(false);
    navigate(path);
  };

  return (
    <div className="bg-background-main sticky top-0 z-50 bg-[url('/src/assets/png/pentrarHeroBg.png')] bg-repeat bg-cover">
      <nav className="w-full transition-colors duration-500 py-[20px]  border-0">
        <div className="max-content">
          <div className="container">
            <div className="flex items-center justify-between cursor-pointer">
              <img
                onClick={() => navigate(`${webPaths.home()}`)}
                src={logo}
                alt="logo"
                className="w-[146px] h-[40px]"
              />
              <div className="flex gap-[35px] lg:gap-[20px] mdxl:hidden">
                {navLinks.map((link, index) => (
                  <p
                    key={index}
                    onClick={() => navigate(link.path)}
                    className="text-primary-white hover:text-secondary-light-1 text-[16px] leading-[24px] font-primary font-[500]"
                  >
                    {link?.title}
                  </p>
                ))}
              </div>
              {authUser !== null ? (
                <p
                  className=" text-primary-white"
                  onClick={() => navigate(`${saveDetails.url}`)}
                >
                  Dashboard
                </p>
              ) : (
                <div className="flex gap-[20px] items-center mdxl:hidden ">
                  <LoginButton />
                </div>
              )}
              <div className=" hidden mdxl:block">
                {open ? (
                  <img
                    onClick={() => setOpen(false)}
                    src={menuClose}
                    alt="logo"
                    className="w-[20px] h-[20px]"
                  />
                ) : (
                  <img
                    onClick={() => setOpen(!open)}
                    src={menuOpen}
                    alt="logo"
                    className="w-[30px] h-[30px]"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
      {open && (
        <div className="bg-white h-screen w-full pt-[20px] transition-transform transform">
          <div className="container">
            <div className="flex flex-col gap-[20px]">
              {navLinks.map((link, index) => (
                <p
                  key={index}
                  onClick={() => handleNavigate(link.path)}
                  className="text-primary-white text-[16px] leading-[24px] font-[500]"
                >
                  {link?.title}
                </p>
              ))}
            </div>
            <div className="flex gap-[20px] mt-[50px] items-center xlsm:flex-col xlsm:items-start">
              <CustomButton
                onClick={() =>
                  navigate(`${authPaths.login(false, 'login', 'farmer')}`)
                }
                className="rounded-[40px] xlsm:w-full py-[12px] px-[40px] text-[16px] leading-[22px] font-[600] text-primary-white border-[1px] border-background-main"
              >
                Login
              </CustomButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
