export const pushToLocalStorage = (user?: any) => {
  localStorage.setItem('user', JSON.stringify(user));
};
export const setToken = (token: string) => {
  localStorage.setItem('token', token);
};
export const getToken = (): string | null => {
  return localStorage.getItem('token') as string;
};
