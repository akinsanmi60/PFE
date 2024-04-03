import Partners from '@pages/homePage/components/partners';
import AboutCarousels from './components/aboutCarousels';
import AboutHero from './components/aboutHero';
import AccessCard from './components/accessCard';

function AboutPage() {
  return (
    <div>
      <AboutHero />
      <AboutCarousels />
      <AccessCard />
      <Partners />
    </div>
  );
}

export default AboutPage;
