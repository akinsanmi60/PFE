import SearchFilterBox from '@shared/searchFilter';
import { ReactComponent as SearchVector } from '@assets/svg/searchVector.svg';
import { useEffect, useMemo, useState } from 'react';
import ProduceSort from './produceSort';
import { produceListData } from '@db/hubData';
import { IProduceItemList, IQueryHubProp } from 'types/pentrarHub.type';
import CustomHubTable from '@shared/HubTable';
import EmptyBar from '@shared/Table/tableEmpty';
import { useGetPentrarHubProduce } from 'services/pentrar.service';
import { useModalContext } from '@contexts/modalContext';
import OnHubProduceDetail from 'components/produceDetail';

function HubProduce() {
  const { modalState, handleModalOpen } = useModalContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState<IProduceItemList[]>([]);
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

  const { data } = useGetPentrarHubProduce(queryParams);

  const sortProduce = useMemo(() => {
    return (
      <ProduceSort
        setPopluar={produce => updateQueryParams({ popular_produce: produce })}
        setState={stateVal => updateQueryParams({ state: stateVal })}
      />
    );
  }, []);

  const dataToUse = data?.data?.produces_list as IProduceItemList[];

  const viewProduce = (produceData: IProduceItemList) => {
    handleModalOpen('hubProduceDetail');
    setModalProduceDetail(produceData);
  };

  // Filter data based on search term
  useEffect(() => {
    const filtered =
      dataToUse?.length > 0
        ? dataToUse
        : produceListData.filter(item =>
            item.name
              .toLowerCase()
              .startsWith(
                searchTerm.toLowerCase() ||
                  queryParams.search.toLowerCase() ||
                  queryParams.popular_produce.toLowerCase() ||
                  queryParams.state.toLowerCase(),
              ),
          );
    setFilteredData(filtered as IProduceItemList[]);
  }, [dataToUse, searchTerm, queryParams]);

  const displayedData = filteredData;

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
          dataBody={displayedData}
          total={displayedData.length}
          setCurrentPage={(val: number) => updateQueryParams({ page: val })}
          setLimit={(val: number) => updateQueryParams({ limit: val })}
          tableEmptyState={
            <EmptyBar emptyStateSize="lg" componentType="Hub Produce" />
          }
          onRowClick={rowData => viewProduce(rowData)}
        />
      </div>
      {modalState.modalType === 'hubProduceDetail' && (
        <OnHubProduceDetail modalProduceDetail={modalProduceDetail} />
      )}
    </div>
  );
}

export default HubProduce;
