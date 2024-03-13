import { IRowBody } from '@shared/HubTable/type';

type IDetailProps<TData> = {
  detailProps: {
    detailKeys: {
      label: string;
      accessor: keyof TData | null;
      render?: ((_object: TData) => React.ReactNode) | undefined;
    }[];

    produceData: TData;
  };
};

function DetailCard<TData extends IRowBody>({
  detailProps,
}: IDetailProps<TData>) {
  const { detailKeys, produceData } = detailProps;
  return (
    <div className="flex flex-col gap-y-[15px] w-full">
      {detailKeys.map(({ label, accessor, render }) => {
        return (
          <div key={label} className="flex w-full items-center justify-between">
            <div className="w-full">
              <p className="font-[400] text-[14px] leading-[20px] text-primary-main">
                {label}
              </p>
            </div>

            <div className="w-full">
              <p className="font-[600] text-[14px] leading-[20px] text-primary-main">
                {produceData &&
                  (render
                    ? render(produceData) || '--'
                    : accessor
                    ? (produceData[accessor] as string) || '--'
                    : '--')}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default DetailCard;
