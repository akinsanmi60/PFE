export const joinPath = (...args: (string | null)[]) => {
  return args
    .filter((item): item is string => item !== null && item !== undefined)
    .join('/');
};
