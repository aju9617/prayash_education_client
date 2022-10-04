import React, { useState } from "react";
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

function TableData({ school }) {
  return (
    <>
      <tr className=" border-1  border-gray-300 ">
        <td className=" p-2 px-4">{school.schoolName}</td>
        <td className=" p-2 px-4">{school.email}</td>
        <td className=" p-2 px-4">{school.phone}</td>
      </tr>
    </>
  );
}

function SchoolList() {
  const [filter, setFilter] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [list, setList] = useState([]);

  const handleFilter = (e) => {
    const key = e.target.value;
    setFilter(key);

    if (!key.length) {
      setFilteredList(list);
      return;
    }
    const newList = list.filter((curr) => {
      if (curr.schoolName.toUpperCase().search(key.toUpperCase()) > -1) {
        return true;
      } else return false;
    });

    setFilteredList(newList);
  };

  React.useEffect(() => {
    async function fetch() {
      setFetching(true);
      const res = await schoolService.getList();
      if (res.status) {
        setList(res.data);
        setFilteredList(res.data);
      }
      setFetching(false);
    }

    fetch();
  }, []);
  return (
    <div>
      <div className="mb-6 my-4">
        <h2 className="text-xl flex items-center justify-between font-medium text-gray-700 mb-2">
          Registered School{" "}
          <input
            onChange={handleFilter}
            value={filter}
            placeholder="Filter Schools"
            className={`p-1 px-4 rounded ring-1 !ring-primary border-0 focus:ring-2 text-sm outline-none focus:outline-none `}
          />
        </h2>
      </div>
      {fetching ? (
        <div className="grid place-content-center min-h-[40vh]">
          <div className="">
            <div className="circle loader"></div>
          </div>
          <p className="text-center">Loading...</p>
        </div>
      ) : (
        <>
          <table
            style={{ borderSpacing: "0 10px" }}
            className=" w-full  ring-1 ring-gray-500  table-auto"
          >
            <thead>
              <tr className="text-sm  !font-medium bg-primary text-white">
                <td className="p-2 px-4">School Name</td>
                <td className="p-2 px-4">Email</td>
                <td className="p-2 px-4">Phone</td>
              </tr>
            </thead>
            <tbody className=" text-sm ">
              {filteredList.map((school) => (
                <TableData school={school} key={school.id} />
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

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
      <div>
        <SchoolList />
      </div>
    </div>
  );
}

export default SchoolRegistration;
