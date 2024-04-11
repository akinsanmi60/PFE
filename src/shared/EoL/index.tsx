import useIntersectionObserver from '@hooks/useIntersectionObserver';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import CircularProgress from 'shared/CircularProgress';

type IEoLProps = {
  config: IntersectionObserverInit;
  showLoader?: boolean;
  // eslint-disable-next-line no-unused-vars
  onVisible: (entryItem: IntersectionObserverEntry) => void;
};
const EoL = forwardRef<HTMLDivElement, IEoLProps>(
  ({ config, showLoader, onVisible }, ref) => {
    const EoLRef = useRef<HTMLDivElement>(null);
    useIntersectionObserver(EoLRef, config, onVisible);
    useImperativeHandle(
      ref,
      () => {
        return EoLRef.current as HTMLDivElement;
      },
      [],
    );

    return !showLoader ? (
      <div ref={EoLRef} className="w-full h-[1px]"></div>
    ) : (
      <div className="w-full flex justify-center items-center mt-[5px]">
        <CircularProgress />
      </div>
    );
  },
);

export default EoL;
