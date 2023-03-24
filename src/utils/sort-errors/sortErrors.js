export const sortErrorKeys = (errors, desiredOrder) => { // Maybe needs re-factor
  const orderedKeys = [];
  const errorKeys = new Set(Object.keys(errors));
  desiredOrder.forEach((key) => {
    if (errorKeys.has(key)) {
      orderedKeys.push(key);
    }
  });
  return orderedKeys;
};
