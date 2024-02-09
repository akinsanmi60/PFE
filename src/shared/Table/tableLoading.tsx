// import CircularProgress from 'shared/CircularProgress';

import { CircularProgress } from '@chakra-ui/react';

const TableLoading = ({ title }: { title: string }) => {
  return (
    <div className="font-title h-[450px] flex flex-col justify-center items-center py-5 text-gray-500 bg-white w-full">
      <CircularProgress size="120px" />
      <p className="mt-[25px]">{title}</p>
    </div>
  );
};
export default TableLoading;
