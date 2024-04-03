import UnlockPentrar from '@pages/homePage/components/unlockPentrar';
import BlogHero from './components/bloghero';
import BlogSectionA from './components/blogSectionA';
import BlogSectionB from './components/blogSectionB';
import Partners from '@pages/homePage/components/partners';

function BlogPage() {
  return (
    <div>
      <BlogHero />
      <BlogSectionA />
      <BlogSectionB />
      <UnlockPentrar />
      <Partners />
    </div>
  );
}

export default BlogPage;
