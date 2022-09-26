export const deepCloneJson = (objectOrArray) => {
  return JSON.parse(JSON.stringify(objectOrArray));
};
