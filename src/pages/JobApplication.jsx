import React, { useState, useEffect } from "react";
import { TextInput, RadioInput, SelectInput, Button } from "../ui";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { regex } from "../utility";
import { displayRazorpay } from "../scripts/razorpay";
import { jobApplicantService, examCenterService } from "../services";
import FilePondUploader from "../components/FilePondUploader";
import toast from "react-hot-toast";

const careerFormValidation = Yup.object({
  candidateName: Yup.string().required(),
  fatherName: Yup.string().required(),
  motherName: Yup.string().required(),
  aadharNumber: Yup.string()
    .matches(regex.aadharRegex, "Aadhar number is not valid")
    .required(),
  panNumber: Yup.string()
    .matches(regex.panRegex, "Pan number is not valid")
    .required(),
  examCenter: Yup.string().required(),
  addressLine1: Yup.string().required(),
  addressLine2: Yup.string().required(),
  gender: Yup.string().required(),
  dob: Yup.string().required(),
  category: Yup.string().required(),
  phone: Yup.string()
    .matches(regex.phoneRegex, "Phone number is not valid")
    .required(),
  email: Yup.string().email().required(),
  designation: Yup.string().required(),
  qualification: Yup.string().required(),
  picture: Yup.string().required(),
  marksheet: Yup.string().required(),
});

const initialFormValue = {
  candidateName: "",
  fatherName: "",
  motherName: "",
  aadharNumber: "",
  panNumber: "",
  examCenter: "",
  addressLine1: "",
  addressLine2: "",
  gender: "",
  dob: "",
  category: "",
  phone: "",
  email: "",
  designation: "",
  qualification: "",
  picture: "",
  marksheet: "",
};

function Career() {
  const [centerList, setCenterList] = useState([]);

  const handleCareerForm = async (e, { resetForm }) => {
    const res = await jobApplicantService.submitApplicantForm(e);
    if (res.status) {
      resetForm();
      toast.success(res.message);
      displayRazorpay({
        name: res.data.candidateName,
        email: res.data.email,
        phone: res.data.phone,
        id: res.data.orderId,
        documentId: res.data.documentId,
        currency: res.data.currency,
        amount: res.data.amount,
        notes: {
          model: "JOB_APPLICANT",
          charge: res.data.amount,
          documentId: res.data.documentId,
        },
      });
    }
  };

  React.useEffect(() => {
    const fetch = async () => {
      const res = await examCenterService.list();
      if (res.status) {
        setCenterList(
          res.data.map((center) => ({
            key: center.name,
            value: `${center.addressLine1}, ${center.addressLine2}`,
          }))
        );
      }
    };

    fetch();
  }, []);

  return (
    <div className="py-6 w-11/12 lg:w-8/12 xl:w-6/12 mx-auto">
      <h4 className="text-2xl mb-4">Apply for job</h4>
      <Formik
        initialValues={initialFormValue}
        validationSchema={careerFormValidation}
        onSubmit={handleCareerForm}
      >
        {({ setFieldValue, isSubmitting }) => (
          <Form>
            <h4 className="text-primary    font-medium  ">
              {" "}
              Please fill all the required details
            </h4>
            <div className="mt-4">
              <TextInput
                name="candidateName"
                placeholder="Candidate Name"
                inputClassName="w-full"
                label="Candidate Name"
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
              <TextInput
                name="panNumber"
                placeholder="Pan Number"
                inputClassName="w-full "
                label="Pan Number"
              />
              <SelectInput
                label="Exam Center"
                name="examCenter"
                placeholder="Exam Center"
                options={centerList}
              />

              <TextInput
                name="designation"
                placeholder="Designation"
                inputClassName="w-full"
                label="Designation"
              />
              <TextInput
                name="qualification"
                placeholder="Qualification"
                inputClassName="w-full"
                label="Qualification"
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
              <div>
                <FilePondUploader
                  label="Upload Passport Size Photo"
                  setFieldValue={setFieldValue}
                  name="picture"
                />
              </div>
              <div>
                <FilePondUploader
                  label="Upload Latest Marksheet"
                  setFieldValue={setFieldValue}
                  name="marksheet"
                />
              </div>
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

export default Career;
