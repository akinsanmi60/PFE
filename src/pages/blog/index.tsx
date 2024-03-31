import UnlockPentrar from '@pages/homePage/components/unlockPentrar';
import BlogHero from './components/bloghero';
import BlogSectionA from './components/blogSectionA';
import BlogSectionB from './components/blogSectionB';

function BlogPage() {
  return (
    <div>
      <BlogHero />
      <BlogSectionA />
      <BlogSectionB />
      <div className="py-[80px] xlsm:py-[40px]">
        <UnlockPentrar />
      </div>
    </div>
  );
}

export default BlogPage;
