import React, { useState } from "react";
import { NavLink, Switch, Route } from "react-router-dom";
import Button from "../ui/Button";
import { meritListService, resultService, admitCardService } from "../services";
import toast from "react-hot-toast";

function TableData({ student }) {
  return (
    <>
      <tr className=" border-1  border-gray-300 ">
        <td className=" p-2 px-4">{student.name}</td>
        <td className=" p-2 px-4">{student.fatherName}</td>
        <td className=" p-2 px-4">{student.email}</td>
        <td className=" p-2 px-4">{student.phone}</td>
        <td className=" p-2 px-4">{student.rollNumber}</td>
        <td className=" p-2 px-4">{student.academicYear}</td>
      </tr>
    </>
  );
}

function MeritList({ academicYear }) {
  const [list, setList] = useState([]);
  const [fetching, setFetching] = React.useState(false);
  const [module, setModule] = useState("ADMISSION_APPLICANT");

  React.useEffect(() => {
    const fetch = async () => {
      setFetching((e) => !e);
      const res = await meritListService.getList({
        academicYear,
        module,
      });
      setFetching((e) => !e);
      if (res.status) {
        setList(res.data);
      }
    };

    fetch();
  }, [academicYear, module]);
  return (
    <div className="my-6 w-full">
      <h4 className="text-2xl mb-4">Merit List {academicYear}</h4>
      <div className="">
        <div className="mb-4">
          <label className="text-sm mb-2 block" htmlFor="roll_number">
            Choose Module
          </label>
          <select
            value={module}
            onChange={(e) => setModule(e.target.value)}
            className={`p-2 px-4 w-56 rounded ring-1 !ring-primary border-0 focus:ring-2 text-sm outline-none focus:outline-none `}
          >
            <option value="ADMISSION_APPLICANT">Admission</option>
            <option value="SCHOLARSHIP_APPLICANT">Scholarship</option>
          </select>
        </div>
        <>
          {fetching ? (
            <div className="grid place-content-center min-h-[40vh]">
              <div className="">
                <div className="circle loader"></div>
              </div>
              <p className="text-center">Loading...</p>
            </div>
          ) : list.length ? (
            <div className="overflow-x-scroll scrollbar-hide p-[3px]">
              <table
                style={{ borderSpacing: "0 10px" }}
                className=" w-full  ring-1 ring-gray-500  table-auto"
              >
                <thead>
                  <tr className="text-sm  !font-medium bg-primary text-white">
                    <td className="p-2 px-4 whitespace-nowrap">Name</td>
                    <td className="p-2 px-4 whitespace-nowrap">Father Name</td>
                    <td className="p-2 px-4 whitespace-nowrap">Email</td>
                    <td className="p-2 px-4 whitespace-nowrap">Phone</td>
                    <td className="p-2 px-4 whitespace-nowrap">Roll Number</td>
                    <td className="p-2 px-4 whitespace-nowrap">
                      Academic Year
                    </td>
                  </tr>
                </thead>
                <tbody className=" text-sm ">
                  {list.map((student) => (
                    <TableData student={student} key={student.id} />
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-4 text-center text-gray-500">No Result found</div>
          )}
        </>
      </div>
    </div>
  );
}

function ResultList({ academicYear }) {
  const [data, setData] = useState(null);
  const [rollNumber, setRollNumber] = useState("");
  const [module, setModule] = useState("JOB_APPLICANT");
  const [fetching, setFetching] = React.useState(false);
  const fetchResult = async () => {
    if (!rollNumber) return;
    setFetching((e) => !e);

    const promise = resultService.getResult({
      academicYear,
      rollNumber,
      module,
    });
    toast.promise(promise, {
      loading: "Fetching result...",
      success: (res) => {
        console.log(res);
        let msg = "";
        if (res.data) {
          setData(res.data);
          msg = "Success";
        } else {
          setData(null);
          msg = "Result not found!";
        }
        setFetching((e) => !e);
        return msg;
      },
      error: () => {
        setFetching((e) => !e);
        return "Something went wrong";
      },
    });
  };
  return (
    <div className="my-6">
      <h4 className="text-2xl mb-4">Result {academicYear}</h4>
      <div className="flex items-end gap-4 flex-wrap">
        <div className="">
          <label className="text-sm mb-2 block" htmlFor="roll_number">
            Enter Roll Number
          </label>
          <input
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
            id="roll_number"
            className={`p-2 px-4 min-w-[240px] rounded ring-1 !ring-primary border-0 focus:ring-2 text-sm outline-none focus:outline-none `}
          />
        </div>
        <div className="">
          <label className="text-sm mb-2 block" htmlFor="roll_number">
            Choose Module
          </label>
          <select
            value={module}
            onChange={(e) => setModule(e.target.value)}
            className={`p-2 px-4 w-56  rounded ring-1 !ring-primary border-0 focus:ring-2 text-sm outline-none focus:outline-none `}
          >
            <option value="JOB_APPLICANT">Job Application</option>
            <option value="ADMISSION_APPLICANT">Admission</option>
            <option value="SCHOLARSHIP_APPLICANT">Scholarship</option>
          </select>
        </div>

        <Button disabled={fetching} onClick={fetchResult}>
          View Result
        </Button>
      </div>
      {fetching && (
        <div className="grid place-content-center min-h-[40vh]">
          <div className="">
            <div className="circle loader"></div>
          </div>
          <p className="text-center">Loading...</p>
        </div>
      )}
      {data && (
        <div className="grid grid-cols-3 gap-4 my-6">
          <div className="text-sm ">
            <p className="text-gray-500 text-xs font-medium">Name</p>
            <p className="text-gray-800">{data.name}</p>
          </div>
          <div className="text-sm ">
            <p className="text-gray-500 text-xs font-medium">Father Name</p>
            <p className="text-gray-800">{data.fatherName}</p>
          </div>
          <div className="text-sm ">
            <p className="text-gray-500 text-xs font-medium">Roll</p>
            <p className="text-gray-800">{data.rollNumber}</p>
          </div>
          <div className="text-sm ">
            <p className="text-gray-500 text-xs font-medium">Class</p>
            <p className="text-gray-800">{data.class}</p>
          </div>
          <div className="text-sm ">
            <p className="text-gray-500 text-xs font-medium">School</p>
            <p className="text-gray-800">{data.school}</p>
          </div>
          <div className="text-sm ">
            <p className="text-gray-500 text-xs font-medium">Marks</p>
            <p className="text-gray-800">{data.marks}</p>
          </div>
          <div className="text-sm ">
            <p className="text-gray-500 text-xs font-medium">Result</p>
            <p className="text-gray-800">{data.result}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function AdmitCard({ academicYear }) {
  const [data, setData] = useState(null);
  const [rollNumber, setRollNumber] = useState("");
  const [fetching, setFetching] = React.useState(false);
  const [module, setModule] = useState("ADMISSION_APPLICANT");

  const downloadAdmitCard = async () => {
    if (!rollNumber) return;
    setFetching((e) => !e);
    await admitCardService.download({ rollNumber, module, academicYear });
    setFetching((e) => !e);
  };

  return (
    <div className="my-6">
      <h4 className="text-2xl mb-4">Admit Card {academicYear}</h4>
      <div className="flex items-end space-x-4">
        <div className="">
          <label className="text-sm mb-2 block" htmlFor="roll_number">
            Enter Roll Number
          </label>
          <input
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
            id="roll_number"
            className={`p-2 px-4 min-w-[240px] rounded ring-1 !ring-primary border-0 focus:ring-2 text-sm outline-none focus:outline-none `}
          />
        </div>
        <div className="">
          <label className="text-sm mb-2 block" htmlFor="roll_number">
            Choose Module
          </label>
          <select
            value={module}
            onChange={(e) => setModule(e.target.value)}
            className={`p-2 px-4 w-56 rounded ring-1 !ring-primary border-0 focus:ring-2 text-sm outline-none focus:outline-none `}
          >
            <option value="JOB_APPLICANT">Job Application</option>
            <option value="ADMISSION_APPLICANT">Admission</option>
            <option value="SCHOLARSHIP_APPLICANT">Scholarship</option>
          </select>
        </div>
        <Button disabled={fetching} onClick={downloadAdmitCard}>
          {fetching ? "Please wait..." : "Download"}
        </Button>
      </div>
    </div>
  );
}

function Forum() {
  let currentYear = new Date().getFullYear();
  const [academicYear, setAcademicYear] = useState(currentYear);
  return (
    <div className="py-6 w-11/12 lg:w-8/12 xl:w-8/12 mx-auto min-h-[60vh]">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex overflow-hidden shadow-md items-center ring-1 ring-gray-200 bg-gray-100 rounded-full w-max">
          <NavLink
            activeClassName="bg-primary text-white "
            exact
            to="/result"
            className="w-max text-sm hover:bg-primary hover:text-white p-2 cursor-pointer px-4"
          >
            Result
          </NavLink>
          <NavLink
            activeClassName="bg-primary text-white "
            exact
            to="/result/merit"
            className="w-max text-sm hover:bg-primary hover:text-white p-2 cursor-pointer px-4"
          >
            Merit List
          </NavLink>
          <NavLink
            activeClassName="bg-primary text-white "
            exact
            to="/result/admit-card"
            className="w-max text-sm hover:bg-primary hover:text-white p-2 cursor-pointer px-4"
          >
            Admit Card
          </NavLink>
        </div>

        <div>
          <label className="text-sm mb-2 block" htmlFor="">
            Academic Year
          </label>
          <select
            value={academicYear}
            onChange={(e) => setAcademicYear(e.target.value)}
            className={`p-1 px-2 w-56  rounded ring-1 !ring-primary border-0 focus:ring-2 text-sm outline-none focus:outline-none `}
          >
            {[-1, 0, 1, 2].map((dd, ind) => (
              <option key={ind} value={currentYear - dd}>
                {currentYear - dd}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="py-2 w-full">
          <Switch>
            <Route
              component={() => <MeritList academicYear={academicYear} />}
              path="/result/merit"
              exact
            />
            <Route
              component={() => <AdmitCard academicYear={academicYear} />}
              path="/result/admit-card"
              exact
            />
            <Route
              component={() => <ResultList academicYear={academicYear} />}
              path="/result"
              exact
            />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default Forum;
