import { IFilterModalProps } from './interface';
import { twMerge } from 'tailwind-merge';
import Button from 'shared/Button';
import ModalBase from './ModalBase';
import { FieldValues } from 'react-hook-form';
import { useEffect, useState } from 'react';

const defaultAction = {
  show: true,
  text: 'Apply Filter',
};
const FilterModal = <TFieldValues extends FieldValues>({
  onClose,
  children,
  header,
  action: propsAction,
  showClearAll,
  form,
}: IFilterModalProps<TFieldValues>) => {
  const [prevValues, setPrevValues] = useState<TFieldValues>(
    {} as TFieldValues,
  );

  useEffect(() => {
    setPrevValues(form.getValues());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const action = {
    ...defaultAction,
    ...propsAction,
  };

  const onModalClose = () => {
    form.reset(prevValues);
    onClose();
  };

  const clearForm = () => {
    form.reset();
  };

  return (
    <ModalBase
      onClose={onModalClose}
      header={
        <div className="font-[600] text-gray-800 text-[16px] w-full flex justify-between">
          {header ? header : 'Filter'}
          {showClearAll && (
            <span
              className="text-cancel-red-main text-[13px] font-[400] cursor-pointer"
              onClick={clearForm}
            >
              Clear All
            </span>
          )}
        </div>
      }
    >
      <div className="pt-[16px] grid gap-[24px]">{children}</div>
      {action?.show && action?.text && (
        <div className="w-full mt-[16px] pt-[24px]">
          <Button
            className={twMerge('w-full', action?.className)}
            onClick={action?.onClick}
            loading={action?.loading}
            loadingText={action?.loadingText}
            disabled={action?.disabled}
            variant={action?.variant}
            color={action?.color}
          >
            {action?.text}
          </Button>
        </div>
      )}
    </ModalBase>
  );
};

FilterModal.defaultProps = {
  action: defaultAction,
  showClearAll: true,
};

export default FilterModal;
