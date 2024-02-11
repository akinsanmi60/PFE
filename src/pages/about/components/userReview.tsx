import { UserReviewData } from '@db/userReviewData';
import { ReactComponent as Quote } from '@assets/svg/quote.svg';

function UserReview() {
  return (
    <div className="max-content py-[64px]">
      <div className="container">
        <p className="font-[700] font-playfair text-[64px] leading-[80px] mdxl:text-[50px] mdxl:leading-[63px] xlsm:text-[45px] xlsm:leading-[50px] text-[#1A1A1A]">
          What People Are Saying
        </p>
        <div className="mt-[48px] flex gap-[20px] xlsm:flex-wrap">
          {UserReviewData?.map((item, index) => (
            <div
              key={index}
              className="w-[660px] bg-[#E9FBF9] rounded-[8px] px-[24px] py-[44px]"
            >
              {/* <img src={quote} alt="quote" className="w-[65px] h-[50px]" /> */}
              <Quote className="text-[30px] xlsm:w-[45px] xlsm:h-[40px]" />
              {item?.comment?.map((comment, i) => (
                <p
                  key={i}
                  className="mt-[24px] font-[500] text-[20px] leading-[28px] mdxl:text-[16px] mdxl:leading-[24px] text-[#072723]"
                >
                  {comment?.text}
                </p>
              ))}
              <div className="mt-[64px] flex items-center gap-[16px]">
                <img
                  src={item?.img}
                  alt="user"
                  className="w-[64px] h-[64px] rounded-full xlsm:h-[50px] xlsm:w-[50px]"
                />
                <div>
                  <p className="text-[#333333] font-[600] text-[20px] leading-[25px] xlsm:text-[16px] xlsm:leading-[24px]">
                    {item?.name}
                  </p>
                  <p className="text-[#666666] font-[400] text-[16px] leading-[20px] xlsm:text-[14px] xlsm:leading-[20px]">
                    {item?.titile}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserReview;
