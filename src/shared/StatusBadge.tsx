import { capitalize, getClass } from '@utils/constants';
import { twMerge } from 'tailwind-merge';

export type IStatusType =
  | 'Active'
  | 'Inactive'
  | 'Verified'
  | 'Approved'
  | 'Success'
  | 'Pending'
  | 'Certified'
  | 'Not Certified'
  | 'Rejected'
  | 'Not Approved'
  | 'Incoming'
  | 'Collected'
  | 'Testing'
  | 'Processing'
  | 'Progess'
  | 'Accepted'
  | 'Inspected';
const StatusBadge = ({
  status,
  className,
}: {
  status: IStatusType;
  className?: string;
}) => {
  return (
    <div className={twMerge(getClass(status), 'w-max', className)}>
      {capitalize(status)}
    </div>
  );
};
export default StatusBadge;
