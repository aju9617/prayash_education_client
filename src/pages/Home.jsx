import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui";
import { BsArrowRightShort } from "react-icons/bs";
import landing from "../media/landing.jpg";
import key1 from "../media/keyFeature-1.svg";
import key2 from "../media/keyFeature-2.svg";
import key3 from "../media/keyFeature-3.svg";

function LatestInformation() {
  return (
    <div className="md:w-11/12 xl:w-9/12 p-4 md:p-8   mx-auto">
      <h4 className="text-3xl font-medium text-secondary mb-4">Latest News</h4>
      <ul className="list-disc pl-4 ">
        <li className=" cursor-pointer p-2 border-slate-500">
          Lorem ilisum dolor sit amet consectetur adipisicing elit. Delectus
          inventore i
        </li>
        <li className=" cursor-pointer p-2 border-slate-500">
          Lorem ilisum dolor sit amet consectetur adipisicing elit. Delectus
          inventore i
        </li>
        <li className=" cursor-pointer p-2 border-slate-500">
          Lorem ilisum dolor sit amet consectetur adipisicing elit. Delectus
          inventore i
        </li>
      </ul>
    </div>
  );
}

function Gallery() {
  return (
    <div className="md:w-11/12 xl:w-9/12 p-4 md:p-8 grid grid-cols-1 gap-4 md:grid-cols-2  mx-auto">
      <div>
        <h4 className="text-3xl font-medium text-secondary mb-4">
          Recent Activity
        </h4>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias
          sed fuga doloremque voluptatem? Quisquam laudantium commodi voluptatum
          magnam iusto animi, dolorum laboriosam repellendus rerum! Harum
          reiciendis ab non repellendus suscipit!
        </p>
      </div>
      <div>
        <img
          src={landing}
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
      <div className="p-4 md:p-8 pb-4 w-full  relative">
        <div className="flex justify-between items-center w-11/12 mx-auto text-white">
          <img
            src={landing}
            alt="landing"
            className="absolute top-0 left-0 right-0 bottom-0 h-full w-full object-cover   -z-10 "
          />
          <div className="my-auto h-[80vh] grid place-content-center">
            <h2 className="text-4xl font-medium">
              It’s never late to learn new skills
            </h2>
            <p className="md:w-96 mt-2 mb-4">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever
            </p>
            <Link to="/admission-form">
              <Button className="flex items-center space-x-2 mt-4">
                <span className="block">Get Admission </span>
                <BsArrowRightShort size={20} className="block" />
              </Button>
            </Link>
          </div>
          {/* <img src={student_group} alt="student group" className="ml-auto" /> */}
        </div>
      </div>
      <Feature />
      <Gallery />
      <LatestInformation />
    </>
  );
}

export default Home;
