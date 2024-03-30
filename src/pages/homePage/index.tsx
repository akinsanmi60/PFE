import FarmerNetwork from './components/farmerNetwork';
import Hero from './components/hero';
import Insight from './components/insight';
import UnlockPentrar from './components/unlockPentrar';
import BoostBusiness from './components/videoModal/boostBusiness';
import WhyPentrar from './components/whyPentrar';

function HomePage() {
  return (
    <>
      <Hero />
      <WhyPentrar />
      <BoostBusiness />
      <FarmerNetwork />
      <Insight />
      <UnlockPentrar />
    </>
  );
}

export default HomePage;
