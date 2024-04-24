import { IBaseResponse, IDataCount } from './auth.type';
import { IExporterData } from './exporter.type';
import { IMyProduceData } from './produce.type';

type IAgentDetail = {
  id: string;
  email: string;
  full_name: string;
  phone_number: string;
};

export type ICertification = {
  id: string;
  created_at: string;
  updated_at: string;
  exporter_name: string;
  status: string;
  agency_to: string;
  created_by: string;
  is_treated: boolean;
  send_date: string;
  certification_id: string;
  treatment_duration: string;
  shipment_date: string;
  treatment_name: string;
  report_uploaded: string;
  collecting_agent: IAgentDetail;
  testing_agent: IAgentDetail;
  certifying_agent: IAgentDetail;
  mail_received: boolean;
  produce: Partial<IMyProduceData>;
  agency: {
    id: string;
    agency_name: string;
    phone_number: string;
    email: string;
    agency_address: string;
  };
  export: Partial<IExporterData>;
};

export type ICertificationData = IDataCount & {
  certifications: ICertification[];
};

export type ICertificationRes = IBaseResponse & {
  data: ICertificationData;
};

export type ICertificationByIdRes = IBaseResponse & {
  data: ICertification;
};

export type ICertDetail = {
  certDetail: {
    certData: ICertification;
  };
};
