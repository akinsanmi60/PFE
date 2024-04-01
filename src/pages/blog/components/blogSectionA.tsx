import { blogData } from '@db/blogData';
import dot from '@assets/svg/dot.svg';
import dotGrey from '@assets/svg/dotGrey.svg';
import { useNavigate } from 'react-router-dom';

function BlogSectionA() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="max-content py-[80px] xlsm:py-[24px]">
        <div className="max-content">
          <div className="container">
            <div>
              <p className="mb-[45px] xlsm:mb-[24px] font-[400] font-primary text-[32px] leading-[38px] xlsm:text-[24px] xlsm:leading-[32px] text-primary-main">
                Recent Articles
              </p>
            </div>
            <div className="flex gap-[24px]  mdxl:flex-col mdxl:items-center">
              <div className="w-[588px] lg:w-[518px]  md:w-full rounded-[12px] overflow-hidden relative">
                {blogData?.slice(0, 1).map((item, i) => (
                  <div key={i} className="">
                    <img
                      src={item?.img}
                      alt="image"
                      className=" w-[588px] h-[558px] xlsm:h-[494px]  lg:w-full object-cover object-top"
                    />
                    <div className="absolute bottom-0 w-full min-h-[201px] py-[24px] xlsm:p-[16px] xlsm:pb-[24px] px-[32px] bg-[#185b1cc4]">
                      <p className="font-[500] font-primary text-[14px] leading-[21px] xlsm:text-[12px] xlsm:leading-[18px] text-primary-white">
                        {item?.service.toUpperCase()}
                      </p>
                      <p
                        onClick={() =>
                          navigate(`/blog/${item?.title.replace(/\s+/g, '-')}`)
                        }
                        className="mt-[13px] font-[500] line-clamp-2 font-primary text-[20px] leading-[30px]  cursor-pointer  xlsm:text-[18px] xlsm:leading-[27px] text-primary-white"
                      >
                        {item?.title}
                      </p>

                      <p
                        onClick={() =>
                          navigate(`/blog/${item?.title.replace(/\s+/g, '-')}`)
                        }
                        className="mt-[12px] font-[400] cursor-pointer line-clamp-2 xlsm:line-clamp-3 font-primary text-[16px] leading-[24px] xlsm:text-[14px] xlsm:leading-[21px] text-primary-white"
                      >
                        {item?.textBlockA?.paragraphs
                          ?.slice(0, 1)
                          ?.map((item: any) => (
                            <p key={item}>{item?.paragraph}</p>
                          ))}
                      </p>
                      <div className="mt-[16px]">
                        <div className="flex items-center gap-[8px] ">
                          <p className="font-[400] font-primary text-[14px] leading-[21px] text-primary-white">
                            {item?.readingTime}
                          </p>
                          <img
                            src={dot}
                            alt="image"
                            className=" w-[7px] h-[21px]  object-contain"
                          />
                          <p className="font-[400] font-primary text-[14px] leading-[21px] text-primary-white">
                            {item?.publishedAt}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-[24px] xlsm:gap-[40px] mdxl:mt-[40px] mdxl:grid mdxl:grid-cols-2 md:flex md:flex-wrap">
                {blogData?.slice(1, 4)?.map((item, i) => (
                  <div
                    key={i}
                    className="rounded-[4px] flex gap-[24px] xlsm:flex-col xlsm:gap-[8px]"
                  >
                    <img
                      src={item?.img}
                      alt="image"
                      className=" w-[282px] h-[170px] lg:w-[234px] xlsm:w-full xlsm:h-[204px] object-cover object-top rounded-[8px]"
                    />
                    <div className="w-[282px] md:w-full py-[8px]">
                      <p className="font-[500] font-primary  text-[14px] leading-[21px] text-secondary-light-1">
                        {item?.service.toUpperCase()}
                      </p>
                      <p
                        onClick={() =>
                          navigate(`/blog/${item?.title.replace(/\s+/g, '-')}`)
                        }
                        className="mt-[23px] xlsm:mt-[8px] font-[400] font-primary text-[16px] leading-[21px]  cursor-pointer text-primary-main"
                      >
                        {item?.title}
                      </p>

                      <div className="hidden md:block ">
                        <p
                          onClick={() =>
                            navigate(
                              `/blog/${item?.title.replace(/\s+/g, '-')}`,
                            )
                          }
                          className="mt-[12px] font-[400] cursor-pointer line-clamp-2 xlsm:line-clamp-3 font-primary text-[16px] leading-[24px] xlsm:text-[14px] xlsm:leading-[21px] text-primary-main"
                        >
                          {item?.textBlockA?.paragraphs
                            ?.slice(0, 1)
                            ?.map((item: any) => (
                              <p key={item}>{item?.paragraph}</p>
                            ))}
                        </p>
                      </div>

                      <div className="mt-[16px] xlsm:mt-[12px]">
                        <div className="flex items-center gap-[8px] ">
                          <p className="font-[400] font-primary text-[14px] leading-[21px] text-[#5B7492]">
                            {item?.readingTime}
                          </p>
                          <img
                            src={dotGrey}
                            alt="image"
                            className=" w-[7px] h-[21px]  object-contain"
                          />
                          <p className="font-[400] font-primary text-[14px] leading-[21px] text-[#5B7492]">
                            {item?.publishedAt}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogSectionA;
