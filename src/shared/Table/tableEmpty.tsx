import { capitalize } from '@utils/constants';
import { FcCancel } from 'react-icons/fc';

type IEmptyProp = {
  emptyStateSize?: string;
  componentType?: string;
  svg?: React.ReactNode;
};

const EmptyBar = ({ emptyStateSize = 'sm', componentType }: IEmptyProp) => {
  const heigtValue = emptyStateSize === 'lg' ? '400px' : '280px';
  return (
    <div>
      <div
        className={`font-title h-[${heigtValue}] flex flex-col justify-center items-center py-5 text-gray-500 bg-white w-full`}
      >
        <div className="text-[50px]">
          <FcCancel />
        </div>

        <p> No {capitalize(componentType)} Detail</p>
      </div>
    </div>
  );
};
export default EmptyBar;
