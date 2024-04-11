export type IQueryParams = {
  [key: string]: string | number | boolean | null | undefined;
};
export const queryParamsHelper = (queryParams: IQueryParams): string => {
  const validParams: string[] = [];

  for (const [key, value] of Object.entries(queryParams || {})) {
    if (key && value !== undefined && value !== null && value !== '') {
      if (key === 'page' && value === 0) {
        validParams.push('page=1');
      } else {
        validParams.push(`${key}=${value}`);
      }
    }
  }
  if (validParams.length === 0) {
    return '';
  }

  return '?' + validParams.join('&');
};
