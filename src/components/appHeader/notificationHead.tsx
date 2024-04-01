import { capitalize } from '@utils/constants';
import { useEffect, useRef, useState } from 'react';
import { ReactComponent as DashBell } from '@assets/svg/dashBell.svg';
import { ReactComponent as DashBellRed } from '@assets/svg/dashBellRed.svg';

function NotificationHead({
  availableNotification,
  first_name,
}: {
  availableNotification: boolean;
  first_name: string;
}) {
  const divRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const toggleIsOpen = () => {
    setIsHovered(!isHovered);
  };
  useEffect(() => {
    const handler = (e: { target: EventTarget | null }) => {
      if (divRef.current && !divRef.current.contains(e.target as HTMLElement)) {
        setIsHovered(false);
      }
    };

    window.addEventListener('click', handler);
    return () => {
      window.removeEventListener('click', handler);
    };
  }, []);
  return (
    <div>
      <div className="relative" onClick={toggleIsOpen} ref={divRef}>
        {availableNotification ? <DashBellRed /> : <DashBell />}

        {isHovered && (
          <div
            className="absolute top-5 -right-14 mt-[23px] cursor-pointer shadow-lg w-[300px] h-[300px] bg-primary-white z-50"
            //   ref={divRef}
          >
            <div className="text-[14px] border-b-[1px] py-[8px] px-[10px] sticky top-0 bg-primary-white z-30 h-[14%]">
              {capitalize(first_name)}, you have notifications!
            </div>
            <div className="h-[86%] overflow-y-auto scrollbar-none">
              {Array(100)
                .fill('notification')
                .map((item, i) => (
                  <div
                    key={i}
                    className="hover:bg-primary-light px-[10px] py-[5px]"
                  >
                    <p>{item}</p>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default NotificationHead;
