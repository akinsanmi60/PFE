import CustomButton from '@shared/Button';
import { authPaths } from '@utils/paths';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginButton() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const divRef = useRef<HTMLDivElement | null>(null);

  const handleOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const handler = (e: { target: EventTarget | null }) => {
      if (divRef.current && !divRef.current.contains(e.target as HTMLElement)) {
        setOpen(false);
      }
    };

    window.addEventListener('click', handler);
    return () => {
      window.removeEventListener('click', handler);
    };
  }, []);

  const loginPaths = [
    {
      path: authPaths.login(false, 'agency-login', 'admin'),
      title: 'Agency',
    },
    {
      path: authPaths.login(false, 'farmer', 'login'),
      title: 'Farmer',
    },
    {
      path: authPaths.login(false, 'aggregator', 'login'),
      title: 'Aggregator',
    },
    {
      path: authPaths.login(false, 'login', 'exporter'),
      title: 'Exporter',
    },
    {
      path: authPaths.login(false, 'login', 'offtaker'),
      title: 'Offtaker',
    },
  ];

  return (
    <div className="" ref={divRef}>
      <CustomButton
        onClick={handleOpen}
        // onClick={() => navigate(`${authPaths.login()}`)}
        className="py-[12px] w-[110px] px-[40px] text-[16px] relative leading-[22px] font-[600] text-[#ffffff]"
      >
        Login
      </CustomButton>

      {open && (
        <div className="absolute top-[70px] h-[80px] w-[110px] overflow-hidden scrollbar-none overflow-y-auto rounded-[8px] shadow-md bg-primary-white py-[4px] px-[10px]">
          {loginPaths.map((link, index) => (
            <p
              key={index}
              onClick={() => navigate(`${link.path}`)}
              className="text-primary-main text-[12px] leading-[21px] font-[300] cursor-pointer hover:text-secondary-light-1 hover:font-[500]"
            >
              {link?.title}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default LoginButton;
