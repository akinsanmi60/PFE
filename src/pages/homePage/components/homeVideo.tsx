import playIcon from '@assets/svg/playIcon.svg';
import farmHarvest from '@assets/png/farmHarvest.jpg';
function HomeVideo() {
  return (
    <div className="max-content py-[48px]">
      <div className="container">
        <div className="bg-background-main border-[4px] border-[#6AD871] h-[660px] mdxl:h-[450px] w-full relative">
          <img
            src={farmHarvest}
            alt="about-hero-img"
            className="h-full w-full object-cover"
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <img
              src={playIcon}
              alt="play-icon"
              className="w-[80px] h-[80px] mdxl:h-[50px] mdxl:w-[50px] cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeVideo;
