import CustomTable from '@shared/Table';
import EmptyBar from '@shared/Table/tableEmpty';
import SearchFilterBox from '@shared/searchFilter';
import PageContainer from 'components/Layout/PageContainer';
import AppHeader from 'components/appHeader/appHeader';
import { ReactComponent as SearchVector } from '@assets/svg/searchVector.svg';
import { ReactComponent as CloseVector } from '@assets/svg/searchClose.svg';
import { useState } from 'react';
import { useModalContext } from '@contexts/modalContext';
import { IFilterValues } from 'types/modal.type';
import { IFilterProduceQuery } from 'types/produce.type';
import { useForm } from 'react-hook-form';
import CommonAdminFilterForm from '../commonFilter';

function TransporterList() {
  const [searchTerm, setSearchTerm] = useState('');

  const [queryParams, setQueryParams] = useState({
    search: '',
    page: 1,
    limit: 10,
  });

  const { modalState, handleModalOpen, handleModalClose } = useModalContext();

  const transporterForm = useForm<IFilterValues>({
    defaultValues: {
      is_active: '',
      created_at: '',
      updated_at: '',
    },
  });

  const updateQueryParams = (params: IFilterProduceQuery) => {
    setQueryParams(prev => ({ ...prev, ...params }));
    return queryParams;
  };

  const openFilterBox = () => handleModalOpen('filterTransporter');

  const closeFilterBox = () => {
    handleModalClose('filterTransporter');
  };

  const submitFilter = () => {
    const startDate = transporterForm.getValues('created_at') || undefined;
    const endDate = transporterForm.getValues('updated_at') || undefined;
    const transporterActiveStatus =
      transporterForm.getValues('is_active') || undefined;

    updateQueryParams({
      page: 1,
      is_active:
        transporterActiveStatus === 'active'
          ? true
          : transporterActiveStatus === 'inactive'
          ? false
          : undefined,

      created_at: startDate,
      updated_at: endDate,
    });
    closeFilterBox();
  };

  return (
    <div className="">
      <AppHeader>
        <div className="flex justify-between items-center mt-[20px] px-[24px] pb-[14px] sixm:flex-col sixm:gap-y-[20px]">
          <div className="w-full">
            <h2 className="text-primary-main leading-6 font-[500] text-[18px]">
              All Transporters
            </h2>
          </div>
          <div className="w-full">
            <SearchFilterBox
              searchBarProps={{
                placeholder: 'Search transporter by name or ID',
                useStartAdornment: <SearchVector />,
                onSetTermChange: ({ target: { value } }) =>
                  setSearchTerm(value),
                term: searchTerm,
                useEndAdornment: (
                  <CloseVector
                    onClick={() => {
                      // updateQueryParams({ search: '' });
                      setSearchTerm('');
                    }}
                  />
                ),
              }}
              filterBtnsProps={{
                useFilterBtn: true,
                onClick: openFilterBox,
              }}
            />
          </div>
        </div>
      </AppHeader>
      <PageContainer className="pt-0">
        <div className="w-full bg-primary-white rounded-lg mt-[30px]">
          <CustomTable
            tableHeads={[]}
            dataTableSource={[]}
            tableEmptyState={
              <EmptyBar emptyStateSize="lg" componentType="Transporter" />
            }
          />
        </div>
      </PageContainer>

      {modalState?.modalType === 'filterTransporter' && (
        <CommonAdminFilterForm
          closeModalBox={closeFilterBox}
          filterForm={transporterForm}
          onSubmitForm={submitFilter}
          clearFunction={() =>
            updateQueryParams({
              page: 1,
              limit: 10,
              created_at: '',
              updated_at: '',
            })
          }
          filterTitle="Transporter"
          watchValue="is_active"
        />
      )}
    </div>
  );
}

export default TransporterList;
