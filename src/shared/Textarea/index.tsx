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
            maxLength={1000}
            height={100}
            sx={{
              borderColor: '#E6E6E6',
              borderRadius: '10px',
              paddingY: '4px',
            }}
          />
        </Box>
      </FormField>
    );
  },
);

export default CustomTextArea;
