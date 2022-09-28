import { api, catchAsync } from "./helper.js";

const submitScholarshipForm = catchAsync(async (body) => {
  const { data } = await api.post("/scholarship-application/submit-form", body);
  return data;
});

const apis = {
  submitScholarshipForm,
};

export default apis;
