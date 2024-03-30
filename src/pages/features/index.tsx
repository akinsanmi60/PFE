import FeaturesList from './components/featuresList';
import FeaturesHero from './components/featuresHero';
import FeaturesHerotop from './components/featuresHerotop';
import UnlockPentrar from '@pages/homePage/components/unlockPentrar';

function FeaturesPage() {
  return (
    <div>
      <FeaturesHerotop />
      <FeaturesHero />
      <FeaturesList />
      <UnlockPentrar />
    </div>
  );
}

export default FeaturesPage;
