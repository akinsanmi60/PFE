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
    <div
      className={twMerge(
        'grid gap-5 auto-rows-max-auto px-6 py-5 min-h-full',
        className,
      )}
    >
      {children}
    </div>
  );
}
