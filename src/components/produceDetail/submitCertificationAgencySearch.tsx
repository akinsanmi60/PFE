import SearchFilterBox from '@shared/searchFilter';
import { ReactComponent as SearchVector } from '@assets/svg/searchVector.svg';
import { ReactComponent as CloseVector } from '@assets/svg/searchClose.svg';
import { useState } from 'react';
import { useGetAllAgency } from 'services/agency.service';
import { ISubmitCertification } from 'types/produce.type';
import AgencySearchAccordionCard from './searchAgencyAccordion';
import { FcCancel } from 'react-icons/fc';
import CircularProgress from '@shared/CircularProgress';

function SubmitCertificationAgencySearch({
  certSubmitForm,
}: ISubmitCertification) {
  const [searchTerm, setSearchTerm] = useState('');
  const { data, isLoading, isRefetching } = useGetAllAgency({
    search: searchTerm,
  });

  return (
    <div className="flex flex-col gap-y-[20px]">
      <div className="w-full">
        <SearchFilterBox
          searchBarProps={{
            placeholder: 'Search agency by name',
            borderColor: '#E6E6E6',
            useStartAdornment: <SearchVector />,
            onSetTermChange: ({ target: { value } }) => {
              setSearchTerm(value);
            },
            term: searchTerm,
            useEndAdornment: (
              <CloseVector
                onClick={() => {
                  setSearchTerm('');
                }}
              />
            ),
          }}
        />
      </div>
      <div className="border border-[#E6E6E6] rounded-2xl p-[10px] h-[190px]">
        {isLoading || isRefetching ? (
          <div className="h-full flex flex-col gap-y-[15px] justify-center items-center">
            <CircularProgress size={30} color="#2AA232" />
            <p>Loading Agency List...</p>
          </div>
        ) : !data?.agency_list?.length ? (
          <div className="h-full flex flex-col gap-y-[15px]  justify-center items-center">
            <FcCancel className="text-5xl" />
            <p>
              Agency with name <span className="font-bold">{searchTerm}</span>{' '}
              not found
            </p>
          </div>
        ) : (
          <AgencySearchAccordionCard
            certSubmitForm={certSubmitForm}
            itemData={data?.agency_list}
          />
        )}
      </div>
    </div>
  );
}

export default SubmitCertificationAgencySearch;
