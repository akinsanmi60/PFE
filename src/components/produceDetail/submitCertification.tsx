import ModalBaseWrapper from '@shared/ModalBase';
import ModalHeader from 'components/appNav/modalHeader';
import SubmitCertificationAgencySearch from './submitCertificationAgencySearch';
import { Resolver, useForm } from 'react-hook-form';
import ControlledInput from '@shared/Input/ControlledInput';
import { ISubmitCertificationFieldValues } from 'types/produce.type';
import CustomButton from '@shared/Button';
import { SubmitCertificationValidationSchema } from 'validation/addProduceValidation';
import { yupResolver } from '@hookform/resolvers/yup';

function SubmitCertification() {
  const certSubmitForm = useForm({
    defaultValues: {
      estimatedSendDate: '',
      agencyID: '',
    } as ISubmitCertificationFieldValues,
    resolver: yupResolver(
      SubmitCertificationValidationSchema,
    ) as Resolver<ISubmitCertificationFieldValues>,
  });

  const {
    handleSubmit,
    formState: { isValid, isDirty },
  } = certSubmitForm;

  const onFormSubmit = (data: ISubmitCertificationFieldValues) => {
    return data;
  };

  return (
    <ModalBaseWrapper
      modalBaseProp={{
        showCloseBtn: false,
        className: 'w-[500px] xlsm:w-[100%]',
      }}
    >
      <ModalHeader
        modalHeaderProp={{
          title: 'Submit For Certification',
          actionText: 'submitCertification',
        }}
      />
      <div className="flex flex-col gap-y-4">
        <SubmitCertificationAgencySearch certSubmitForm={certSubmitForm} />
        <ControlledInput
          control={certSubmitForm.control}
          name="estimatedSendDate"
          label="Estimated Send Date"
          type="date"
        />
        <div className="flex justify-end">
          <CustomButton
            className="w-2/5 text-primary-white"
            onClick={handleSubmit(onFormSubmit)}
            disabled={!isValid || !isDirty}
            variant={!isValid || !isDirty ? 'solid' : ''}
          >
            Submit Request
          </CustomButton>
        </div>
      </div>
    </ModalBaseWrapper>
  );
}

export default SubmitCertification;
