export const deepClone = (objectOrArray) => {
  return JSON.parse(JSON.stringify(objectOrArray));
};
