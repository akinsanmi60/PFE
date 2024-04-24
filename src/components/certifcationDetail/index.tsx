import { ICertDetail } from 'types/certification.type';
import defaultImage from '@assets/png/hubImgDefault.png';
import { capitalize } from '@utils/constants';
import ExporterContact from './exporterContact';
import DetailCard from 'components/produceDetail/detailCard';
import CertificatioDetailColumnHead from './detailColumnHead';
import StatusWithAction from './statusWithAction';

function CertifcationDetail({ certDetail }: ICertDetail) {
  const { certData } = certDetail;
  const { detailColumnsHeadTitleA } = CertificatioDetailColumnHead();

  return (
    <div className="border border-background-borderlight-1 rounded-[16px] p-[20px]">
      <p className="font-[400] text-[12px] leading-[17px] text-primary-main mb-[8px]">
        ID:{' '}
        <span className="font-[500] ">
          {certData?.certification_id || '--'}
        </span>
      </p>

      {/* Images */}
      <div className="grid grid-cols-4 gap-x-[10px] w-full xlsm:grid-cols-1 xlsm:gap-y-4">
        {certData?.produce?.images?.length
          ? certData?.produce?.images?.map((image, i) => {
              return (
                <img
                  key={`image-${i}`}
                  src={image}
                  alt="image"
                  className="h-[150px] w-[100%]"
                />
              );
            })
          : Array(4)
              .fill(defaultImage)
              .map((image, i) => (
                <img
                  key={`image-${i}`}
                  src={image}
                  alt="image"
                  className="h-[190px] w-[100%]"
                />
              ))}
      </div>
      {/* Images */}

      {/*  */}
      <div className="flex gap-x-[20px] w-full mt-[24px] sixm:flex-col sixm:gap-y-7">
        <div className="w-full">
          <div className="h-[167px]">
            <div>
              <p className="font-[500] text-[17px] leading-[25px] text-primary-main">
                Produce Name
              </p>
              <p className="font-[400] text-[14px] leading-[20px] text-primary-lighter">
                {capitalize(certData?.produce?.name) || '--'}
              </p>
            </div>
            <div className="mt-[14px]">
              <p className="font-[500] text-[17px] leading-[25px] text-primary-main">
                Produce Description
              </p>
              <p
                className="text-ellipsis line-clamp-4 font-[400] text-[14px] leading-[20px] text-primary-lighter"
                title={certData?.produce?.description}
              >
                {certData?.produce?.description || '--'}
              </p>
            </div>
          </div>
          <hr className=" bg-background-borderlight-1 my-[15px]" />

          <DetailCard
            detailProps={{
              detailKeys: detailColumnsHeadTitleA,
              produceData: certData,
            }}
          />
        </div>
        <div className="w-full flex flex-col gap-y-5">
          <StatusWithAction dataDetail={certData} />
          <ExporterContact certDetail={certData} />
        </div>
      </div>
    </div>
  );
}

export default CertifcationDetail;
