import { useAuthContext } from '@contexts/authContext';
import { useNavigate } from 'react-router-dom';

function CantView() {
  const { authUser } = useAuthContext();

  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  const routePath = () => {
    switch (authUser?.roles) {
      case 'admin':
        return '/admin/dashboard';
      case 'superAdmin':
        return '/sadmin/dashboard';
      default:
        return '/';
    }
  };

  const handleNavigate = () => {
    navigate(routePath() as string);
  };

  return (
    <div className="h-screen">
      <div className="max-content">
        <div className="container">
          <div className="flex flex-col items-center justify-center min-h-full">
            <div className="">
              <p className="text-[20px]">
                You do not have access to the requested page because you are
                currently signed in. Please click{' '}
                <span
                  className="font-[700] underline cursor-pointer"
                  onClick={() => navigate('/')}
                >
                  HOME
                </span>{' '}
                to return to the main page, or{' '}
                <span
                  className="font-[700] underline cursor-pointer"
                  onClick={handleNavigate}
                >
                  Dashboard
                </span>{' '}
                to return to your dashboard or{' '}
                <span
                  className="font-[700] underline cursor-pointer"
                  onClick={goBack}
                >
                  Go Back
                </span>{' '}
                to return to the previous page.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CantView;
