import HashLoader from 'react-spinners/HashLoader';

function Loader() {
  return (
    <div className="h-screen text-[#072723]">
      <div className="flex flex-col items-center justify-center min-h-full">
        <div className="">
          <HashLoader color="#072723" size={60} speedMultiplier={2} />
          <h1 className="text-[28px] font-[900]">Pentrar</h1>
        </div>
      </div>
    </div>
  );
}

export default Loader;
