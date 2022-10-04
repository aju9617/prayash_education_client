import React from "react";
import { TextInput, Button } from "../ui";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { schoolService } from "../services";
import toast from "react-hot-toast";
import { regex } from "../utility";

const schoolRegistrationFormValidation = Yup.object({
  schoolName: Yup.string().required(),
  addressLine1: Yup.string().required(),
  addressLine2: Yup.string().required(),
  phone: Yup.string()
    .matches(regex.phoneRegex, "Phone number is not valid")
    .required(),
  email: Yup.string().email().required(),
});

const initialFormValue = {
  schoolName: "",
  addressLine1: "",
  addressLine2: "",
  phone: "",
  email: "",
};

function SchoolRegistration() {
  const handleSchoolRegistrationForm = async (e, { resetForm }) => {
    const res = await schoolService.submitSchoolRegistrationForm(e);
    if (res.status) {
      toast.success(res.message);
      resetForm();
    }
  };

  return (
    <div className="py-6 w-11/12 lg:w-8/12 xl:w-6/12 mx-auto">
      <h4 className="text-2xl mb-4">School Registration Form</h4>
      <Formik
        initialValues={initialFormValue}
        validationSchema={schoolRegistrationFormValidation}
        onSubmit={handleSchoolRegistrationForm}
      >
        {({ isSubmitting }) => (
          <Form>
            <TextInput
              name="schoolName"
              placeholder="School Name"
              inputClassName="w-full"
              label="School Name"
            />
            <TextInput
              name="phone"
              type="number"
              placeholder="Phone"
              inputClassName="w-full"
              label="Phone"
            />
            <TextInput
              name="email"
              type="email"
              placeholder="Email"
              inputClassName="w-full"
              label="Email"
            />

            <TextInput
              name="addressLine1"
              placeholder="Address Line 1"
              inputClassName="w-full"
              label="Address Line 1"
            />
            <TextInput
              name="addressLine2"
              placeholder="Address Line 2"
              inputClassName="w-full"
              label="Address Line 2"
            />
            <Button
              disabled={isSubmitting}
              type="submit"
              className="!rounded-md ml-auto block"
            >
              {isSubmitting ? "Please wait..." : "Submit"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default SchoolRegistration;
