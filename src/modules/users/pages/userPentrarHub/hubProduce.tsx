import SearchFilterBox from '@shared/searchFilter';
import { ReactComponent as SearchVector } from '@assets/svg/searchVector.svg';
import { useMemo, useState } from 'react';
import ProduceSort from './produceSort';
import { IProduceItemList, IQueryHubProp } from 'types/pentrarHub.type';
import CustomHubTable from '@shared/HubTable';
import EmptyBar from '@shared/Table/tableEmpty';
import { useGetPentrarHubProduce } from 'services/pentrar.service';
import { useModalContext } from '@contexts/modalContext';
import OnHubProduceDetail from 'components/produceDetail';
import TableLoading from '@shared/Table/tableLoading';

function HubProduce() {
  const { modalState, handleModalOpen } = useModalContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [queryParams, setQueryParams] = useState({
    search: '',
    page: 1,
    limit: 10,
    state: '',
    popular_produce: '',
  });
  const [modalProduceDetail, setModalProduceDetail] =
    useState<IProduceItemList | null>(null);
  const updateQueryParams = (params: IQueryHubProp) => {
    setQueryParams(prev => ({ ...prev, ...params }));
  };

  const { data, isLoading } = useGetPentrarHubProduce(queryParams);

  console.log(data);

  const sortProduce = useMemo(() => {
    return (
      <ProduceSort
        setPopluar={produce => updateQueryParams({ popular_produce: produce })}
        setState={stateVal => updateQueryParams({ state: stateVal })}
      />
    );
  }, []);

  const viewProduce = (produceData: IProduceItemList) => {
    handleModalOpen('hubProduceDetail');
    setModalProduceDetail(produceData);
  };

  return (
    <div className=" mt-[24px] p-[24px] bg-primary-white rounded-[8px] border-[1px] border-background-borderlight">
      <div className="w-full mt-[24px]">
        <SearchFilterBox
          searchBarProps={{
            placeholder: 'Search for produce',
            useStartAdornment: <SearchVector />,
            onSetTermChange: ({ target: { value } }) => {
              setSearchTerm(value);
              updateQueryParams({
                search: value,
              });
            },
            term: searchTerm,
            borderColor: '#F2F2F2',
            className: 'w-full border-[1px]',
          }}
        />
      </div>
      <div className="w-full mt-[24px]">{sortProduce}</div>
      <div className="w-full mt-[24px]">
        <CustomHubTable<IProduceItemList>
          dataBody={data?.produces_list}
          loading={isLoading}
          total={data?.total}
          currentPage={data?.current_page}
          setCurrentPage={(val: number) => updateQueryParams({ page: val })}
          setLimit={(val: number) => updateQueryParams({ limit: val })}
          tableEmptyState={
            <EmptyBar emptyStateSize="lg" componentType="Hub Produce" />
          }
          onRowClick={rowData => viewProduce(rowData)}
          tableLoader={<TableLoading title="Loading Hub Produces" />}
          page_size={data?.page_size}
        />
      </div>
      {modalState.modalType === 'hubProduceDetail' && (
        <OnHubProduceDetail modalProduceDetail={modalProduceDetail} />
      )}
    </div>
  );
}

export default HubProduce;
