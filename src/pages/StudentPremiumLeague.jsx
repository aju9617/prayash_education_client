import React from "react";
import { TextInput, SelectInput, RadioInput, Button } from "../ui";
import FilePondUploader from "../components/FilePondUploader";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { regex } from "../utility";
import { studentPremiumLeagueService } from "../services";
import { displayRazorpay } from "../scripts/razorpay";

const studentPremiumLeaugeValidation = Yup.object({
  picture: Yup.string().required(),
  studentId: Yup.string().required(),
  studentName: Yup.string().required(),
  fatherName: Yup.string().required(),
  school: Yup.string().required(),
  addressLine1: Yup.string().required(),
  addressLine2: Yup.string().required(),
  gender: Yup.string().required(),
  category: Yup.string().required(),
  dob: Yup.string().required(),
  phone: Yup.string()
    .matches(regex.phoneRegex, "Phone number is not valid")
    .required(),
  email: Yup.string().email().required(),
  class: Yup.number().integer().required().max(12).min(1),
});

const initialFormValue = {
  studentName: "sd",
  fatherName: "ds",
  school: "dsd",
  category: "obc",
  addressLine1: "dsds",
  addressLine2: "ds",
  gender: "male",
  dob: "1999-12-21",
  email: "aju@gmail.com",
  class: "3",
  phone: "7685588707",
  studentId: "ewe",
  picture: "wew",
};

function StudentPremiumLeague() {
  const handleStudentLeague = async (e, { resetForm }) => {
    const res = await studentPremiumLeagueService.submitForm(e);

    displayRazorpay({
      name: res.data.studentName,
      email: res.data.email,
      phone: res.data.phone,
      id: res.data.orderId,
      documentId: res.data.documentId,
      currency: res.data.currency,
      amount: res.data.amount,
      notes: {
        model: "STUDENT_PREMIER_LEAGUE",
        charge: res.data.amount,
        documentId: res.data.documentId,
      },
    });
    // resetForm();
  };

  return (
    <div className="py-6 w-11/12 lg:w-8/12 xl:w-6/12 mx-auto">
      <h4 className="text-2xl mb-4">Student Premium League</h4>
      <Formik
        initialValues={initialFormValue}
        validationSchema={studentPremiumLeaugeValidation}
        onSubmit={handleStudentLeague}
      >
        {({ setFieldValue, isSubmitting, errors }) => {
          return (
            <Form>
              <TextInput
                name="studentName"
                placeholder="Student Name"
                inputClassName="w-full"
                label="Student Name"
              />
              <TextInput
                name="fatherName"
                placeholder="Father's Name"
                inputClassName="w-full"
                label="Father's Name"
              />
              <TextInput
                name="dob"
                placeholder="Date of Birth"
                type="date"
                inputClassName="w-full"
                label="Date of Birth"
              />
              <SelectInput
                label="Category"
                name="category"
                placeholder="Category"
                options={[
                  { key: "General", value: "general" },
                  { key: "OBC", value: "obc" },
                  { key: "ST", value: "st" },
                  { key: "SC", value: "sc" },
                ]}
              />
              <div className="mb-4">
                <label htmlFor="gender" className="block mb-2">
                  Gender
                </label>
                <div className="flex space-x-4 items-center ">
                  <div className="flex space-x-2 items-center">
                    <span className="block">Male</span>
                    <RadioInput name="gender" value="male" />
                  </div>
                  <div className="flex space-x-2 items-center">
                    <span className="block">Female</span>
                    <RadioInput name="gender" value="female" />
                  </div>
                  <div className="flex space-x-2 items-center">
                    <span className="block">Other</span>
                    <RadioInput name="gender" value="other" />
                  </div>
                </div>
                <ErrorMessage
                  name="gender"
                  render={(msg) => (
                    <span className="text-xs text-red-600">{msg}</span>
                  )}
                />
              </div>

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
                name="class"
                placeholder="Class (01-12)"
                inputClassName="w-full"
                label="Class"
              />
              <TextInput
                name="school"
                placeholder="School Name"
                inputClassName="w-full"
                label="School Name"
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
              <FilePondUploader
                label="Upload Passport Size Photo"
                setFieldValue={setFieldValue}
                name="picture"
              />
              <FilePondUploader
                label="Upload Student ID"
                setFieldValue={setFieldValue}
                name="studentId"
              />
              <Button
                disabled={isSubmitting}
                type="submit"
                className="!rounded-md ml-auto block"
              >
                {isSubmitting ? "Please wait..." : "Submit"}
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default StudentPremiumLeague;
