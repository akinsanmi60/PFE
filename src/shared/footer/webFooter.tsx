import { getYear } from '@utils/constants';
function Footer() {
  return (
    <footer className="w-full bg-[var(--dark-primary)] text-white h-[60px] ">
      <div className="max-content">
        <div className="container">
          <div className="w-full flex h-full justify-between items-center">
            <div>
              <p>{getYear()}</p>
            </div>
            <div>PENTRAR</div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
