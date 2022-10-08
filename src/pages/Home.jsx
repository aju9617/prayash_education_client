import React, { useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { Button } from "../ui";
import { BsArrowRightShort } from "react-icons/bs";
import { notificationService } from "../services";
import bg from "../media/bg.jpg";
import students from "../media/students.jpg";
import key1 from "../media/keyFeature-1.svg";
import key2 from "../media/keyFeature-2.svg";
import key3 from "../media/keyFeature-3.svg";

function LatestInformation() {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalpage, setTotalPage] = useState(0);
  const [fetching, setFetching] = React.useState(false);

  React.useEffect(() => {
    const fetch = async () => {
      setFetching((e) => !e);
      const res = await notificationService.getList({
        page,
      });
      setFetching((e) => !e);
      if (res.status) {
        setList((e) => {
          let newList = [...e, ...res.data.results];
          newList = newList.filter(
            (value, index, self) =>
              index === self.findIndex((t) => t.id === value.id)
          );
          return newList;
        });
        setTotalPage(res.data.totalPages);
      }
    };

    fetch();
  }, [page]);
  return (
    <div className="md:w-11/12 xl:w-9/12 p-4 md:p-8   mx-auto">
      <h4 className="text-3xl font-medium text-secondary mb-4">
        Latest Updates
      </h4>
      <ul className="list-disc ">
        {list.map((current) => (
          <a
            key={current.id}
            href={current.redirectUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <li className="flex items-center border-b border-gray-300 py-2">
              {current.message}
              {moment(current.validDate).isAfter(moment()) ? (
                <p className="mx-2 w-max text-sm blink">New</p>
              ) : (
                ""
              )}
            </li>
          </a>
        ))}
      </ul>
      {page < totalpage && (
        <p
          onClick={() => setPage((e) => e + 1)}
          className="text-sm mt-4 text-primary text-right cursor-pointer"
        >
          Load more
        </p>
      )}
    </div>
  );
}

function AboutUs() {
  const [readMode, setReadMode] = useState(false);
  const message = `Prayash Education is the fastest growing non profit organization in
          the field of education based in India. Our aim is to provide free and
          higher education to every section of India. The inequality in
          education between India and developed countries has to be removed. A
          mission of Prayash Education is to inculcate the ability of the
          students to learn in an easy-to-understand manner and to lead
          proactive and efficient leadership. We help in providing higher
          education and employment to the students through Prayash Education.
          Colleges and schools of India are incorporated by Prayash Education.
          Prayash Education works closely with students and institutions. Due to
          which higher education is given to the students. Our organization
          provides financial assistance in the form of loans to the people of
          the lower classes.`;
  return (
    <div className="md:w-11/12 xl:w-9/12 p-4 md:p-8 grid grid-cols-1 gap-4 md:grid-cols-2  mx-auto">
      <div>
        <h4 className="text-3xl font-medium text-secondary mb-4">About us</h4>
        <p>
          {readMode ? message : `${message.slice(0, 350)}...`}
          <span
            className="text-secondary cursor-pointer "
            onClick={() => setReadMode((e) => !e)}
          >
            {" "}
            {readMode ? "read less" : " read more"}
          </span>
        </p>
      </div>
      <div>
        <img
          src={students}
          alt="cursol"
          className="rounded-md h-56 w-full object-cover"
        />
      </div>
    </div>
  );
}

function Feature() {
  return (
    <div className="mb-14 ">
      <div className="grid grid-cols-1 space-y-6 md:space-y-0 md:grid-cols-3 md:space-x-6 mx-auto md:w-11/12 xl:w-9/12  p-4 md:p-8 py-[50px]">
        <h4 className="text-3xl font-medium text-secondary mb-6 col-span-full">
          Features
        </h4>
        <div className="">
          <img src={key1} alt="great faculty" className="mb-4 w-11 " />
          <h4 className="text-xl font-medium text-primary">
            World Class Faculty
          </h4>
          <p className="text-sm mt-2">
            Learn from carefully designed courses taught by experienced IIT
            Madras faculty and other industry experts.
          </p>
        </div>
        <div>
          <img src={key2} alt="flexible" className="mb-4 w-11 " />
          <h4 className="text-xl font-medium text-primary">Flexible</h4>
          <p className="text-sm mt-2">
            Our program is flexible with multiple entry and exit points for
            learners from different backgrounds with different aspirations.
          </p>
        </div>
        <div>
          <img src={key3} alt="course support" className="mb-4 w-11 " />
          <h4 className="text-xl font-medium text-primary">Course Support</h4>
          <p className="text-sm mt-2">
            Each course will have discussion forums with an active academic team
            to help in clearing doubts.
          </p>
        </div>
      </div>
    </div>
  );
}

function Home() {
  return (
    <>
      <div className="p-4 md:p-8 pb-4 w-full h-[80vh] relative">
        <div className="flex justify-between items-center w-11/12 mx-auto text-white">
          <img
            src={bg}
            alt="landing"
            className=" absolute top-0 left-0 right-0 bottom-0 h-full w-full object-cover   -z-10 "
          />
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-tr from-gray-900 to-transparent bg-opacity-40">
            <div className=" h-full flex items-center pl-8">
              <div>
                <h2 className="text-4xl font-medium">
                  It’s never late to learn new skills
                </h2>
                <p className="md:w-96 mt-2 mb-4 ">
                  The great thing about learning is that you never have to stop!
                  There’s no limit as to the amount of knowledge you can obtain.
                  So, rip a page from Gandhi’s book and keep on learning while
                  you’re living.
                </p>
                <Link to="/admission-form">
                  <Button className="flex items-center space-x-2 mt-4">
                    <span className="block">Get Admission </span>
                    <BsArrowRightShort size={20} className="block" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Feature />
      <AboutUs />
      <LatestInformation />
    </>
  );
}

export default Home;
