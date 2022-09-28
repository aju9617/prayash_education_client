import { api, catchAsync } from "./helper.js";

const submitAdmissionForm = catchAsync(async (body) => {
  const { data } = await api.post("/admission/submit-form", body);
  return data;
});

const apis = {
  submitAdmissionForm,
};

export default apis;
