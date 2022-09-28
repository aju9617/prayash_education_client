import { api, catchAsync } from "./helper.js";

const submitSchoolRegistrationForm = catchAsync(async (body) => {
  const { data } = await api.post("/school/register", body);
  return data;
});

const apis = {
  submitSchoolRegistrationForm,
};

export default apis;
