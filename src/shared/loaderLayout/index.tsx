import logo from '@assets/svg/logoIcon.svg';

function Loader() {
  return (
    <div className="h-screen text-[#072723]">
      <div className="flex flex-col items-center justify-center min-h-full">
        <div className="">
          <img src={logo} alt="" className="w-[80px] h-[100px] animate-spin" />
          <h1 className="text-[28px] font-[900]">Pentrar</h1>
        </div>
      </div>
    </div>
  );
}

export default Loader;
