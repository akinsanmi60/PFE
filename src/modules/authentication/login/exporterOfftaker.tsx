import { EXPORTER_LOGIN_URL, OFFTAKER_LOGIN_URL } from '@utils/apiUrl';
import GeneralLoginPage from './LoginComponent';
import { useParams } from 'react-router-dom';

function ExporterOfftakerLoginPage() {
  const { type } = useParams();

  const urlSwitch =
    type === 'exporter' ? EXPORTER_LOGIN_URL : OFFTAKER_LOGIN_URL;

  return (
    <div className="max-content">
      <div className="container">
        <GeneralLoginPage url={urlSwitch} pageTitle={type as string} />;
      </div>
    </div>
  );
}

export default ExporterOfftakerLoginPage;
