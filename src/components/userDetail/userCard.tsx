import { IRowBody } from '@shared/HubTable/type';

type IDetailProps<TData> = {
  detailProps: {
    detailKeys: {
      label: string;
      accessor: keyof TData | null;
      render?: ((_object: TData) => React.ReactNode) | undefined;
    }[];

    produceData?: TData;
  };
};

function UserCard<TData extends IRowBody>({
  detailProps,
}: IDetailProps<TData>) {
  const { detailKeys, produceData } = detailProps;
  return (
    <div className="flex flex-col gap-y-[10px] w-full">
      {detailKeys.map(({ label, accessor, render }) => {
        return (
          <div key={label} className="">
            <span className="font-[400] text-[14px] leading-[20px] text-primary-light">
              {label}:{' '}
            </span>{' '}
            <span className="font-[600] text-[14px] leading-[20px] text-primary-main">
              {' '}
              {produceData &&
                (render
                  ? render(produceData) || '--'
                  : accessor
                  ? (produceData[accessor] as string) || '--'
                  : '--')}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default UserCard;
