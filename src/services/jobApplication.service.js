import { api, catchAsync } from "./helper.js";

const submitApplicantForm = catchAsync(async (body) => {
  const { data } = await api.post("/job-application/submit-form", body);
  return data;
});

const apis = {
  submitApplicantForm,
};

export default apis;
