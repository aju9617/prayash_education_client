import { api, catchAsync } from "./helper.js";

const submitForm = catchAsync(async (body) => {
  const { data } = await api.post("/premier-league/submit-form", body);
  return data;
});

const apis = {
  submitForm,
};

export default apis;
