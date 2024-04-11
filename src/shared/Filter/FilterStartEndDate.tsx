import { FieldValues } from 'react-hook-form';
import ControlledInput from 'shared/Input/ControlledInput';
import { IFilterStartEndDate } from 'shared/interface';
import { twMerge } from 'tailwind-merge';

const FilterStartEndDate = <TFieldValue extends FieldValues>(
  props: IFilterStartEndDate<TFieldValue>,
) => {
  const { label, className, startLabel, endLabel, name } = props;

  const cellsClassName = twMerge(
    'w-full border !px-[10px] !py-[15px] leading-[18px] rounded-[8px]',
    props.cellsClassName,
  );
  return (
    <div className={className}>
      {label && (
        <div className="flex justify-between w-full mb-[8px] px-[16px]">
          <p className="text-[13px] text-[#475569] font-[500]">{label}</p>
        </div>
      )}

      <div className="flex items-center gap-x-[10px]">
        <div className="w-1/2 h-max">
          <div className={cellsClassName}>
            <p className="w whitespace-nowrap text-[12px] text-[#475569]">
              {startLabel}
            </p>
          </div>
        </div>
        <div className="w-1/2 h-max">
          <div className={cellsClassName}>
            <p className="w whitespace-nowrap text-[12px] text-[#475569]">
              {endLabel}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-[10px] mt-[10px]">
        <div className="w-1/2 h-max">
          <ControlledInput
            control={props.control}
            name={name.start}
            type="date"
            className={cellsClassName}
          />
        </div>
        <div className="w-1/2 h-max">
          <ControlledInput
            control={props.control}
            name={name.end}
            type="date"
            className={cellsClassName}
          />
        </div>
      </div>
    </div>
  );
};

FilterStartEndDate.defaultProps = {
  type: 'block',
  startLabel: 'Start',
  endLabel: 'End',
};

export default FilterStartEndDate;
