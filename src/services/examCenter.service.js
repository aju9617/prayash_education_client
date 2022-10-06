import { api, catchAsync } from "./helper";

export const list = catchAsync(async () => {
  const { data } = await api.get("/exam-center");
  return data;
});

const apis = { list };

export default apis;
