export const sortErrors = (errors, desiredOrder) => {
  var orderedKeys = [];
  const errorKeys = Object.keys(errors);
  desiredOrder.forEach((key) => {
    errorKeys.forEach((errorKey) => {
      if (key === errorKey) {
        orderedKeys.push(key);
      }
    });
  });
  return orderedKeys;
};
