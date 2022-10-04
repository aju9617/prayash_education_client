import { api, catchAsync } from "./helper.js";

const submitSchoolRegistrationForm = catchAsync(async (body) => {
  const { data } = await api.post("/school/register", body);
  return data;
});

export const getList = catchAsync(async () => {
  const { data } = await api.get("/school");
  return data;
});

const apis = {
  submitSchoolRegistrationForm,
  getList,
};

export default apis;
