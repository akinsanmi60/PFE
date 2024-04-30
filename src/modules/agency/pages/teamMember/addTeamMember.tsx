import { teamAgentOptions, teamRoleOptions } from '@db/produceData';
import CustomButton from '@shared/Button';
import ControlledInput from '@shared/Input/ControlledInput';
import ModalBaseWrapper from '@shared/ModalBase';
import ControlledSelect from '@shared/Select/ControlledSelect';
import ModalHeader from 'components/appNav/modalHeader';
import { useForm } from 'react-hook-form';
import { useTeamCreationMutation } from 'services/agency.service';
import { ITeamCreateType } from 'types/admin.type';
import { AddNewTeamSchema } from 'validation/AdminAgencyValidation';
import { yupResolver } from '@hookform/resolvers/yup';

function AddTeamMember({ id }: { id: string }) {
  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid },
    reset,
  } = useForm({
    defaultValues: {
      agent_email: '',
      agent_full_name: '',
      agent_phone_number: '',
      agent_role: '',
      agency_type: '',
    },
    resolver: yupResolver(AddNewTeamSchema),
  });

  const { mutate, isLoading } = useTeamCreationMutation({ resetForm: reset });

  const submitForm = (data: ITeamCreateType) => {
    let agent_phone_number;
    let payload;

    if (data.agent_phone_number?.startsWith('0')) {
      agent_phone_number = data.agent_phone_number.replace('0', '+234');
      payload = { ...data, agent_phone_number };
    } else {
      payload = data;
    }

    mutate({ payload: payload, id: id });
  };

  return (
    <div>
      <ModalBaseWrapper
        modalBaseProp={{
          showCloseBtn: false,
          className: 'w-[450px] xlsm:w-full',
        }}
      >
        <div className="p-[6px]">
          <ModalHeader
            modalHeaderProp={{
              title: 'Add Team Member',
              actionText: 'addTeamMember',
            }}
          />
          <form action="" className="w-full flex flex-col gap-y-4">
            <div>
              <ControlledInput
                control={control}
                name="agent_full_name"
                label="Agent Full Name"
                placeholder="Enter agent full name"
              />
            </div>
            <div>
              <ControlledInput
                control={control}
                name="agent_phone_number"
                label="Agent Phone Number"
                placeholder="Enter agent phone number"
              />
            </div>
            <div className="w-full">
              <ControlledInput
                control={control}
                name="agent_email"
                label="Agency Email"
                placeholder="Enter user email"
              />
            </div>

            <div>
              <ControlledSelect
                control={control}
                name="agent_role"
                label="Agent Role"
                placeholder="Please select agent role"
                options={teamRoleOptions}
              />
            </div>
            <div>
              <ControlledSelect
                control={control}
                name="agency_type"
                label="Agency State"
                placeholder="Please select agency address"
                options={teamAgentOptions}
              />
            </div>

            <CustomButton
              className='"w-full text-primary-white mt-[30px]'
              onClick={handleSubmit(submitForm)}
              disabled={!isValid || !isDirty}
              loadingText="Loading..."
              loading={isLoading}
              variant={!isDirty || !isValid ? 'solid' : ''}
            >
              Create Agent
            </CustomButton>
          </form>
        </div>
      </ModalBaseWrapper>
    </div>
  );
}

export default AddTeamMember;
