export type IQueryParams = {
  [key: string]: string | number | boolean | null | undefined;
};
export const queryParamsHelper = (queryParams: IQueryParams): string => {
  const validParams: string[] = [];
  for (const [key, value] of Object.entries(queryParams || {})) {
    if (key && value !== undefined && value !== null && value !== '') {
      if (Array.isArray(value)) {
        // If value is an array, iterate over its elements
        value.forEach(element => {
          if (element !== undefined && element !== null && element !== '') {
            validParams.push(`${key}=${encodeURIComponent(element)}`);
          }
        });
      } else {
        if (key === 'page' && value === 0) {
          validParams.push('page=1');
        } else {
          validParams.push(`${key}=${encodeURIComponent(value)}`);
        }
      }
    }
  }

  if (validParams.length === 0) {
    return '';
  }

  return '?' + validParams.join('&');
};
