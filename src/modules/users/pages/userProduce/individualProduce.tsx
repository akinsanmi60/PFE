import PageContainer from 'components/Layout/PageContainer';
import AppHeader from 'components/appHeader/appHeader';
import ProduceCard from 'components/produceCard';
import { useParams } from 'react-router-dom';
import { useGetSingleProduce } from 'services/produce.service';

function IndividualProduce() {
  const { id } = useParams();
  const { data } = useGetSingleProduce(id as string);
  return (
    <div>
      <AppHeader />
      <PageContainer className="">
        <ProduceCard produceData={data} />
      </PageContainer>
    </div>
  );
}

export default IndividualProduce;
