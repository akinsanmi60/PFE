import aboutHero from '@assets/png/aboutHeroA.png';

function AboutHero() {
  return (
    <div className="pt-[132px] mdxl:pt-[75px] pb-[81px] mdxl:pb-[50px] max-content">
      <div className="container">
        <div>
          <p className="font-[700] text-[64px] mdxl:text-[50px] mdxl:leading-[63px] leading-[80px] font-playfair text-[#1A1A1A]">
            About Pentrar
          </p>
          <p className="mt-[20px] max-w-[1157px] font-[500] text-[20px] leading-[28px] mdxl:text-[16px] mdxl:leading-[24px] text-[#333333]">
            At Pentrar, we understand the critical importance of traceability in
            today's fast-paced and highly regulated business landscape. That's
            why we have developed a cutting-edge software solution that empowers
            organizations to achieve seamless traceability across their supply
            chains. With our advanced technology, you can track and monitor
            every step of your product's journey, from raw materials to the end
            consumer, ensuring transparency, compliance, and peace of mind.
          </p>
          <div className="mt-[50px] bg-[#072723] rounded-[12px] w-full h-[600px] mdxl:h-[450px] xlsm:h-[400px]">
            <img
              src={aboutHero}
              alt="about-hero-img"
              className="h-full w-full object-cover rounded-[12px] mix-blend-luminosity"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutHero;
