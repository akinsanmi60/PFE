import { blogData } from '@db/blogData';
import UnlockPentrar from '@pages/homePage/components/unlockPentrar';
import { renderParagraph } from '@utils/constants';
import { useNavigate, useParams } from 'react-router-dom';
import dotGrey from '@assets/svg/dotGrey.svg';

function BlogDetails() {
  const { title } = useParams();
  const navigate = useNavigate();

  const filterData = () => {
    const Datatoview = blogData.filter(
      data => data.title === title?.replace(/-/g, ' '),
    );
    return Datatoview;
  };

  const post = filterData()[0];

  const relatedArticles = blogData.filter(
    article =>
      article.industry === post.industry && article.title !== post.title,
  );

  return (
    <div className="max-content pt-[24px] pb-[120px] xlsm:pb-[70px]">
      <div className="container">
        <div className="flex gap-[4px] py-[40px] xlsm:py-[20px]">
          <p
            onClick={() => navigate('/')}
            className="font-[400] font-primary cursor-pointer  text-[14px] leading-[21px] text-[#5B7492]"
          >
            Home
            {' /'}
          </p>
          <p
            onClick={() => navigate('/blog')}
            className="font-[400] font-primary cursor-pointer  text-[14px] leading-[21px] text-[#5B7492]"
          >
            Blog
            {' /'}
          </p>
          <p className="font-[400] font-primary w-[174px] line-clamp-1 text-ellipsis  text-[14px] leading-[21px] text-[#5B7492]">
            {post?.title}
          </p>
        </div>
        <div className="flex justify-center">
          <div className="w-[792px] xlsm:w-full">
            <p className=" font-[700] font-primary text-center xlsm:text-left text-[40px] leading-[48px] xlsm:text-[24px] xlsm:leading-[32px] text-[#181D25]">
              {post?.title}
            </p>
            <div className="mt-[40px] pb-[40px] xlsm:mt-[24px] xlsm:pb-[24px] flex flex-col items-center xlsm:flex-row xlsm:gap-[16px]">
              <img
                src={post?.authorImg}
                alt="image"
                className=" w-[80px] h-[80px] rounded-[50%] bg-[#D9D9D9]  object-contain"
              />
              <div>
                <p className="font-[500] font-primary text-center text-[18px] leading-[27px] text-[#181D25]">
                  {post?.author}
                </p>
                <p className="font-[400] font-primary text-center text-[14px] leading-[21px] text-[#5B7492]">
                  {post?.authorPosition}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-[48px] xlsm:mt-[24px]">
          <div className="">
            {/* Image 1 */}
            <div className="flex justify-center">
              <img
                src={post?.img}
                alt="image"
                className=" w-[997px] h-[536px] rounded-[12px] xlsm:h-[184px] object-top object-cover "
              />
            </div>

            {/* Article Body and Paragraphs */}
            <div className="pt-[64px] flex justify-center">
              <div className="w-[792px] md:w-full">
                {/* Article Introduction Paragrap */}
                <p className="font-[400] mb-[64px] text-justify font-secondary text-[18px] leading-[32px] xlsm:text-[16px] xlsm:leading-[26px] text-[#5B7492]">
                  {post?.introParagraph}
                </p>

                {/* First Block of Text */}
                <div className="flex flex-col gap-[32px]">
                  {post?.textBlockA?.paragraphs?.map((item: any, i: number) => (
                    <div key={i}>
                      {item?.head && (
                        <p className="font-[500] mb-[16px] text-justify font-primary text-[28px] leading-[33px]  text-[#181D25]">
                          {item?.head}
                        </p>
                      )}
                      <p className="font-[400] text-justify font-secondary text-[18px] leading-[32px] xlsm:text-[16px] xlsm:leading-[26px] text-[#5B7492]">
                        {/* {item?.paragraph} */}
                        {renderParagraph(item?.paragraph)}
                      </p>
                    </div>
                  ))}
                </div>
                {/* If TextBlockA contains List */}
                <div>
                  {post?.textBlockA?.list && (
                    <div className="mt-[64px] xlsm:px-[20px]">
                      <p className="font-[500] font-primary text-[28px] leading-[34px]  text-[#181D25]">
                        {post?.textBlockA?.list?.heading}
                      </p>
                      <ul className="mt-[16px] flex flex-col gap-[24px]">
                        {post?.textBlockA?.list?.items?.map(
                          (item: any, i: number) => (
                            <li
                              key={i}
                              className="list-decimal pl-[16px] font-[500] font-primary text-[20px] leading-[30px] text-[#5B7492]"
                            >
                              {item?.head && (
                                <p className="font-[500] text-justify font-primary text-[20px] leading-[30px] xlsm:text-[16px] xlsm:leading-[24px] text-[#181D25]">
                                  {item?.head}
                                </p>
                              )}
                              <p className="font-[400] text-justify font-secondary text-[18px] leading-[32px] xlsm:text-[16px] xlsm:leading-[26px] text-[#5B7492]">
                                {/* {item?.paragraph} */}
                                {renderParagraph(item?.body)}
                              </p>
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Rendering second Image dynamically */}
                {post?.img2 && (
                  <div className="mt-[40px] xlsm:mt-[32px]">
                    <img
                      src={post?.img2}
                      alt="image"
                      className=" w-[792px] h-[394px] rounded-[12px] xlsm:h-[394px]  object-cover "
                    />

                    <div className="mt-[40px] pb-[40px] xlsm:mt-[24px] xlsm:pb-[24px] flex flex-col items-center">
                      <i className="font-[500] mb-[40px] font-primary text-center text-[20px] leading-[30px] text-[#5B7492]">
                        {post?.img2TagText}
                      </i>
                    </div>
                  </div>
                )}

                {/* Second Block of Text */}
                <div className="flex flex-col gap-[32px]">
                  {post?.textBlockB?.paragraphs?.map((item: any, i: number) => (
                    <div key={i}>
                      {item?.head && (
                        <p className="font-[500] mb-[16px] text-justify font-primary text-[28px] leading-[33px]  text-[#181D25]">
                          {item?.head}
                        </p>
                      )}
                      <p className="font-[400] text-justify font-secondary text-[18px] leading-[32px] xlsm:text-[16px] xlsm:leading-[26px] text-[#5B7492]">
                        {/* {item?.paragraph} */}
                        {renderParagraph(item?.paragraph)}
                      </p>
                    </div>
                  ))}
                </div>
                {/* If TextBlockB contains List */}
                <div>
                  {post?.textBlockB?.list && (
                    <div className="mt-[64px] xlsm:px-[20px]">
                      <p className="font-[500] font-primary text-[28px] leading-[34px]  text-[#181D25]">
                        {post?.textBlockB?.list?.heading}
                      </p>
                      <ul className="mt-[16px] flex flex-col gap-[24px]">
                        {post?.textBlockB?.list?.items?.map(
                          (item: any, i: number) => (
                            <li
                              key={i}
                              className="list-decimal pl-[16px] font-[500] font-primary text-[20px] leading-[30px] text-[#5B7492]"
                            >
                              {item?.head && (
                                <p className="font-[500] text-justify font-primary text-[20px] leading-[30px] xlsm:text-[16px] xlsm:leading-[24px] text-[#181D25]">
                                  {item?.head}
                                </p>
                              )}
                              <p className="font-[400] text-justify font-secondary text-[18px] leading-[32px] xlsm:text-[16px] xlsm:leading-[26px] text-[#5B7492]">
                                {/* {item?.paragraph} */}
                                {renderParagraph(item?.body)}
                              </p>
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Rendering Conclusion Pragraph dynamically */}
                {post?.conclusionParagraph && (
                  <div className="mt-[64px] bg-[#FAFEFF] p-[16px]">
                    {post?.conclusionParagraph?.head && (
                      <p className="font-[500] mb-[16px] text-justify font-primary text-[28px] leading-[33px]  text-[#181D25]">
                        {post?.conclusionParagraph?.head}
                      </p>
                    )}
                    <p className="font-[400] text-justify font-secondary text-[18px] leading-[32px] xlsm:text-[16px] xlsm:leading-[26px] text-[#5B7492]">
                      {/* {post?.conclusionParagraph?.paragraph} */}
                      {renderParagraph(post?.conclusionParagraph?.paragraph)}
                    </p>
                  </div>
                )}
                {/* Tags */}
                <div className="mt-[30px] flex items-center gap-[20px]">
                  <p className=" pr-[20px] border-r-[1px] border-primary-light font-[500] font-primary text-[16px] leading-[24px]  text-primary-main">
                    Tags
                  </p>
                  <div className="mt-[8px] flex gap-[10px] flex-wrap">
                    {post?.tags?.map((item, i) => (
                      <p
                        key={i}
                        className="font-[400] py-[4px] px-[8px] rounded-[12px] bg-secondary-light-1 font-primary text-[14px] leading-[21px] text-primary-white"
                      >
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lower Parts */}

        {/* Related Articles Start */}

        <div className="py-[64px] xlsm:py-[32px]">
          <p className=" font-[400] font-primary text-[32px] leading-[38px] xlsm:text-[24px] xlsm:leading-[32px] text-[#181D25]">
            Related Articles{' '}
          </p>
          <div className="mt-[24px] flex gap-[24px] xlsm:flex-col">
            {relatedArticles?.slice(0, 2).map((item, i) => (
              <div key={i} className="rounded-[8px] w-[357px] overflow-hidden">
                <img
                  src={item?.img}
                  alt="image"
                  className="w-[357px] h-[200px] transition duration-300 transform hover:scale-110 object-cover object-top"
                />
                <div className="py-[8px] mt-[8px]">
                  <p className="font-[500] font-primary text-[14px] leading-[21px] text-secondary-light-1">
                    {item?.service.toUpperCase()}
                  </p>
                  <p
                    onClick={() =>
                      navigate(`/blog/${item?.title.replace(/\s+/g, '-')}`)
                    }
                    className="mt-[16px] font-[500] font-primary line-clamp-2 text-[20px] leading-[30px] xlsm:text-[16px] xlsm:leading-[22px] text-[#181D25]  cursor-pointer"
                  >
                    {item?.title}
                  </p>
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

        {/* Related Articles End */}

        <UnlockPentrar />
      </div>
    </div>
  );
}

export default BlogDetails;
