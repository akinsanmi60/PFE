const genericMessage =
  'Something went wrong while trying to connect with the server';

const handleApiError = (error: any) => {
  //   if (process.env.NODE_ENV !== 'production') {
  //     console.error('[Service Error]', { error });
  //   }
  if (!error?.response) {
    const { data } = error || {};
    if (!data) return genericMessage;

    return (
      (data?.error && data?.error[0]?.message) ||
      data?.message ||
      genericMessage
    );
  }

  const { response } = error || {};
  const { data } = response;

  switch (response?.status) {
    case 400:
      return (
        data?.detail ||
        (data?.error && data?.error[0]?.message) ||
        data?.message ||
        genericMessage
      );
    case 401:
      return (
        data?.detail ||
        (data?.error && data?.error[0]?.message) ||
        data?.message ||
        data?.data ||
        'You are not authorized to perform this action'
      );

    case 403:
      return (
        data?.detail ||
        (data?.error && data?.error[0]?.message) ||
        data?.message ||
        data?.data ||
        'You are forbidden from performing this action'
      );
    case 404:
      return (
        data?.detail ||
        (data?.error && data?.error[0]?.message) ||
        data?.message ||
        'The resource you are trying to load cannot be found'
      );
    case 409:
      return (
        data?.detail ||
        (data?.error && data?.error[0]?.message) ||
        data?.message ||
        'A duplicate already exists'
      );
    case 500:
      return genericMessage;
    case 504:
      return 'Gateway server Timeout';
    default:
      return (
        data?.detail ||
        (data?.error && data?.error[0]?.message) ||
        data?.message ||
        genericMessage
      );
  }
};

export default handleApiError;
