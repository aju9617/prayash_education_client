import { api, catchAsync, getAuthHeader, generateQueryString } from "./helper";

const getList = catchAsync(async (query) => {
  const { data } = await api.get(
    `/gallery?${generateQueryString(query)}`,
    getAuthHeader()
  );
  return data;
});

const apis = {
  getList,
};

export default apis;
