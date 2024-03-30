import supplyChain from '@assets/svg/supplyChain.svg';
import operation from '@assets/svg/operation.svg';
import regulate from '@assets/svg/regulate.svg';

const whyPentrarData = [
  {
    icon: supplyChain,
    title: 'Traceability',
    description: `Enhance transparency and accountability in your export journey with our traceable supply chain solutions. By ensuring every step of your product's journey is meticulously tracked, Pentrar empowers you to meet regulatory requirements effortlessly while building trust with stakeholders.`,
  },
  {
    icon: regulate,
    title: 'Compliance',
    description:
      'Navigate complex regulatory landscapes with ease by partnering with Pentrar. Our comprehensive solutions enable you to surpass regulatory requirements seamlessly, ensuring smooth operations and mitigating risks associated with non-compliance.',
  },
  {
    icon: operation,
    title: 'Efficiency',
    description: `Experience heightened efficiency throughout your supply chain with Pentrar's innovative technologies. By unlocking the power of traceability, our solutions streamline processes, optimize resource utilization, and accelerate your export journey, driving sustainable growth for your business.`,
  },
];
function WhyPentrar() {
  return (
    <div className="bg-primary-white w-full py-[100px] xlsm:py-[50px] mt-[50px]">
      <div className="max-content">
        <div className="container">
          <div className="flex justify-center">
            <div className="w-[980px] xlsm:w-full">
              <p className="font-playfair font-[700] text-[48px] leading-[60px] xlsm:text-[40px] xlsm:leading-[48px] text-primary-main text-center mdSm:text-left">
                Why Choose Pentrar?
              </p>
              <div className="flex flex-col items-center">
                <p className="font-primary mt-[16px]  font-[400] text-[18px] leading-[27px] mdSm:w-full xlsm:text-[16px] xlsm:leading-[24px] text-[#5B7492] text-center mdSm:text-left">
                  Pentrar stands as your gateway to a traceable, compliant, and
                  efficient export journey. With our unparalleled expertise,
                  regulatory prowess, and commitment to efficiency, Pentrar
                  empowers you to navigate complexities with ease, setting the
                  stage for sustainable growth and success. Join hands with
                  Pentrar today and unlock the full potential of your export
                  endeavors.
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-[60px] gap-x-[20px] lg:flex-wrap lg:justify-center lg:gap-[40px]">
            {whyPentrarData.map((item, index) => (
              <div
                key={index}
                className=" flex flex-col items-center gap-[8px]"
              >
                <img src={item.icon} alt="" className="w-[40px] h-[40px]" />
                <p className="font-[700] font-primary text-[20px] leading-[34px]  text-primary-main">
                  {item.title}
                </p>
                <p className="font-[400] w-[370px] xlsm:w-full font-secondary text-[14px] leading-[24px] text-secondary-light-2 text-center">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhyPentrar;
