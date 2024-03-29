import { useMemo } from 'react';
import { twMerge } from 'tailwind-merge';
import { IButtonProps } from './interface';
import { Button, CircularProgress } from '@chakra-ui/react';

const CustomButton = ({
  btnColor,
  variant,
  className: _className,
  loading,
  loadingText,
  children,
  disabled,
  role,
  btnText,
  ...rest
}: IButtonProps) => {
  const props = useMemo(() => {
    switch (btnColor) {
      case 'secondary': {
        let className = '';
        if (variant === 'outlined') {
          className = '!bg-white !text-gray-600 !border-gray-200';
        } else if (variant === 'contained') {
          className =
            '!bg-gray-50 !text-gray-800 !border-solid !border-[1px] !border-gray-100';
        }

        return {
          className,
        };
      }
      case 'error': {
        let className = '';
        if (variant === 'outlined') {
          className = ' !text-red-500 border-[1px] !border-red-500';
        } else if (variant === 'contained') {
          className = '!bg-red-600 !text-white';
        }

        return {
          className,
        };
      }
      default: {
        return {
          className:
            'tracking-normal py-[8px] duration-300 ease-in-out px-[32px] outline-none text-base cursor-pointer font-medium  bg-secondary-light-1 text-white focus:outline-none xlsm:text-[1rem]',
        };
      }
    }
  }, [btnColor, variant]);

  const { className } = props;
  return (
    <Button
      variant={variant}
      isDisabled={disabled}
      role={role}
      sx={{
        borderRadius: '8px',
        paddingY: '22px',
        borderColor:
          variant === 'outlined' ? 'border-secondary-light-1' : 'none',
      }}
      className={twMerge(className, _className)}
      {...rest}
    >
      {loading ? (
        <>
          <CircularProgress
            color="white"
            isIndeterminate
            size="18px"
            mr="1"
            thickness="14px"
          />{' '}
          {loadingText}
        </>
      ) : (
        children || btnText
      )}
    </Button>
  );
};

Button.defaultProps = {
  variant: 'contained',
};

export default CustomButton;
