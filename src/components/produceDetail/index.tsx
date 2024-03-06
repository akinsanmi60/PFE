import CustomButton from '@shared/Button';
import ModalBaseWrapper from '@shared/ModalBase';
import { formatDate } from '@utils/constants';
import { IProduceItemList } from 'types/pentrarHub.type';
import { ReactComponent as CallingPhone } from '@assets/svg/callingPhoneWhite.svg';
import { ReactComponent as LeftChevron } from '@assets/svg/leftChevron.svg';
import { useModalContext } from '@contexts/modalContext';

const detailKeys = ['Quantity', 'Unit', 'Harvest Date', 'Farm Location'];

function OnHubProduceDetail({
  modalProduceDetail,
}: {
  modalProduceDetail: IProduceItemList | null;
}) {
  const { handleModalClose } = useModalContext();
  const detailValue = [
    modalProduceDetail?.quantity,
    modalProduceDetail?.unit,
    formatDate({
      date: modalProduceDetail?.harvest_date as string,
    }),
    modalProduceDetail?.state,
  ];
  return (
    <ModalBaseWrapper
      modalBaseProp={{
        formWidth: '700px',
        showCloseBtn: false,
      }}
    >
      <div className="p-[6px]">
        <div className="flex items-center gap-x-1 mb-[14px]">
          <LeftChevron
            className="inline-block mr-2 cursor-pointer"
            onClick={() => handleModalClose('hubProduceDetail')}
          />
          <h2>Produce Detail</h2>
        </div>
        <div className="border border-background-borderlight-1 rounded-[16px] px-[20px] mb-[-40px]">
          <p className="font-[400] text-[12px] leading-[17px] text-primary-main mt-[15px] mb-[8px]">
            ID: <span className="font-[500] ">{modalProduceDetail?.id}</span>
          </p>

          <div className="grid grid-cols-3 gap-x-[20px] w-full">
            {modalProduceDetail?.images?.map((image, i) => (
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
                    {modalProduceDetail?.name}
                  </p>
                </div>
                <div className="mt-[14px]">
                  <p className="font-[500] text-[17px] leading-[25px] text-primary-main">
                    Produce Description
                  </p>
                  <p
                    className="text-ellipsis line-clamp-4 font-[400] text-[14px] leading-[20px] text-primary-lighter"
                    title={modalProduceDetail?.description}
                  >
                    {modalProduceDetail?.description}
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Odit voluptatibus at tenetur quas nemo amet nesciunt! Vel
                    culpa explicabo voluptas numquam dolor debitis accusamus
                    suscipit, consectetur ex mollitia est illum?
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
                      className="font-[600] text-[14px] leading-[20px] text-primary-main"
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
                  Aggregator
                </p>
                <h1 className="font-[500] text-[20px] leading-[28px] tracking-normal">
                  Full Name
                </h1>
                <CustomButton className="w-full flex items-center gap-[4px] text-primary-white">
                  <span className="text-[15px] font-[500]">Call Me</span>
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

export default OnHubProduceDetail;
