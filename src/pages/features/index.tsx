import FeaturesList from './components/featuresList';
import FeaturesHero from './components/featuresHero';
import FeaturesHerotop from './components/featuresHerotop';
import UnlockPentrar from '@pages/homePage/components/unlockPentrar';
import Partners from '@pages/homePage/components/partners';

function FeaturesPage() {
  return (
    <div>
      <FeaturesHerotop />
      <FeaturesHero />
      <FeaturesList />
      <UnlockPentrar />
      <Partners />
    </div>
  );
}

export default FeaturesPage;
