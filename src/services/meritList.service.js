import { api, catchAsync, generateQueryString } from "./helper.js";

const getList = catchAsync(async (query) => {
  const { data } = await api.get(`/merit-list?${generateQueryString(query)}`);
  return data;
});

const apis = {
  getList,
};

export default apis;
