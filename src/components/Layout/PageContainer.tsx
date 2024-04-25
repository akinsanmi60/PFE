import { twMerge } from 'tailwind-merge';

export type IPageContainerProps = {
  children?: React.ReactNode;
  className?: string;
};

export default function PageContainer({
  children,
  className,
}: IPageContainerProps) {
  return (
    <div className={twMerge('px-6 py-5 xlsm:px-3', className)}>{children}</div>
  );
}
