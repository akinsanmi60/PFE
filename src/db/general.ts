import dataNig from '@db/states_and_lgas.json';
export const givenState = () => {
  return dataNig
    .sort((a, b) => (a.state > b.state ? 1 : -1))
    .map(item => item?.state);
};
