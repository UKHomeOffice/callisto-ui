export const deepCloneJson = (input: Object | Array<any>) => {
  return JSON.parse(JSON.stringify(input));
};
