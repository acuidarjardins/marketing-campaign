import { ROUTES } from "./constants";

export const getGtmId = (route: string): string => {
  switch (route) {
    case ROUTES.ELDERLY_CARE:
      return "AW-16633865118";

    default:
      return "GTM-NZLJ23Z";
  }
};
