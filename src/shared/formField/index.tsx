import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import { capitalize } from '@utils/constants';

type FormFieldProp = {
  label?: string;
  error?: string;
  children: React.ReactNode;
  name?: string;
};

function FormField({ error, label, children, name }: FormFieldProp) {
  return (
    <FormControl isInvalid={Boolean(error)}>
      <FormLabel
        fontSize={14}
        htmlFor={name}
        mb={1}
        sx={{
          fontWeight: '600',
        }}
        className="text-[#1A1A1A]"
      >
        {label}
      </FormLabel>
      {children}
      {error && (
        <FormErrorMessage className="font-bold" fontSize={10} mt="0.5">
          {error ? capitalize(error) : ''}
        </FormErrorMessage>
      )}
    </FormControl>
  );
}

export default FormField;
