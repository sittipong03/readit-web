import api from "../utils/api";

export const getMyAffiliateInfo = () => {
  return api.get("/affiliate");
};

export const registerAsAffiliate = (data) => {
  // data ควรจะมีหน้าตาแบบ { accountDetails: {...}, methodType: "..." }
  return api.post("/affiliate", data);
};
