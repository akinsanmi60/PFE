import UseModal from '@hooks/useModal';
import VideoModal from './VideoModal';
import playIcon from '@assets/svg/playIcon.svg';
import playIconSm from '@assets/svg/playIconSm.svg';
import farmHarvest from '@assets/png/farmHarvest.jpg';

function BoostBusiness() {
  const { isShowing, toggle } = UseModal();
  const linkvideo =
    'https://videos.pexels.com/video-files/3195351/3195351-hd_1920_1080_25fps.mp4';

  return (
    <>
      <div>
        <div className="relative my-[100px] xlsm:my-[60px]">
          <div className=" ">
            <img
              src={farmHarvest}
              alt="hero"
              className="w-full h-[650px] xxlA:h-[750px] xlsm:h-[432px] object-top  object-cover"
            />
          </div>
          <div className="bg-[#000000bc] absolute top-0 w-full h-full"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 xlsm:hidden">
            <h1 className="font-secondary font-[500] text-[32px] lg:text-[40px] leading-[48px]  text-center text-[#FFFFFF]">
              {`Discover how Pentrar's innovative solutions can revolutionize your farm operations`}
            </h1>
            <div className="flex justify-center">
              <div
                className="flex items-center justify-center gap-[10px] mt-[30px] bg-secondary-light-1 py-[12px] px-[16px] rounded-[48px] cursor-pointer"
                onClick={toggle}
              >
                <div className="">
                  <img
                    src={playIcon}
                    alt="hero"
                    className="w-[20px] h-[20px] "
                  />
                </div>
                <p className="font-primary font-[600] text-[14px] leading-[21px] text-primary-white">
                  Find Out More
                </p>
              </div>
            </div>
          </div>
          {/* Mobile Starts */}
          <div className="absolute bottom-0 left-0 hidden xlsm:block w-full">
            <div
              className="flex items-center  gap-[10px] mt-[30px] bg-[#434F617A] p-[16px] cursor-pointer"
              onClick={toggle}
            >
              <div className=" ">
                <img
                  src={playIconSm}
                  alt="hero"
                  className="w-[20px] h-[20px] "
                />
              </div>
              <p className="font-[Satoshi] font-[700] text-[14px] leading-[21px] text-[#FFFFFF]">
                {`Discover how Pentrar's innovative solutions can revolutionize your farm operations`}{' '}
              </p>
            </div>
          </div>
        </div>
      </div>
      <VideoModal link={linkvideo} isShowing={isShowing} hide={toggle} />
    </>
  );
}

export default BoostBusiness;
