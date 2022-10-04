import React, { useState } from "react";
import { NavLink, Switch, Route } from "react-router-dom";
import Button from "../ui/Button";
import { meritListService } from "../services";

function TableData({ student }) {
  return (
    <>
      <tr className=" border-1  border-gray-300 ">
        <td className=" p-2 px-4">{student.name}</td>
        <td className=" p-2 px-4">{student.fatherName}</td>
        <td className=" p-2 px-4">{student.email}</td>
        <td className=" p-2 px-4">{student.phone}</td>
        <td className=" p-2 px-4">{student.applicationNumber}</td>
        <td className=" p-2 px-4">{student.academicYear}</td>
      </tr>
    </>
  );
}

function MeritList({ academicYear }) {
  const [list, setList] = useState([]);
  const [fetching, setFetching] = React.useState(false);

  React.useEffect(() => {
    const fetch = async () => {
      setFetching((e) => !e);
      const res = await meritListService.getList({
        academicYear,
      });
      setFetching((e) => !e);
      if (res.status) {
        setList(res.data);
      }
    };

    fetch();
  }, [academicYear]);
  return (
    <div className="my-6 w-full">
      <h4 className="text-2xl mb-4">Merit List {academicYear}</h4>
      <div className="">
        <>
          {fetching ? (
            <div className="grid place-content-center min-h-[40vh]">
              <div className="">
                <div className="circle loader"></div>
              </div>
              <p className="text-center">Loading...</p>
            </div>
          ) : (
            <div className="overflow-x-scroll scrollbar-hide p-2">
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
                    <td className="p-2 px-4 whitespace-nowrap">
                      Application Number
                    </td>
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
          )}
        </>
      </div>
    </div>
  );
}

function ResultList({ academicYear }) {
  return (
    <div className="my-6">
      <h4 className="text-2xl mb-4">Result {academicYear}</h4>
      <div className="flex items-end space-x-4">
        <div className="">
          <label className="text-sm mb-2 block" htmlFor="roll_number">
            Enter Roll Number
          </label>
          <input
            id="roll_number"
            className={`p-2 px-4 min-w-[240px] rounded ring-1 !ring-primary border-0 focus:ring-2 text-sm outline-none focus:outline-none `}
          />
        </div>
        <Button>View Result</Button>
      </div>
      <div className="grid grid-cols-3 gap-4 my-6">
        <div className="text-sm ">
          <p className="text-gray-500 text-xs font-medium">Name</p>
          <p className="text-gray-800">Raunak Joshi</p>
        </div>
        <div className="text-sm ">
          <p className="text-gray-500 text-xs font-medium">Father Name</p>
          <p className="text-gray-800">Aswani Joshi</p>
        </div>
        <div className="text-sm ">
          <p className="text-gray-500 text-xs font-medium">Roll</p>
          <p className="text-gray-800">7847566</p>
        </div>
        <div className="text-sm ">
          <p className="text-gray-500 text-xs font-medium">Class</p>
          <p className="text-gray-800">4</p>
        </div>
        <div className="text-sm ">
          <p className="text-gray-500 text-xs font-medium">School</p>
          <p className="text-gray-800">Delhi Public School, Singrauli</p>
        </div>
        <div className="text-sm ">
          <p className="text-gray-500 text-xs font-medium">Marks</p>
          <p className="text-gray-800">49/50</p>
        </div>
        <div className="text-sm ">
          <p className="text-gray-500 text-xs font-medium">Result</p>
          <p className="text-gray-800">Pass</p>
        </div>
      </div>
    </div>
  );
}

function Forum() {
  let currentYear = new Date().getFullYear();
  const [academicYear, setAcademicYear] = useState(currentYear);
  return (
    <div className="py-6 w-11/12 lg:w-8/12 xl:w-8/12 mx-auto min-h-[60vh]">
      <div className="flex items-center justify-between">
        <div className="flex overflow-hidden items-center ring-1 ring-gray-200 bg-gray-100 rounded-full w-max">
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
        </div>
        <select
          value={academicYear}
          onChange={(e) => setAcademicYear(e.target.value)}
          className={`p-1 px-2 w-56  rounded ring-1 !ring-primary border-0 focus:ring-2 text-sm outline-none focus:outline-none `}
        >
          {[-1, 0, 1, 2, 3].map((dd, ind) => (
            <option key={ind} value={currentYear - dd}>
              {currentYear - dd}
            </option>
          ))}
        </select>
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
