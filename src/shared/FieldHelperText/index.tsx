import { IFieldHelperTextProps } from './interface';

const FieldHelperText = ({ helperText, error }: IFieldHelperTextProps) => {
  return helperText ? (
    <p
      className={`text-[12px] ${
        error ? 'text-cancel-red-main' : 'text-gray-500'
      }  font-[400] mt-[1px]`}
    >
      {helperText}
    </p>
  ) : null;
};

export default FieldHelperText;
