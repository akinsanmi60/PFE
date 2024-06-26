import PageContainer from 'components/Layout/PageContainer';
import AppHeader from 'components/appHeader/appHeader';
import ProduceCard from 'components/produceDetail';
import { useParams } from 'react-router-dom';
import { useGetSingleProduce } from 'services/produce.service';

function IndividualProduce() {
  const { id } = useParams();
  const { data, isLoading, isRefetching } = useGetSingleProduce(id as string);
  return (
    <div>
      <AppHeader />
      <PageContainer className="">
        <ProduceCard
          produceData={data}
          loading={isLoading}
          refetching={isRefetching}
        />
      </PageContainer>
    </div>
  );
}

export default IndividualProduce;
