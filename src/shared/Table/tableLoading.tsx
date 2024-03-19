import CircularProgress from 'shared/CircularProgress';

const TableLoading = ({
  title,
  size = 80,
  className,
  loadingStateSize = 'lg',
}: {
  title: string;
  size?: number;
  className?: string;
  loadingStateSize?: 'lg' | 'sm';
}) => {
  const heigtValue = loadingStateSize === 'sm' ? 'h-[280px]' : 'h-[400px]';

  return (
    <div
      className={`font-title ${heigtValue} flex flex-col justify-center items-center py-5 text-gray-500 bg-white w-full ${className}`}
    >
      <CircularProgress size={size} color="#2AA232" />
      <p className="mt-[25px]">{title}</p>
    </div>
  );
};
export default TableLoading;
