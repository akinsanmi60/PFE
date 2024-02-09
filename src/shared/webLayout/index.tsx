import Header from '@shared/Header/webHeader';
import Footer from '@shared/footer/webFooter';

type Props = {
  children: React.ReactNode;
};

const LayoutWrapper: React.FC<Props> = props => {
  return (
    <div className="">
      <Header />
      <div className="">{props.children}</div>
      <Footer />
    </div>
  );
};
export default LayoutWrapper;
