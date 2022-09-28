import React from "react";
import { TextInput, RadioInput, SelectInput, Button } from "./../ui";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { regex } from "../utility";
import FilePondUploader from "../components/FilePondUploader";
import { scholarshipService } from "../services";
import { displayRazorpay } from "../scripts/razorpay";
import toast from "react-hot-toast";

const scholarshipValidation = Yup.object({
  studentName: Yup.string().required(),
  fatherName: Yup.string().required(),
  motherName: Yup.string().required(),
  aadharNumber: Yup.string()
    .matches(regex.aadharRegex, "Aadhar number is not valid")
    .required(),
  examCenter: Yup.string().required(),
  school: Yup.string().required(),
  address1: Yup.string().required(),
  address2: Yup.string().required(),
  gender: Yup.string().required(),
  dob: Yup.string().required(),
  category: Yup.string().required(),
  phone: Yup.string()
    .matches(regex.phoneRegex, "Phone number is not valid")
    .required(),
  email: Yup.string().email().required(),
  class: Yup.number().integer().required().max(12).min(1),

  accountNumber: Yup.string()
    .matches(regex.bankAccountNumberRegex, "Account number is not valid")
    .required(),
  ifsc: Yup.string().required(),
  bank: Yup.string().required(),
  branch: Yup.string().required(),

  studentId: Yup.string().required(),
  feeSlip: Yup.string().required(),
  picture: Yup.string().required(),
  passbook: Yup.string().required(),
});

const initialFormValue = {
  studentName: "",
  fatherName: "",
  motherName: "",
  aadharNumber: "",
  examCenter: "",
  school: "",
  address1: "",
  address2: "",
  gender: "",
  dob: "",
  category: "",
  phone: "",
  email: "",
  class: "",
  accountNumber: "",
  ifsc: "",
  bank: "",
  branch: "",

  studentId: "",
  feeSlip: "",
  picture: "",
  passbook: "",
};

function ScholarshipForm() {
  const handleScholarshipForm = async (e, { resetForm }) => {
    const res = await scholarshipService.submitScholarshipForm(e);

    if (res.status) {
      toast.success(res.message);
      resetForm();
      displayRazorpay({
        name: res.data.studentName,
        email: res.data.email,
        phone: res.data.phone,
        id: res.data.orderId,
        documentId: res.data.documentId,
        currency: res.data.currency,
        amount: res.data.amount,
        notes: {
          model: "SCHOLARSHIP",
          documentId: res.data.documentId,
        },
      });
    }
  };

  return (
    <div className="py-6 w-11/12 lg:w-8/12 xl:w-6/12 mx-auto">
      <h4 className="text-2xl mb-4">Scholarship Form</h4>
      <Formik
        initialValues={initialFormValue}
        validationSchema={scholarshipValidation}
        onSubmit={handleScholarshipForm}
      >
        {({ setFieldValue, isSubmitting }) => (
          <Form>
            <h4 className="text-primary    font-medium  "> Details</h4>
            <div className="mt-4">
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
                name="motherName"
                placeholder="Mother's Name"
                inputClassName="w-full"
                label="Mother's Name"
              />
              <TextInput
                name="dob"
                placeholder="Date of Birth"
                type="date"
                inputClassName="w-full"
                label="Date of Birth"
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
                name="aadharNumber"
                type="number"
                placeholder="Aadhar Number"
                inputClassName="w-full"
                label="Aadhar Number"
              />
              <SelectInput
                label="Exam Center"
                name="examCenter"
                placeholder="Exam Center"
                options={[{ key: "Center 1", value: "center1" }]}
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
                name="address1"
                placeholder="Address Line 1"
                inputClassName="w-full"
                label="Address Line 1"
              />
              <TextInput
                name="address2"
                placeholder="Address Line 2"
                inputClassName="w-full"
                label="Address Line 2"
              />
            </div>
            <h4 className="text-primary    font-medium  ">Bank Details</h4>
            <div className="mt-4">
              <TextInput
                name="bank"
                placeholder="Bank Name"
                inputClassName="w-full"
                label="Bank Name"
              />
              <TextInput
                name="ifsc"
                placeholder="IFSC"
                inputClassName="w-full"
                label="IFSC"
              />{" "}
              <TextInput
                name="accountNumber"
                placeholder="Account Number"
                inputClassName="w-full"
                label="Account Number"
              />
              <TextInput
                name="branch"
                placeholder="Branch"
                inputClassName="w-full"
                label="Branch"
              />
            </div>
            <h4 className="text-primary    font-medium  ">
              Documents (Upload in '.jpg', '.jpeg', '.png' formats only)
            </h4>
            <div className="mt-4">
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
              <FilePondUploader
                label="Upload Feeslip"
                setFieldValue={setFieldValue}
                name="feeSlip"
              />
              <FilePondUploader
                label="Upload Bank Passbook"
                setFieldValue={setFieldValue}
                name="passbook"
              />
            </div>
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

export default ScholarshipForm;
