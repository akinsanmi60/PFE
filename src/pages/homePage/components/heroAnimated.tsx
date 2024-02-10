import heroImg1 from '../../../assets/png/heroImg1.png';
function HeroAnimated() {
  return (
    <div className="">
      <div className="absolute mdxl:hidden">
        <img src={heroImg1} alt="" className="w-[604px] h-[562px]" />
      </div>
      <div className="mdxl:block hidden">
        <img src={heroImg1} alt="" className="w-full h-[450px]" />
      </div>
    </div>
  );
}

export default HeroAnimated;
