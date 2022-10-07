import React from "react";
import { FiPhoneCall, FiMail, FiMap } from "react-icons/fi";

function Contact() {
  return (
    <div
      style={{
        backgroundImage:
          'linear-gradient(125deg, #000 50%, rgba(0,0,0,0)), url("/post-box.jpg")',
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className="px-8 xl:p-10 py-10"
    >
      <div className="my-10 w-full md:w-6/12 text-white ">
        <div className="">
          <h4 className="text-2xl font-medium">Get In Touch</h4>
          <h4 className="text-sm">Feel free to ask your query</h4>
        </div>
        <div className="mt-10 w-full md:w-8/12">
          <div className="mb-4 flex justify-start items-center">
            <span>
              <FiPhoneCall size={24} />
            </span>
            <span className="ml-4 ">+91-958-460-6245 </span>
          </div>
          <div className="mb-4 flex justify-start items-center">
            <span>
              <FiMail size={24} />
            </span>
            <span className="ml-4 "> prayasheducation86@gmail.com</span>
          </div>
          <div className="mb-4 flex justify-start items-start md:items-center">
            <span>
              <FiMap size={24} />
            </span>
            <span className="ml-4">Joura, Morena, Madhya Pradesh</span>
          </div>
        </div>

        <div className="text-xs w-full md:w-8/12 mt-10 ">
          <h4 className="font-medium ">About Developer</h4>
          <h4 type="caption" className=" md:mt-2">
            This website is designed and developed by Ajay. I am always excited
            to work on some awesome projects, email me and let's discuss over
            coffee.
            <br />
            <span className="text-secondary mt-4 block font-medium">
              aju9617@gmail.com
            </span>
          </h4>
        </div>
      </div>
    </div>
  );
}

export default Contact;
