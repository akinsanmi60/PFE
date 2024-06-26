import { DetailedHTMLProps, LabelHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

const FieldLabel = (
  props: DetailedHTMLProps<
    LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  >,
) => {
  return (
    <label
      {...props}
      className={twMerge(
        'text-[12px] text-gray-700 font-[400] align-left gap-[6px] block mb-[8px]',
        props.className,
      )}
    />
  );
};

export default FieldLabel;
