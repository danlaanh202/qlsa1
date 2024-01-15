export const prepareAddress = (ward = "", district = "", province = "") => {
  return `${ward} - ${district} - ${province}`;
};
