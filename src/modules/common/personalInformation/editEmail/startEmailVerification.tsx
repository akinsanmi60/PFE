import { useAuthContext } from '@contexts/authContext';
import { useModalContext } from '@contexts/modalContext';
import CustomButton from '@shared/Button';
import ControlledInput from '@shared/Input/ControlledInput';
import { useForm } from 'react-hook-form';
import { useStartEmailVerification } from 'services/persionalInformationService';
import {
  IStartChangeEmailFormData,
  IStartEmailFormData,
} from 'types/personalSetting.type';

function StartEmailVerification({
  switchView,
}: {
  switchView: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { authUser } = useAuthContext();
  const { handleModalClose } = useModalContext();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      old_email: authUser?.email || '',
      new_email: '',
      password: '',
    },
    mode: 'all',
    //    resolver: yupResolver(changePasswordSchema),
  });

  const { mutate } = useStartEmailVerification({
    switchView,
    id: authUser?.id || '',
  });

  const onSubmit = (values: IStartChangeEmailFormData) => {
    const payload = {
      new_email: values.new_email,
      password: values.password,
    };
    mutate({ payload: payload as IStartEmailFormData });
  };

  return (
    <div>
      <p className="text-[20px] font-[600] leading-[28px]">
        Edit your Email Address
      </p>
      <form className="mt-[24px]">
        <div className="flex flex-col gap-y-[20px]">
          <ControlledInput
            control={control}
            label="Old Email"
            name="old_email"
            type="text"
            readonly
          />
          <ControlledInput
            control={control}
            label="New Email"
            name="new_email"
            type="text"
          />
          <ControlledInput
            control={control}
            label="Password"
            name="password"
            type="text"
          />
        </div>
        <div className="flex justify-end gap-x-4 mt-[30px] mb-[-40px] w-[100%]">
          <div className="flex items-center gap-[15px]">
            <CustomButton
              variant={'outline'}
              onClick={() => handleModalClose('phone')}
              className="border-primary-main border-[1px]  bg-transparent text-primary-main w-[120px]"
            >
              Decline{' '}
            </CustomButton>
            <CustomButton
              className="bg-primary-main text-primary-white w-[180px]"
              onClick={handleSubmit(onSubmit)}
            >
              Confirm{' '}
            </CustomButton>
          </div>
        </div>
      </form>
    </div>
  );
}

export default StartEmailVerification;
