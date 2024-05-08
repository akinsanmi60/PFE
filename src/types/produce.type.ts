import { UseFormReturn } from 'react-hook-form';
import { IBaseResponse, IDataCount } from './auth.type';
import { IBaseQueryProps } from './pentrarHub.type';
import { IIndividualAgencyData } from './agency.type';

export type IUserQueryProps = IBaseQueryProps;
export type ITransferProp = IBaseQueryProps & {
  to_id?: string;
};

export type IAddProducePayload = {
  name: string;
  quantity: string;
  unit: string;
  description: string;
  farm_address: string;
  harvest_date: string;
  farm_state: string;
  planting_date: string;
  produce_classification: string;
  storage: string;
  nearest_landmark: string;
  storage_capacity: string;
};

export type ITransferProducePayload = Pick<
  IAddProducePayload,
  'quantity' | 'unit'
> & {
  email: string;
  user_type: string;
};

export type IProduceHandlerType = Pick<
  IAddProducePayload,
  'quantity' | 'unit'
> & {
  id: string;
  created_at: Date;
  produce_id: string;
  handler_farmer_id: string;
  handler_aggregator_id: string;
  handler_offtaker_id: string;
  handler_exporter_id: string;
  produce_location: string;
  handler_name: string;
  handler_phone: string;
  handler_user_type: string;
  produce_created_from: string;
  produce_pentrar_id: string;
};

export type IApproveProducePayload = Pick<
  IAddProducePayload,
  'quantity' | 'unit'
> & {
  package_location: string;
  package_state: string;
};

export type IMyProduceData = {
  id: string;
  can_transfer: boolean;
  created_at: string;
  updated_at: string;
  pentrar_produce_id: string;
  description: string;
  quantity: number;
  owner_name: string;
  owner_phone: string;
  owner_type: string;
  owner_pentrar_id: string;
  images: [];
  unit: string;
  on_pentrar_hub: boolean;
  harvest_date: string;
  planting_date: string;
  produce_classification: string;
  farm_address: string;
  farm_state: string;
  name: string;
  certification: string;
  status: string;
  transfer_handler: IProduceHandlerType[];
  submitted_quantity: number;
  quantity_transfered: number;
  unit_transfered: string;
  submitted_unit: string;
  storage: string;
  nearest_landmark: string;
  produce_origin: string;
  produce_ownership: string;
  certification_request: [
    {
      agency: { agency_name: string };
      mail_received: boolean | null;
      id: string;
    },
  ];
};

export type ITransferedProduceData = {
  id: string;
  created_at: string;
  from_address: string;
  from_location: string;
  from_owner: string;
  from_phone: string;
  from_pentrar_id: string;
  from_user_type: string;
  produce_name: string;
  qty_in_transefer: number;
  harvest_date: string;
  description: string;
  unit: string;
  transfer_status: string;
  to_location: string;
  to_owner: string;
  to_phone: string;
  to_pentrar_id: string;
  to_user_type: string;
};

export type IMyProduceResponse = IBaseResponse & {
  data: {
    total: number;
    total_pages: number;
    current_page: number;
    page_size: number;
    produces_list: IMyProduceData[];
  };
};

export type IGetSingleProduce = IBaseResponse & {
  data: IMyProduceData;
};

export type DataTransferedObject = IDataCount & {
  transfered_produce: ITransferedProduceData[];
};
export type IGEtAllTransferedProduce = IBaseResponse & {
  data: DataTransferedObject;
};

export type IFilterProduceQuery = {
  created_at?: string;
  updated_at?: string;
  search?: string;
  status?: string;
  page?: number;
  pageSize?: number;
  limit?: number;
  from_id?: string;
  to_id?: string;
  on_pentrar_hub?: boolean;
  is_active?: boolean;
  produce_ownership?: string;
  agency_type?: string;
};

export type IProduceTransferHolder = IBaseResponse & {
  data: IProduceHandlerType[];
};

export type ISubmitCertificationFieldValues = {
  agencyID?: string;
  send_date?: string;
  is_treated?: string | boolean;
  treatment_name?: string;
  shipment_date?: string;
  treatment_duration?: string;
};

export type ISubmitCertificationPayload = Pick<
  ISubmitCertificationFieldValues,
  'send_date' | 'treatment_name'
> & {
  is_treated: boolean;
};

export type ISubmitCertification = {
  certSubmitForm: UseFormReturn<ISubmitCertificationFieldValues>;
};

export type ISubmitCertificationAccordion = Pick<
  ISubmitCertification,
  'certSubmitForm'
> & {
  itemData: IIndividualAgencyData[];
};

export type toSendId = {
  agencyID: string;
  produceID: string;
  exporterID: string;
};
