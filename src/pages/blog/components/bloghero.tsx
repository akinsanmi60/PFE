import CustomButton from '@shared/Button';

function BlogHero() {
  return (
    <div>
      <div className="pt-[80px] pb-[40px] xlsm:py-[40px] max-content">
        <div className="container">
          <div className="flex justify-center">
            <div className="w-[652px] xlsm:w-full">
              <p className="font-playfair font-[700] text-[48px] leading-[60px] xlsm:text-[40px] xlsm:leading-[48px] text-primary-main text-center xlsm:text-left">
                Insights for Pentrar Excellence
              </p>
              <div className="flex flex-col items-center">
                <p className="font-primary mt-[16px] w-[519px]  font-[400] text-[18px] leading-[27px] sixm:w-full xlsm:text-[16px] xlsm:leading-[24px] text-primary-lighter text-center xlsm:text-left">
                  Subscribe and stay informed with our expert articles, guides
                  and industry trends to elevate your business.{' '}
                </p>
                <div className="mt-[40px] xlsm:w-full flex items-center justify-center xlsm:flex-col gap-[12px]">
                  <input
                    type="email"
                    placeholder="Email Address"
                    className=" p-[16px] h-[44px] w-[293px] xlsm:w-full  rounded-[4px] border-[1px] font-secondary font-[400] text-[16px] leading-[24px] placeholder-primary-lighter border-primary-light  outline-none bg-primary-white"
                  />{' '}
                  <CustomButton className="text-primary-white xlsm:w-full">
                    Subscribe{' '}
                  </CustomButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogHero;
