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

function Header() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { saveDetails } = useDetailContext();
  const { authUser } = useAuthContext();

  return (
    <div className="bg-background-main">
      <nav className="w-full transition-colors duration-500 py-[20px] bg-[#072723] border-0">
        <div className="max-content">
          <div className="container">
            <div className="flex items-center justify-between cursor-pointer">
              <img
                onClick={() => navigate(`${webPaths.home()}`)}
                src={logo}
                alt="logo"
                className="w-[146px] h-[40px]"
              />
              <div className="flex gap-[48px] lg:gap-[20px] mdxl:hidden">
                {navLinks.map((link, index) => (
                  <p
                    key={index}
                    onClick={() => navigate(link.path)}
                    className="text-[#fff] text-[16px] leading-[24px] font-[500]"
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
                  <CustomButton
                    onClick={() => navigate(`${authPaths.login()}`)}
                    className="py-[12px] w-[110px] px-[40px] text-[16px] leading-[22px] font-[600] text-[#ffffff]"
                  >
                    Login
                  </CustomButton>
                </div>
              )}
              <div className=" hidden mdxl:block">
                {open ? (
                  <img
                    onClick={() => setOpen(!open)}
                    src={menuClose}
                    alt="logo"
                    className="w-[30px] h-[30px]"
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
                  onClick={() => navigate(link.path)}
                  className="text-[#072723] text-[16px] leading-[24px] font-[500]"
                >
                  {link?.title}
                </p>
              ))}
            </div>
            <div className="flex gap-[20px] mt-[50px] items-center xlsm:flex-col xlsm:items-start">
              <button
                onClick={() => navigate(`${authPaths.login()}`)}
                className="rounded-[40px] xlsm:w-full py-[12px] px-[40px] text-[16px] leading-[22px] font-[600] text-[#072723] border-[1px] border-[#072723]"
              >
                Login
              </button>
              <button className="rounded-[40px] xlsm:w-full py-[12px] px-[40px] text-[16px] leading-[22px] font-[600] text-[#072723] border-[1px] border-[#6AD871] bg-[#6AD871]">
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
