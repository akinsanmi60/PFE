import CustomButton from '@shared/Button';
import unlockImg from '@assets/png/unlockImgW.png';

function UnlockPentrar() {
  return (
    <div className="py-[80px] px-[20px]  sixm:py-[50px]">
      <div className="max-content bg-background-dark rounded-[16px] py-[32px]">
        <div className="container ">
          <div className="flex items-center justify-center gap-[55px] sixm:flex-col">
            <div>
              <img
                src={unlockImg}
                alt="image"
                className="w-[400px] h-[370px] xlsm:h-[320px] xlsm:w-full rounded-[8px]"
              />
            </div>
            <div className="w-[513px] xlsm:w-full sixm:flex sixm:flex-col sixm:items-center sixm:text-center">
              <p className="font-[600] font-primary text-[36px] xlsm:text-[24px] xlsm:leading-[29px] leading-[38px] text-primary-white">
                Unlock the Power of Traceability{' '}
              </p>
              <p className="font-[400] font-primary text-[16px] leading-[24px] xlsm:text-[14px] xlsm:leading-[21px] text-primary-white mt-[16px]">
                Join Us on the Journey to Foster a Dynamic, Inclusive, and
                Productive journey with a traceable supply chain, surpass
                regulatory requirements, and unleash efficiency!.
              </p>
              <div className=" mt-[32px] flex gap-[8px] xlsm:flex-row-reverse xlsm:justify-end">
                <CustomButton
                  className="bg-primary-white font-[500] font-primary text-[14px] leading-[20px] text-secondary-light-1"
                  // onClick={() => router.push('/contactUs')}
                >
                  Request a Demo{' '}
                </CustomButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UnlockPentrar;
