import { SetStateAction } from 'react';
import { InputSearchboxProp, IsearchFilterBox } from './searchFilter.type';
import { useDebouncedValue } from '@hooks/useDebounce';
import { Input, InputGroup } from '@chakra-ui/react';
import CustomButton from '@shared/Button';

export const InputSearchBox = (props: InputSearchboxProp) => {
  const {
    placeholder,
    onSetTermChange,
    term,
    useEndAdornment,
    useStartAdornment,
    className,
    borderColor = 'none',
    ...rest
  } = props;
  const debounceDelay = 150;
  const debouncedTerm = useDebouncedValue(term, debounceDelay);

  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    const newValue = e.target.value;

    onSetTermChange && onSetTermChange({ target: { value: newValue } });
  };

  return (
    <div>
      <InputGroup
        sx={{
          borderRadius: '10px',
          border: `${borderColor} solid 1px`,
          paddingY: '2px',
          backgroundColor: 'white',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: '10px',
          paddingRight: '10px',
        }}
        className="cursor-pointer"
      >
        {useStartAdornment && useStartAdornment}
        <Input
          {...rest}
          placeholder={placeholder}
          onChange={handleChange}
          value={debouncedTerm}
          className={`placeholder:text-[13px] cursor-pointer ${className}`}
          focusBorderColor="transparent"
          border={'none'}
          sx={{
            backgroundColor: 'transparent',
            '&:focus': {
              boxShadow: '0 0 0 0',
              border: '0 none',
              outline: '0 none',
            },
            '&:hover': {
              boxShadow: '0 0 0 0',
              border: '0 none',
              outline: '0 none',
            },
          }}
        />
        {debouncedTerm && useEndAdornment && useEndAdornment}
      </InputGroup>
    </div>
  );
};

const SearchFilterBox = ({
  searchBarProps,
  filterBtnsProps,
  action,
}: IsearchFilterBox) => {
  return (
    <div className="flex justify-between items-center gap-x-[20px] xlsm:flex-col xlsm:gap-y-[15px] xlsm:items-start">
      <div className="w-full">
        <InputSearchBox {...searchBarProps} />
      </div>
      <div className="flex gap-x-[10px]">
        {filterBtnsProps?.useFilterBtn && (
          <CustomButton
            className="text-primary-white"
            onClick={filterBtnsProps?.onClick}
          >
            Filter
          </CustomButton>
        )}
        {action}
      </div>
    </div>
  );
};

export default SearchFilterBox;
