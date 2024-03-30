import location from '@assets/svg/location.svg';
import contact from '@assets/svg/contact.svg';
import ContactForm from './contactForm';

// const contactSocialIcons = [
//   {
//     img: '/assets/svg/facebookBlue.svg',
//     link: '',
//   },
//   {
//     img: '/assets/svg/twitterBlue.svg',
//     link: '',
//   },
//   {
//     img: '/assets/svg/linkedInBlue.svg',
//     link: '',
//   },
//   {
//     img: '/assets/svg/instagramBlue.svg',
//     link: '',
//   },
// ];
function Page() {
  return (
    <div>
      <div className=" py-[80px] xlsm:py-[50px]">
        <div className="max-content ">
          <div className="container">
            <div className="flex gap-[24px] md:flex-col md:items-center">
              <div className="w-[486px] lg:w-[420px] xlsm:w-full">
                <div className="">
                  <p className="font-primary font-[700] text-[48px] leading-[60px] xlsm:text-[40px] xlsm:leading-[48px] text-primary-main">
                    Get in Touch{' '}
                  </p>
                  <p className="font-secondary mt-[16px] font-[400] text-[18px] leading-[27px] xlsm:text-[16px] xlsm:leading-[24px] text-primary-light">
                    We appreciate your interest in EdgeHR. To request a demo or
                    for any inquiries, please use the contact information below
                    or fill out the form, and our team will get back to you
                    promptly.
                  </p>
                </div>
                <div>
                  <div className="md:hidden">
                    <div className="mt-[24px] flex gap-[24px] w-[486px] lg:w-full rounded-[8px] border-[1px] border-secondary-light-3 p-[24px]">
                      <img
                        src={contact}
                        alt="image"
                        className="w-[40px] h-[40px] xlsm:h-[29px] xlsm:w-[29px] object-contain"
                      />
                      <div>
                        <p className="font-primary font-[600] text-[18px] leading-[27px] xlsm:text-[16px] xlsm:leading-[24px] text-secondary-light-1">
                          Contact us
                        </p>
                        <p className="font-secondary mt-[8px] font-[400] text-[16px] leading-[24px] text-primary-light">
                          For technical assistance or support-related queries,
                          please contact our dedicated support team at{' '}
                        </p>
                        <p className="font-primary mt-[px] font-[600] text-[16px] leading-[24px] text-primary-main">
                          support@pentrar.com
                        </p>
                      </div>
                    </div>
                    <div className="mt-[24px] flex gap-[24px] w-[486px] lg:w-full rounded-[8px] border-[1px] border-secondary-light-3 p-[24px]">
                      <img
                        src={location}
                        alt="image"
                        className="w-[40px] h-[40px] xlsm:h-[29px] xlsm:w-[29px] object-contain"
                      />
                      <div>
                        <p className="font-primary font-[600] text-[18px] leading-[27px] xlsm:text-[16px] xlsm:leading-[24px] text-secondary-light-1">
                          Office
                        </p>
                        <p className="font-secondary w-[265px] mt-[8px] font-[400] text-[16px] leading-[24px] text-primary-light">
                          40, Ikeja, Lagos
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <ContactForm />

                <div className="hidden md:block mt-[32px]">
                  <div className="mt-[24px] flex gap-[24px] w-[486px] lg:w-full md:w-[486px] xlsm:w-full rounded-[8px] border-[1px] border-secondary-light-3 p-[24px]">
                    <img
                      src={contact}
                      alt="img"
                      className="w-[40px] h-[40px] xlsm:h-[29px] xlsm:w-[29px] object-contain"
                    />
                    <div>
                      <p className="font-primary font-[600] text-[18px] leading-[27px] xlsm:text-[16px] xlsm:leading-[24px] text-secondary-light-1">
                        Contact us
                      </p>
                      <p className="font-secondary mt-[8px] font-[400] text-[16px] leading-[24px] text-primary-light">
                        For technical assistance or support-related queries,
                        please contact our dedicated support team at{' '}
                      </p>
                      <p className="font-primary mt-[px] font-[600] text-[16px] leading-[24px] text-primary-main">
                        support@pentrar.com
                      </p>
                    </div>
                  </div>
                  <div className="mt-[24px] flex gap-[24px] w-[486px] lg:w-full md:w-[486px] xlsm:w-full rounded-[8px] border-[1px] border-secondary-light-3 p-[24px]">
                    <img
                      src={location}
                      alt="image"
                      className="w-[40px] h-[40px] xlsm:h-[29px] xlsm:w-[29px] object-contain"
                    />
                    <div>
                      <p className="font-primary font-[600] text-[18px] leading-[27px] xlsm:text-[16px] xlsm:leading-[24px] text-secondary-light-1">
                        Office
                      </p>
                      <p className="font-secondary w-[265px] mt-[8px] font-[400] text-[16px] leading-[24px] text-primary-light">
                        40, Ikeja, Lagos
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
