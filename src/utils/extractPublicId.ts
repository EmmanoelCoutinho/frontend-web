export const extractpublicId = (url: string) => {
  const tempIndex = url.indexOf('/temp');
  return tempIndex !== -1 ? url.substring(tempIndex) : '';
};
