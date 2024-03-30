import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import ControlledSelect from '@shared/Select/ControlledSelect';
import ControlledInput from '@shared/Input/ControlledInput';
import ControlledTextArea from '@shared/Textarea/ControlledInput';
import CustomButton from '@shared/Button';
import { givenState } from '@db/general';

type FormValue = {
  first_name: string;
  last_name: string;
  email: string;
  message: string;
  phone: string;
  reason: string;
  address: string;
  state: string;
};

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

const schema = yup
  .object({
    email: yup
      .string()
      .required()
      .matches(
        EMAIL_REGEX,
        'Please enter a valid email address',
      ) as yup.StringSchema<string>,
    first_name: yup.string().required(),
    last_name: yup.string().required(),
    message: yup.string().required(),
    phone: yup.string().required(),
    reason: yup.string().required(),
    address: yup.string().required(),
    state: yup.string().required(),
  })
  .required();

function ContactForm() {
  const {
    handleSubmit,
    reset,
    control,
    formState: { isDirty, isValid },
  } = useForm<FormValue>({
    resolver: yupResolver(schema),
  });

  const formSubmit = async (data: FormValue) => {
    reset();
    return data;
  };

  return (
    <div className="w-[690px] lg:w-[550px] xlsm:w-full bg-[#FFFFFF] rounded-[16px] shadow-lg xlsm:shadow-none p-[40px] xlsm:px-[0px] xlsm:py-[16px]">
      <div className="">
        <form
          onSubmit={handleSubmit(formSubmit)}
          className="flex flex-col gap-[32px]"
        >
          <div className="">
            <ControlledSelect
              optionArray={[
                'I’d like to ask for a demo',
                'I need information on Pricing',
                'I need customer support',
              ]}
              name="reason"
              control={control}
              placeholder="Select reason for Contacting Us "
            />
          </div>

          <div className=" flex gap-[24px] xlsm:flex-col xlsm:gap-[32px]">
            <div className="w-full">
              <ControlledInput
                name="first_name"
                placeholder="Enter First name"
                control={control}
              />
            </div>
            <div className="w-full">
              <ControlledInput
                name="last_name"
                placeholder="Enter Last name"
                control={control}
              />
            </div>
          </div>

          <div className=" flex gap-[24px] xlsm:flex-col xlsm:gap-[32px]">
            <ControlledInput
              name="email"
              placeholder="Enter your email"
              control={control}
            />
          </div>

          <div className="w-full">
            <ControlledInput
              name="phone"
              placeholder="Enter Phone Number"
              control={control}
            />
          </div>

          <div className="flex gap-[24px] xlsm:flex-col xlsm:gap-[32px]">
            <div className="w-full">
              <ControlledInput
                name="address"
                placeholder="Enter Address"
                control={control}
              />
            </div>

            <div className="w-full">
              <ControlledSelect
                optionArray={givenState()}
                name="state"
                control={control}
                placeholder="Select State"
              />
            </div>
          </div>

          <div className="w-full">
            <ControlledTextArea
              control={control}
              name="message"
              placeholder="Enter your message"
            />
          </div>
          <div className="flex justify-end  w-full">
            <CustomButton
              disabled={!isValid || !isDirty}
              variant={!isValid || !isDirty ? 'solid' : ''}
              className="text-primary-white w-[120px]"
            >
              {'Submit'}
            </CustomButton>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactForm;
