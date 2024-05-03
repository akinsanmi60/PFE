function PageTile({
  useTextBtn = true,
  actionArray,
  title,
  useBorder = true,
}: {
  useTextBtn?: boolean;
  actionArray?: {
    name: string;
    action: () => void;
  }[];
  title?: string;
  useBorder?: boolean;
}) {
  return (
    <div
      className={`flex justify-between items-center ${
        useBorder
          ? 'border-b-[1px] border-background-borderlight-1 pb-[18px]'
          : ''
      }`}
    >
      <div>
        <p className="text-[20px] font-[600] leading-[28px]">{title}</p>
      </div>

      {useTextBtn && (
        <div className="flex gap-[18px] items-center text-[13px]">
          {actionArray?.map(action => (
            <p
              key={action.name}
              onClick={action.action}
              className="hover:cursor-pointer hover:font-[400] hover:underline hover:text-statusText-success"
            >
              {action.name}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default PageTile;
