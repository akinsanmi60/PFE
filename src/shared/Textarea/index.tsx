import { Box, Textarea } from '@chakra-ui/react';
import FormField from '@shared/formField';
import { ITextAreaProps } from './interface';
import { LegacyRef, forwardRef } from 'react';

const CustomTextArea = forwardRef(
  (props: ITextAreaProps, _ref: LegacyRef<HTMLInputElement>) => {
    const { helperText, label, placeholder, ...rest } = props;
    return (
      <FormField label={label} error={helperText}>
        <Box>
          <Textarea
            {...rest}
            placeholder={placeholder}
            size="md"
            maxLength={1500}
            // height={height}
            height={200}
            sx={{
              borderColor: '#0e2038',
            }}
            className="placeholder:text-[10px] cursor-pointer"
          />
        </Box>
      </FormField>
    );
  },
);

export default CustomTextArea;
