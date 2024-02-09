import { useModalContext } from '@contexts/modalContext';
import { useForm } from 'react-hook-form';
import { verifyPasswordSchema } from 'validation/changePasswordValidation';
import { yupResolver } from '@hookform/resolvers/yup';
import ControlledInput from '@shared/Input/ControlledInput';
import { useFormData } from '@contexts/formContext';
import CustomButton from '@shared/Button';
import { IVerifyProp } from 'types/auth.type';
import { useVerifyMutation } from 'services/auth.service';

function VerifyEmail() {
  const { multiFormValues } = useFormData();
  const { handleModalClose } = useModalContext();
  const { mutate, isLoading } = useVerifyMutation();

  const { control, handleSubmit } = useForm<IVerifyProp>({
    defaultValues: {
      code: '',
    },
    mode: 'all',
    resolver: yupResolver(verifyPasswordSchema),
  });

  const onSubmit = (values: IVerifyProp) => {
    mutate({ payload: values });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <div className="flex justify-end w-[470px] mb-[10px]">
          <div
            className="bg-white shadow-md h-[30px] w-[30px] rounded-full flex justify-center items-center cursor-pointer"
            onClick={() => handleModalClose('transactionModal')}
          >
            X
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-lg w-[450px] p-[20px] rounded-[15px]"
        >
          <h1 className="font-[500] text-[20px] tracking-normal leading-[24px]">
            {`          Kindly provide the verification code that you have received through
          email ${multiFormValues?.email}. Please make sure to enter it accurately. `}
          </h1>

          <div className=" mt-[20px]">
            <ControlledInput
              control={control}
              label="Enter verification code"
              name="code"
              type="text"
            />
          </div>

          <div className="mt-[30px]">
            <CustomButton
              className="btn-primary-min w-full"
              loading={isLoading}
              loadingText="Verifying..."
              type="submit"
            >
              Verify Email
            </CustomButton>
          </div>
        </form>
      </div>
    </div>
  );
}

export default VerifyEmail;
