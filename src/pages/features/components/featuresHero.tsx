import CustomButton from '@shared/Button';

function FeaturesHero() {
  // const router = useRouter();

  return (
    <div className="pt-[80px] pb-[40px] max-content">
      <div className="container">
        <div className="flex justify-center">
          <div className="w-[980px] xlsm:w-full">
            <p className="font-playfair font-[700] text-[48px] leading-[60px] xlsm:text-[40px] xlsm:leading-[48px] text-primary-main text-center mdSm:text-left">
              Why Should Anyone Care
            </p>
            <div className="flex flex-col items-center">
              <p className="font-primary mt-[16px]  font-[400] text-[18px] leading-[27px] mdSm:w-full xlsm:text-[16px] xlsm:leading-[24px] text-[#5B7492] text-center mdSm:text-left">
                PENTRAR’s innovative traceability solution provides a range of
                benefits for stakeholders in the supply chain, including
                farmers, producers, distributors, retailers, and consumers. Here
                are some of the benefits of our traceability solution in the
                agro-commodity supply chain from Nigeria.
              </p>
              <CustomButton
                className="mt-[24px] cursor-pointer bg-secondary-light-1 text-primary-white   rounded-[40px] py-[20px] px-[48px] xlsm:py-[12px] xlsm:px-[24px]"
                // onClick={() => router.push("/contactUs")}
              >
                Contact us
              </CustomButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeaturesHero;
