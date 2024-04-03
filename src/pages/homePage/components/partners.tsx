import Marquee from 'react-fast-marquee';
import logoA from '@assets/png/farmA.jpg';
import logoB from '@assets/png/farmB.jpg';
import logoC from '@assets/png/farmC.jpg';
import logoD from '@assets/png/FarmD.jpg';

const businesses = [
  {
    img: logoA,
  },
  {
    img: logoB,
  },
  {
    img: logoC,
  },
  {
    img: logoD,
  },
  {
    img: logoA,
  },
  {
    img: logoB,
  },
  {
    img: logoD,
  },
];
function Partners() {
  return (
    <div className="max-content mt-[40px] mb-[80px] xlsm:my-[40px]">
      <div className="container">
        <p className="font-[700] text-center font-playfair text-[40px]  leading-[48px] xlsm:text-[32px] xlsm:leading-[38px]  text-primary-main">
          Our Business Partners
        </p>
        <p className="mt-[16px] font-[400] text-center font-primary text-[16px] leading-[24px] xlsm:text-[14px] xlsm:leading-[21px] text-primary-light">
          Join Forces for Transparent Success: Our Trusted Business Allies in
          Unlocking Traceability's Power{' '}
        </p>
        <div className="mt-[40px]">
          <div className=" w-full ">
            <div className="flex items-center  opacity-60 grayscale mt-[24px]">
              <Marquee
                play={true}
                direction={'left'}
                loop={0}
                gradient={false}
                className=""
                pauseOnHover={true}
              >
                {businesses?.map((item, i) => (
                  <img
                    src={item.img}
                    key={i}
                    alt="image"
                    className="w-[150px] h-[100px] xlsm:w-[100px] xlsm:h-[80px] ml-[100px] xlsm:ml-[50px] object-contain"
                  />
                ))}
              </Marquee>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Partners;
