import React from "react";
import { GiBookCover } from "react-icons/gi";
import { IoCall, IoLocationSharp } from "react-icons/io5";
import { AiFillInstagram } from "react-icons/ai";
import { IoMdMail } from "react-icons/io";
import { IoLogoWhatsapp } from "react-icons/io5";
import { BsFacebook, BsYoutube } from "react-icons/bs";
import { FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <div className="bg-primary p-4 md:p-8  text-white  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:space-x-4 xl:space-x-8">
      <div>
        <div className="flex space-x-4 text-secondary mt-4 md:mt-0">
          <GiBookCover size={32} className="" />
          <p className="font-medium text-xl">Prayash Education</p>
        </div>
        <p className="text-sm mt-2 w-9/12">
          Prayash Education is the fastest growing non profit organization in
          the field of education based in India.
        </p>
        <div className="flex space-x-4 mt-4 items-center">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.facebook.com/101172116082993/posts/115400007993537/?flite=scwspnss"
          >
            <BsFacebook size={22} />
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.instagram.com/prayasheducation/"
          >
            <AiFillInstagram size={24} />
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://twitter.com/Prayashedu22?t=_0i7nopvviVR6WIfqADbZg&s=08"
          >
            <FaTwitter size={24} />
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://wa.me/919584606245"
          >
            <IoLogoWhatsapp size={20} />
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://youtube.com/channel/UChx6xmEpthBwGnZL4xy130Q"
          >
            <BsYoutube size={20} />
          </a>
        </div>
      </div>
      <div>
        <h4 className="text-xl font-medium mb-4 mt-4 md:mt-0 text-secondary">
          Links
        </h4>
        <div className="text-sm capitalize  ">
          <Link to="/admission-form" className="block mb-1">
            Admission form
          </Link>
          <Link to="/scholarship-form" className="block mb-1">
            Scholarship form
          </Link>
          <Link to="/school-registration" className="block mb-1">
            School Registration
          </Link>
          <Link to="/student-league" className="block mb-1">
            Student premium league
          </Link>
          <Link to="/job-application" className="block mb-1">
            Job Apply
          </Link>
        </div>
      </div>

      <div>
        <h4 className="text-xl font-medium mb-4 mt-4 md:mt-0 text-secondary">
          Contact us
        </h4>
        <div className="text-sm">
          <p className="flex space-x-4 mb-1 items-center">
            <IoCall size={18} />
            <span>9584606245</span>
          </p>
          <p className="flex space-x-4 mb-1 items-center">
            <IoMdMail size={18} />
            <span>prayasheducation86@gmail.com</span>
          </p>
          <p className="flex space-x-4 mb-1 items-center">
            <IoLocationSharp size={18} />
            <span>Joura, Morena, Madhya Pradesh</span>
          </p>
        </div>
      </div>
      <p className="text-center mt-6 mb-2 col-span-full text-sm">
        &copy; {new Date().getFullYear()} prayasheducation. All rights reserved
      </p>
    </div>
  );
}

export default Footer;
