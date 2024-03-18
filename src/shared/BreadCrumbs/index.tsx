import { useNavigate } from 'react-router-dom';

export type IBreadCrumbItem = {
  text: string;
  href?: string;
};
const BreadCrumbs = ({ items }: { items: IBreadCrumbItem[] }) => {
  const navigate = useNavigate();

  return (
    <div>
      <nav className="cursor-pointer">
        <ol className="flex pl-0 list-reset">
          {items.map((item, index) => (
            <li key={item.text} className="flex items-center">
              <p
                className={`after:content-['/'] after:no-underline after:mx-[6px] text-[18px] font-[500] ${
                  index === items.length - 1
                    ? 'text-secondary-light-1  after:hidden'
                    : 'text-[#0F172A] cursor-pointer hover:underline '
                }`}
                onClick={() => {
                  if (item.href) {
                    navigate(item?.href);
                  }
                }}
              >
                {item?.text}
              </p>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default BreadCrumbs;
