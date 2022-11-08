export const sortErrorKeys = (errors, desiredOrder) => {
  const orderedKeys = [];
  const errorKeys = new Set(Object.keys(errors));
  desiredOrder.forEach((key) => {
    if (errorKeys.has(key)) {
      orderedKeys.push(key);
    }
  });
  return orderedKeys;
};
