import { ReactComponent as ProfileICon } from '@assets/svg/profileIcon.svg';
import { ReactComponent as ChevronDown } from '@assets/svg/chevronDown.svg';
import { useEffect, useRef, useState } from 'react';

function ProfileHead({ handleLogout }: { handleLogout: () => void }) {
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
    <div ref={divRef}>
      <div className="">
        <div
          className="flex items-center gap-[10px] relative"
          onClick={toggleIsOpen}
        >
          <ProfileICon />
          <ChevronDown />
        </div>
        {isHovered && (
          <div
            className="absolute p-[16px] top-10 right-2 mt-[18px] cursor-pointer shadow-lg w-[200px] h-[175px] scrollbar-none overflow-y-auto bg-white bg-primary-white z-50"
            // ref={divRef}
          >
            <div className="" onClick={handleLogout}>
              Logout
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileHead;
