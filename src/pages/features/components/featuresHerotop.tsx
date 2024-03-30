import aboutHero from '@assets/png/aboutHeroA.png';

function FeaturesHerotop() {
  return (
    <div className="relative">
      <div>
        <div className=" bg-[#072723] rounded-[12px] w-full xxlA:h-[700px] h-[600px] mdxl:h-[450px] xlsm:h-[500px]">
          <img
            src={aboutHero}
            alt="about-hero-img"
            className="h-full w-full object-cover rounded-[12px] mix-blend-luminosity"
          />
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-[#072723d1]"></div>
        <div className="absolute top-[40%] left-[50%] translate-x-[-50%] translate-y-[-50%] xlsm:w-full xlsm:px-[20px]">
          <p className="font-[700] text-[64px] text-center mdxl:text-[50px] mdxl:leading-[63px] leading-[80px] font-playfair text-primary-white">
            About Pentrar
          </p>
          <p className="mt-[20px] w-[1157px] lg:w-[900px] mdxl:w-[700px] md:w-[500px] xlsm:w-full text-center font-[500] text-[20px] leading-[28px] mdxl:text-[16px] mdxl:leading-[24px] text-primary-white">
            At Pentrar, we understand the critical importance of traceability in
            today's fast-paced and highly regulated business landscape. That's
            why we have developed a cutting-edge software solution that empowers
            organizations to achieve seamless traceability across their supply
            chains. With our advanced technology, you can track and monitor
            every step of your product's journey, from raw materials to the end
            consumer, ensuring transparency, compliance, and peace of mind.
          </p>
        </div>
      </div>
    </div>
  );
}

export default FeaturesHerotop;
