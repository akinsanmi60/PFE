import { blogData } from '@db/blogData';
import { useEffect, useState } from 'react';
import prev from '@assets/svg/prev.svg';
import next from '@assets/svg/next.svg';
import dotGrey from '@assets/svg/dotGrey.svg';

type Post = /*unresolved*/ any;

function BlogSectionB() {
  // const [postsToShow, setPostsToShow] = useState<number>(6);
  const [postsToShow, setPostsToShow] = useState<Post[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(1);

  const resetFilter = () => {
    window.location.reload();
  };

  const postsPerPage: number = 9; // Number of posts to show per page

  useEffect(() => {
    const startIndex: number = (currentPage - 1) * postsPerPage;
    const endIndex: number = startIndex + postsPerPage;
    setPostsToShow(blogData.slice(startIndex, endIndex));
  }, [currentPage]);

  const totalPages: number = Math.ceil(blogData.length / postsPerPage);

  const nextPage = () => {
    setCurrentPage(prevPage =>
      prevPage < totalPages ? prevPage + 1 : totalPages,
    );
  };

  const prevPage = () => {
    setCurrentPage(prevPage => (prevPage > 1 ? prevPage - 1 : 1));
  };

  const generatePagination = (): JSX.Element[] => {
    const pages: JSX.Element[] = [];
    const visiblePages = Math.min(totalPages, 5); // Show up to 5 pages
    const startIndex = Math.max(
      1,
      Math.min(
        currentPage - Math.floor(visiblePages / 2),
        totalPages - visiblePages + 1,
      ),
    );

    // Add ellipsis if necessary
    if (startIndex > 1) {
      pages.push(
        <span
          className="mr-[16px] xlsm:mr-[8px] font-[700] text-[16px] leading-[24px] text-[#181D25] p-[4px]"
          key="ellipsis-start"
        >
          ...
        </span>,
      );
    }

    for (let i: number = startIndex; i < startIndex + visiblePages; i++) {
      const isActive: boolean = currentPage === i;
      pages.push(
        <span
          key={i}
          className={`mr-[16px] xlsm:mr-[8px] font-primary font-[700] cursor-pointer text-[16px] leading-[24px] ${
            isActive
              ? 'bg-secondary-light-1 rounded-[2px] p-[4px] text-[#FFFFFF]'
              : 'text-[#181D25] p-[4px]'
          }`}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </span>,
      );
    }

    // Add ellipsis and last page if necessary
    if (startIndex + visiblePages <= totalPages) {
      pages.push(
        <span
          className="font-[700] text-[16px] leading-[24px] text-[#181D25] p-[4px] mr-[16px] xlsm:mr-[8px]"
          key="ellipsis-end"
        >
          ...
        </span>,
        <span
          key={totalPages}
          className="font-[700] text-[16px] leading-[24px] text-[#181D25] p-[4px]"
          onClick={() => setCurrentPage(totalPages)}
        >
          {totalPages}
        </span>,
      );
    }

    return pages;
  };

  return (
    <div className="bg-[#FAFEFF] py-[40px]">
      <div className="max-content">
        <div className="container">
          <div className="flex items-center gap-[64px] py-[18px] md:flex-col md:gap-[24px]">
            <div className="pr-[24px] border-r-[1px] border-[#C6CFDB]">
              <p className=" font-[400] font-primary text-[32px] leading-[38px] xlsm:text-[24px] xlsm:leading-[32px] text-[#181D25]">
                All Articles{' '}
              </p>
            </div>
          </div>
          <div className="mt-[48px] grid grid-cols-3 gap-[24px] lg:flex lg:flex-wrap lg:justify-center">
            {postsToShow?.map((item, i) => (
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
                    // onClick={() => router.push(`/blog/${item?.title}`)}
                    className="mt-[16px] font-[500] font-primary line-clamp-2 text-[20px] leading-[30px] xlsm:text-[16px] xlsm:leading-[22px] text-[#181D25]  cursor-pointer"
                  >
                    {item?.title}
                  </p>
                  <p
                    // onClick={() => router.push(`/blog/${item?.title}`)}
                    className="mt-[12px] font-[400] cursor-pointer line-clamp-2 xlsm:line-clamp-3 font-primary text-[16px] leading-[24px] xlsm:text-[14px] xlsm:leading-[21px] text-primary-main"
                  >
                    {item?.textBlockA?.paragraphs
                      ?.slice(0, 1)
                      ?.map((item: any) => (
                        <p key={item}>{item?.paragraph}</p>
                      ))}
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
          {/* When there is no post shown */}
          {postsToShow?.length === 0 && (
            <div
              onClick={resetFilter}
              className="flex flex-col cursor-pointer items-center justify-center py-[50px]"
            >
              <img
                src="/assets/svg/notFound.svg"
                alt="image"
                className="w-[100px] h-[80px] transition duration-300 transform hover:scale-110 object-contain"
              />
              <p className="font-[300] text-center mt-[24px] font-secondary text-[20px] leading-[32px] text-[red]">
                Refresh
              </p>
            </div>
          )}

          {/* Pagination Here */}
          <div className="flex justify-between mt-[60px] xlsm:flex-wrap xlsm:items-center">
            <button
              className="flex items-center cursor-pointer gap-[16px] xlsm:gap-[8px]"
              onClick={prevPage}
              disabled={currentPage === 1}
            >
              <img
                src={prev}
                alt="image"
                className="w-[16px] h-[16px]  object-contain"
              />
              <p className="font-tertiary font-[500] text-[14px] leading-[21px] text-secondary-light-1">
                {' '}
                Previous
              </p>
            </button>
            <div>{generatePagination()}</div>
            <button
              className="flex items-center cursor-pointer gap-[16px] xlsm:gap-[8px]"
              onClick={nextPage}
              disabled={currentPage === totalPages}
            >
              <p className="font-tertiary font-[500] text-[14px] leading-[21px] text-secondary-light-1">
                Next
              </p>
              <img
                src={next}
                alt="image"
                className="w-[16px] h-[16px]  object-contain"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogSectionB;
