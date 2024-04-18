import { IBaseResponse, IDataCount } from './auth.type';

export type ICertification = {
  id: string;
  created_at: string;
  updated_at: string;
  exporter_name: string;
  status: string;
  agency_to: string;
  created_by: string;
  is_treated: true;
  send_date: string;
  treatment_name: string;
  report_uploaded: string;
  collecting_agent: {
    id: string;
    email: string;
    full_name: string;
    phone_number: string;
  };
  testing_agent: {
    id: string;
    email: string;
    full_name: string;
    phone_number: string;
  };
  produce: {
    id: string;
    pentrar_produce_id: string;
    quantity: string;
    images: string;
    description: string;
    certification: string;
    unit: string;
    created_at: string;
    updated_at: string;
    owner_name: string;
    owner_phone: string;
    owner_type: string;
    owner_pentrar_id: string;
    farm_state: string;
    harvest_date: string;
  };
};

export type ICertificationData = IDataCount & {
  certifications: ICertification[];
};

export type ICertificationRes = IBaseResponse & {
  data: ICertificationData;
};
