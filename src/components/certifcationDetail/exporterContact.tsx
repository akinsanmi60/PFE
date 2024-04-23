import { IRowBody } from '@shared/HubTable/type';
import { capitalize } from '@utils/constants';
import DetailCard from 'components/produceDetail/detailCard';

function ExporterContact<TData extends IRowBody>({
  certDetail,
}: {
  certDetail: TData;
}) {
  const detailAColumnsTitleA: {
    label: string;
    accessor: keyof TData | null;
    render?: (_object: TData) => React.ReactNode;
  }[] = [
    {
      label: 'Comany Name',
      accessor: '',
      render: ({ exporter_name }) => {
        return capitalize(exporter_name);
      },
    },
    {
      label: 'Email',
      accessor: '',
      render: ({ export: { email } }) => {
        return email;
      },
    },
    {
      label: 'Phone',
      accessor: '',
      render: ({ export: { phone_number } }) => {
        return phone_number;
      },
    },
    {
      label: 'Company Address',
      accessor: '',
      render: ({ export: { coy_address } }) => {
        return capitalize(coy_address);
      },
    },
  ];
  return (
    <div className="border border-background-borderlight-1 rounded-[16px] p-[20px]">
      <p className="text-[16px] font-[600] text-primary-main ">
        Exporter Contact
      </p>
      <hr className=" bg-background-borderlight-1 my-[15px]" />
      <div>
        <DetailCard
          detailProps={{
            detailKeys: detailAColumnsTitleA,
            produceData: certDetail,
          }}
        />
      </div>
    </div>
  );
}

export default ExporterContact;
