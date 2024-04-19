import ModalBaseWrapper from '@shared/ModalBase';
import ModalHeader from 'components/appNav/modalHeader';
import SubmitCertificationAgencySearch from './submitCertificationAgencySearch';
import { Resolver, useForm } from 'react-hook-form';
import ControlledInput from '@shared/Input/ControlledInput';
import { ISubmitCertificationFieldValues } from 'types/produce.type';
import CustomButton from '@shared/Button';
import { SubmitCertificationValidationSchema } from 'validation/addProduceValidation';
import { yupResolver } from '@hookform/resolvers/yup';
import ControlledSelect from '@shared/Select/ControlledSelect';
import ControlledTextArea from '@shared/Textarea/ControlledInput';
import { useSubmitCertification } from 'services/exporter.service';
import { useAuthContext } from '@contexts/authContext';
import { checkDateRange } from '@utils/constants';
import { toast } from 'react-toastify';
import { toastOptions } from '@shared/Toast/Toast';

const option = [
  { label: 'Treated', value: 'treated' },
  { label: 'Not Treated', value: 'notTreated' },
];

const treatmentDuration = [
  { label: '< 1 month', value: '< 1 month' },
  { label: '2 months', value: '2 months' },
  { label: '3 months', value: '3 months' },
  { label: '> 3 months', value: '> 3 months' },
];

function SubmitCertification({ id }: { id: string }) {
  const { authUser } = useAuthContext();
  const certSubmitForm = useForm({
    defaultValues: {
      send_date: '',
      agencyID: '',
      is_treated: '',
      treatment_name: '',
      shipment_date: '',
      treatment_duration: '',
    } as ISubmitCertificationFieldValues,
    resolver: yupResolver(
      SubmitCertificationValidationSchema,
    ) as Resolver<ISubmitCertificationFieldValues>,
  });

  const {
    handleSubmit,
    watch,
    formState: { isValid, isDirty },
  } = certSubmitForm;

  const { mutate, isLoading } = useSubmitCertification({
    resetForm: certSubmitForm.reset,
  });

  const viewTextArea = watch('is_treated') === 'treated' ? true : false;

  const onFormSubmit = (data: ISubmitCertificationFieldValues) => {
    const { isWithinRange } = checkDateRange(
      new Date(data.send_date as string),
      new Date(data.shipment_date as string),
    );

    if (isWithinRange) {
      return toast.error(
        'Please select shipment date within send date',
        toastOptions,
      );
    }

    const toSend = {
      send_date: data.send_date,
      is_treated: data.is_treated === 'treated' ? true : false,
      treatment_name: viewTextArea ? data.treatment_name : '',
      shipment_date: data.shipment_date,
      treatment_duration: viewTextArea ? data.treatment_duration : '',
    };

    const toSendId = {
      agencyID: data.agencyID as string,
      produceID: id,
      exporterID: authUser?.id as string,
    };

    mutate({ payload: toSend, idData: toSendId });
  };

  return (
    <ModalBaseWrapper
      modalBaseProp={{
        showCloseBtn: false,
        className: 'w-[550px] xlsm:w-[100%]',
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

        <div className="flex  gap-x-4 xlsm:flex-col xlsm:gap-y-4">
          <ControlledInput
            control={certSubmitForm.control}
            name="send_date"
            label="Estimated Send Date"
            type="date"
            useDataMaxLength={false}
          />
          <ControlledSelect
            control={certSubmitForm.control}
            name="is_treated"
            label="Is This Sample Treated:"
            options={option}
            placeholder="Please select"
          />
        </div>
        <div className="flex  gap-x-4 xlsm:flex-col xlsm:gap-y-4">
          <ControlledInput
            control={certSubmitForm.control}
            name="shipment_date"
            label="Estimated Shipment Date"
            type="date"
            useDataMaxLength={false}
          />
          {viewTextArea && (
            <ControlledSelect
              control={certSubmitForm.control}
              name="treatment_duration"
              label="Treatment Duration:"
              options={treatmentDuration}
              placeholder="Please select"
            />
          )}
        </div>

        {viewTextArea && (
          <ControlledTextArea
            name="treatment_name"
            label="Treatment Names"
            placeholder="Enter Treatment Names"
            control={certSubmitForm.control}
          />
        )}
        <div className="flex justify-end">
          <CustomButton
            className="w-2/5 text-primary-white"
            onClick={handleSubmit(onFormSubmit)}
            disabled={!isValid || !isDirty || isLoading}
            variant={!isValid || !isDirty || isLoading ? 'solid' : ''}
            isLoading={isLoading}
            loadingText="Submitting..."
          >
            Submit Request
          </CustomButton>
        </div>
        <div className="text-[12px]">
          <p>Notes</p>
          <ul className="list-decimal px-[20px] leading-5">
            <li>
              Seed samples should be approximately lunch bag or quart jar size.
            </li>
            <li>
              There is a $30.00 fee per sample for testing. Bills will the be
              sent on acknowledgement of this request.
            </li>
            <li>
              Test results will be mailed the same day they are completed.
            </li>
          </ul>
        </div>
      </div>
    </ModalBaseWrapper>
  );
}

export default SubmitCertification;
