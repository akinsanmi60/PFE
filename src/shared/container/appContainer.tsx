import { twMerge } from 'tailwind-merge';

type IPageContainerProps = {
  children?: React.ReactNode;
  className?: string;
};

export default function AppContainer({
  children,
  className,
}: IPageContainerProps) {
  return <div className={twMerge('px-[20px]', className)}>{children}</div>;
}
