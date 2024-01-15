import { differenceInYears, parse } from "date-fns";

export const calculateAge = (dob) => {
  const date = new Date(dob);
  const age = differenceInYears(new Date(), date);
  return age;
};
