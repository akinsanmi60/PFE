import ModalBaseWrapper from '@shared/ModalBase';
import ModalHeader from 'components/appNav/modalHeader';
import { ITransferedProduceData } from 'types/produce.type';
import defaultImage from '@assets/png/hubImgDefault.png';
import CustomButton from '@shared/Button';
import { ReactComponent as CallingPhone } from '@assets/svg/callingPhoneWhite.svg';
import { formatDate } from '@utils/constants';
import TransferRenderButton from '../../../../components/transferProduce/transferRenderButton';

const detailKeys = [
  'Quantity',
  'Unit',
  'Harvest Date',
  'Sent on',
  'Farm Location',
];

function ReceivedTransferProduceDetail({
  transferDetail,
}: {
  transferDetail: ITransferedProduceData | null;
}) {
  const returnString = () => {
    return (
      transferDetail?.created_at &&
      formatDate({ date: transferDetail?.created_at as string })
    );
  };

  const detailValue = [
    transferDetail?.qty_in_transefer,
    transferDetail?.unit,
    transferDetail?.harvest_date ? transferDetail?.harvest_date : 'N/A',
    returnString(),
    transferDetail?.from_location,
  ];

  return (
    <ModalBaseWrapper
      modalBaseProp={{
        showCloseBtn: false,
        className: 'w-[700px]',
      }}
    >
      <div className="p-[6px]">
        <div className="flex justify-between items-center">
          <div>
            <ModalHeader
              modalHeaderProp={{
                title: 'Transfer Detail',
                actionText: 'toTransferDetailProduce',
              }}
            />
          </div>
          <div>
            {transferDetail?.transfer_status === 'in_progress' && (
              <TransferRenderButton id={transferDetail?.id as string} />
            )}
          </div>
        </div>

        <div className="border border-background-borderlight-1 rounded-[16px] p-[20px]">
          <div className="grid grid-cols-3 gap-x-[20px] w-full">
            {Array(3)
              .fill(defaultImage)
              .map((image, i) => (
                <img
                  key={`image-${i}`}
                  src={image}
                  alt="image"
                  className="h-[150px] w-[100%]"
                />
              ))}
          </div>

          <div className="flex gap-x-[20px] w-full mt-[24px]">
            <div className="w-full">
              <div className="h-[167px]">
                <div>
                  <p className="font-[500] text-[17px] leading-[25px] text-primary-main">
                    Produce Name
                  </p>
                  <p className="font-[400] text-[14px] leading-[20px] text-primary-lighter">
                    {transferDetail?.produce_name}
                  </p>
                </div>
                <div className="mt-[14px]">
                  <p className="font-[500] text-[17px] leading-[25px] text-primary-main">
                    Produce Description
                  </p>
                  <p className="text-ellipsis line-clamp-4 font-[400] text-[14px] leading-[20px] text-primary-lighter">
                    {transferDetail?.description
                      ? transferDetail?.description
                      : 'No Description'}
                  </p>
                </div>
              </div>
              <hr className=" bg-background-borderlight-1 my-[15px]" />
              <div className="flex gap-x-[10px] w-full">
                <div className="flex flex-col gap-y-[10px] w-full">
                  {detailKeys.map(item => (
                    <p
                      key={item}
                      className="font-[400] text-[14px] leading-[20px] text-primary-main"
                    >
                      {item}
                    </p>
                  ))}
                </div>
                <div className="flex flex-col gap-y-[10px] w-full">
                  {detailValue.map(itemVal => (
                    <p
                      key={itemVal}
                      className="font-[600] text-[14px] leading-[20px] text-primary-main text-ellipsis line-clamp-3"
                    >
                      {itemVal}
                    </p>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-full">
              <div className="rounded-[16px] bg-primary-white p-[20px] shadow-lg h-[180px] flex flex-col justify-between">
                <p className="bg-[#DAFBEC] py-[2px] px-[12px] text-statusText-success font-[500] text-center rounded-lg w-[50%]">
                  {transferDetail?.from_user_type}
                </p>
                <h1 className="font-[500] text-[20px] leading-[28px] tracking-normal">
                  {transferDetail?.from_owner}
                </h1>
                <CustomButton className="w-full flex items-center gap-[4px] text-primary-white">
                  <a href={`tel:${transferDetail?.from_phone}}`}>
                    <span className="text-[15px] font-[500]">Call Me</span>
                  </a>
                  <span className="h-[20px] w-[20px]">
                    <CallingPhone />
                  </span>
                </CustomButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModalBaseWrapper>
  );
}

export default ReceivedTransferProduceDetail;
