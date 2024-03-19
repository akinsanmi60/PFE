import CircularProgress from 'shared/CircularProgress';

const TableLoading = ({
  title,
  size = 80,
  className,
}: {
  title: string;
  size?: number;
  className?: string;
}) => {
  return (
    <div
      className={`font-title h-[450px] flex flex-col justify-center items-center py-5 text-gray-500 bg-white w-full ${className}`}
    >
      <CircularProgress size={size} color="#2AA232" />
      <p className="mt-[25px]">{title}</p>
    </div>
  );
};
export default TableLoading;
