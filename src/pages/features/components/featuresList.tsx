import foodSafety from '@assets/svg/foodSafety.svg';
import qualityControl from '@assets/svg/qualityControl.svg';
import compliance from '@assets/svg/compliance.svg';
import supply from '@assets/svg/supply.svg';
import trust from '@assets/svg/trust.svg';
import sustainability from '@assets/svg/sustainability.svg';
import imgA from '@assets/png/foodSafety.jpg';
import imgB from '@assets/png/qualityControl.jpg';
import imgC from '@assets/png/regulatoryCompliance.jpg';
import imgD from '@assets/png/foodChain.jpg';
import imgE from '@assets/png/consumerTrust.jpg';
import imgF from '@assets/png/sustainability.jpg';
import markIcon from '@assets/svg/mark.svg';

const featuresData = [
  {
    img: imgA,
    icon: foodSafety,
    iconBg: '#E1F7FF',
    title: 'Food Safety',
    subtitle: '',
    btnText: '',
    bg: '#FFFFFF',
    paragraph: [
      {
        p: 'PENTRAR Traceability solution is crucial in ensuring the safety of the food supply chain. It enables producers, processors, and retailers to identify the source of any foodborne illness outbreaks and to take swift action to prevent further spread of the disease.',
      },
      {
        p: 'In the event of a recall, traceability helps to quickly identify the affected products and remove them from the market.',
      },
    ],
    list: [
      {
        line: 'Facilitating Rapid Identification of Contaminated Products',
      },
      {
        line: 'Strengthening Proactive Measures Against Foodborne Illness Outbreaks',
      },
      {
        line: 'Enhancing Consumer Confidence Through Transparency',
      },
      {
        line: 'Streamlining Recall Processes for Swift Market Response',
      },
    ],
  },
  {
    img: imgB,
    icon: qualityControl,
    iconBg: '#FFFFFF',
    title: 'Quality Control',
    subtitle: '',
    bg: '#EDF9FF',
    // btnText: "",
    paragraph: [
      {
        p: 'PENTRAR Traceability solution helps to ensure the quality and safety of agro-commodities by allowing stakeholders to track and monitor the products throughout the supply chain.',
      },
      {
        p: 'This helps to identify any issues or defects and take corrective action before the products reach the end consumer. This can also help to reduce the risk of product recalls and protect the reputation of the industry.',
      },
    ],
    list: [
      {
        line: 'PENTRAR Traceability offers meticulous monitoring, enabling stakeholders to precisely track agro-commodities from source to destination.',
      },
      {
        line: 'With PENTRAR, identifying issues or defects early becomes feasible, empowering timely corrective measures to uphold product quality.',
      },
      {
        line: 'By leveraging PENTRAR, the risk of product recalls diminishes significantly, safeguarding consumer trust and industry reputation.',
      },
      {
        line: ' Implementing PENTRAR Traceability not only assures product quality but also shields the reputation of the entire agro-commodity industry.',
      },
    ],
  },
  {
    img: imgC,
    icon: compliance,
    iconBg: '#E1F7FF',
    title: 'Regulatory Compliance',
    subtitle: '',
    bg: '#FFFFFF',
    // btnText: "",
    paragraph: [
      {
        p: 'PENTRAR Traceability solution is essential for regulatory compliance, especially in the case of food safety and quality standards.',
      },
      {
        p: 'Traceability can help to identify the origin and journey of products, making it easier to comply with regulations and standards. This can also help to reduce the risk of non- compliance penalties and ensure that all products meet the required standards.',
      },
    ],
    list: [
      {
        line: 'Facilitates seamless identification of product origin and journey',
      },
      {
        line: 'Mitigates the risk of non-compliance penalties effectively',
      },
      {
        line: 'Ensures all products adhere to stringent quality standards',
      },
      {
        line: 'Streamlines regulatory adherence and documentation processes',
      },
    ],
  },
  {
    img: imgD,
    icon: supply,
    iconBg: '#FFFFFF',
    title: 'Supply Chain supply',
    subtitle: '',
    bg: '#002B40',
    textCol: '#FFFFFF',
    // btnText: "",
    paragraph: [
      {
        p: 'PENTRAR Traceability solution can improve supply chain supply by reducing waste, minimizing inventory levels, and improving logistics and transportation.',
      },
      {
        p: 'By tracking the movement of products, stakeholders can optimize the supply chain, reduce costs, and improve delivery times.',
      },
    ],
    list: [
      {
        line: 'Minimize Waste and Optimize Inventory Levels',
      },
      {
        line: 'Enhance Logistics and Transportation Efficiency',
      },
      {
        line: 'Improve Supply Chain Optimization',
      },
      {
        line: 'Expedite Delivery Times Through Effective Tracking',
      },
    ],
  },

  {
    img: imgE,
    icon: trust,
    iconBg: '#E1F7FF',
    title: 'Consumer Trust',
    subtitle: '',
    bg: '#FFFFFF',
    // btnText: "",
    paragraph: [
      {
        p: 'PENTRAR Traceability solution can help to build consumer trust by providing transparency and information about the products.',
      },
      {
        p: 'Consumers are increasingly interested in knowing the origin of the products they consume, and traceability can provide this information. This can also help to promote the reputation of the agro-commodity industry and increase consumer loyalty.',
      },
    ],
    list: [
      {
        line: 'Providing clear and accessible information about product origins fosters trust and confidence among consumers.',
      },
      {
        line: 'Implementing traceability measures strengthens the reputation of the agro-commodity sector, reassuring consumers about product quality and safety.',
      },
      {
        line: 'Transparent traceability not only satisfies consumer curiosity but also cultivates loyalty, as consumers value brands that prioritize transparency and accountability.',
      },
      {
        line: 'Access to detailed product information empowers consumers to make informed decisions, leading to a more conscientious and loyal customer base.',
      },
    ],
  },
  {
    img: imgF,
    icon: sustainability,
    iconBg: '#FFFFFF',
    title: 'Sustainability',
    subtitle: '',
    bg: '#F6EDF6',
    // btnText: "",
    paragraph: [
      {
        p: 'Traceability can also help to promote sustainability in the agro- commodity supply chain.',
      },
      {
        p: 'By tracking the movement of products and their attributes, stakeholders can identify opportunities for improving sustainability, such as reducing waste, using environmentally friendly practices, and promoting ethical sourcing.',
      },
    ],
    list: [
      {
        line: 'Identifying avenues for minimizing waste and resource consumption.',
      },
      {
        line: 'Implementing eco-friendly practices to mitigate environmental impact.',
      },
      {
        line: 'Ensuring ethical sourcing practices to uphold social responsibility',
      },
      {
        line: 'Enhancing transparency throughout the supply chain to foster sustainable practices.',
      },
    ],
  },
];

function FeaturesList() {
  return (
    <div className="">
      {featuresData?.map((item, i) => (
        <div key={i} className="" style={{ background: item?.bg }}>
          <div className="max-content py-[80px]">
            <div className="container">
              <div
                className={`flex gap-[83px] lg:gap-[40px] items-center mdxl:flex-col-reverse  ${
                  i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                <div className="w-[529px] lg:w-[450px] xlsm:w-full">
                  {/* Row 1 Icon and Title */}
                  <div className="flex items-center gap-[16px]">
                    <div
                      className="flex items-center justify-center w-[90px] shadow-lg h-[90px] xlsm:w-[64px] xlsm:h-[64px] rounded-[50%]"
                      style={{ background: item?.iconBg }}
                    >
                      <img
                        src={item?.icon}
                        alt="image"
                        className="w-[41px] h-[50px] xlsm:h-[29px] xlsm:w-[29px] object-contain"
                      />
                    </div>
                    <p
                      className={`font-[700] font-primary text-[32px] leading-[34px] xlsm:text-[24px] ${
                        item?.textCol ? 'text-[#FFFFFF]' : 'text-primary-main'
                      }`}
                    >
                      {item?.title}
                    </p>
                  </div>

                  {/* Row 2 */}
                  <div className="mt-[16px] w-[510px] lg:w-full">
                    <p
                      className={`font-[300] font-primary text-[28px] leading-[34px] xlsm:text-[20px]  ${
                        item?.textCol ? 'text-[#FFFFFF]' : 'text-[#333333]'
                      }`}
                    >
                      {item?.subtitle}
                    </p>
                    <div className="mt-[24px] flex flex-col gap-[8px]">
                      {item?.paragraph?.map((p, i) => (
                        <p
                          key={i}
                          className={`font-[400] font-secondary text-[16px] leading-[24px] ${
                            item?.textCol ? 'text-[#FFFFFF]' : 'text-[#5B7492]'
                          } `}
                        >
                          {p?.p}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Row 3 */}
                  <div className="mt-[24px] w-[510px] lg:w-full">
                    <div className="flex flex-col gap-[24px]">
                      {item?.list?.map((l, i) => (
                        <div key={i} className="flex items-center gap-[12px]">
                          <img
                            src={markIcon}
                            alt="image"
                            className="w-[30px] h-[30px] object-contain"
                          />
                          <p
                            className={`font-[400] font-secondary text-[16px] leading-[24px] ${
                              item?.textCol
                                ? 'text-[#FFFFFF]'
                                : 'text-[#5B7492]'
                            } `}
                          >
                            {l?.line}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Btn */}
                  {item?.btnText && (
                    <button className="btn-primary mt-[36px]">
                      {item?.btnText}
                    </button>
                  )}
                  <div></div>
                </div>
                <img
                  src={item?.img}
                  alt="image"
                  className="w-[588px] h-[806px] lg:w-[500px] lg:h-[600px] mdxl:h-[360px] mdxl:w-full mdxl:object-cover mdxl:object-top rounded-[16px] object-cover"
                />{' '}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FeaturesList;
