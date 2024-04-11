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
        className="py-[12px] w-[110px] px-[40px] text-[16px] relative leading-[22px] font-[600] text-[#ffffff]"
      >
        Login
      </CustomButton>

      {open && (
        <div className="absolute top-[70px] h-[180px] w-[150px] flex flex-col gap-[10px] odd:text-cancel-red-main rounded-[8px] shadow-md bg-primary-white  p-[10px]">
          <div className="flex flex-col gap-[10px]">
            {loginPaths.map((link, index) => (
              <p
                key={index}
                onClick={() => navigate(`${link.path}`)}
                className="text-primary-main text-[14px] leading-[21px] font-[400] cursor-pointer hover:text-secondary-light-1 hover:font-[500]"
              >
                {link?.title}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginButton;
