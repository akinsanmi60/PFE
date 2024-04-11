import { FieldValues } from 'react-hook-form';
import { useEffect, useState } from 'react';
import ModalBaseWrapper from './';
import Button from '@shared/Button';
import { twMerge } from 'tailwind-merge';
import { IFilterModalProps } from './modalBaseType';

const defaultAction = {
  show: true,
  text: 'Apply Filter',
};
const FilterModal = <TFieldValues extends FieldValues>({
  modalBaseProp: { onClose, header, clearAll },
  children,
  action: propsAction,
  showClearAll,
  form,
}: IFilterModalProps<TFieldValues>) => {
  const [prevValues, setPrevValues] = useState<TFieldValues>(
    {} as TFieldValues,
  );

  useEffect(() => {
    setPrevValues(form.getValues());
  }, [form]);

  const action = {
    ...defaultAction,
    ...propsAction,
  };

  const onModalClose = () => {
    form.reset(prevValues);
    onClose?.();
  };

  const clearForm = () => {
    form.reset();
    clearAll?.();
  };

  const filterHeader = () => {
    return (
      <div className="font-[600] text-gray-800 text-[16px] w-full flex justify-between px-[16px] border-b border-gray-100">
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
    );
  };

  return (
    <ModalBaseWrapper
      modalBaseProp={{
        showCloseBtn: true,
        onClose: onModalClose,
        className: 'w-[100%] p-[0px]',
      }}
    >
      <div className="">
        {filterHeader()}
        <div className="mt-[30px] grid gap-[24px]">
          {children}
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
      </div>
    </ModalBaseWrapper>
  );
};

FilterModal.defaultProps = {
  action: defaultAction,
  showClearAll: true,
};

export default FilterModal;
