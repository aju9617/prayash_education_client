import { api, catchAsync, generateQueryString } from "./helper.js";

const getResult = catchAsync(async (query) => {
  const { data } = await api.get(`/result?${generateQueryString(query)}`);
  return data;
});
const apis = {
  getResult,
};

export default apis;
