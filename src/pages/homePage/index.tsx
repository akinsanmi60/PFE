import FarmerNetwork from './components/farmerNetwork';
import Hero from './components/hero';
import Insight from './components/insight';
import UnlockPentrar from './components/unlockPentrar';
import BoostBusiness from './components/videoModal/boostBusiness';
import WhyPentrar from './components/whyPentrar';

function HomePage() {
  return (
    <div className="">
      <Hero />
      <WhyPentrar />
      <BoostBusiness />
      <FarmerNetwork />
      <Insight />
      <UnlockPentrar />
    </div>
  );
}

export default HomePage;
