import React from "react";
import { NavLink, useLocation, Link } from "react-router-dom";
import { GiBookCover, GiHamburgerMenu } from "react-icons/gi";

function Header() {
  const location = useLocation();
  const [showMenu, setShowMenu] = React.useState(false);

  const toggleMenu = () => setShowMenu((e) => !e);

  React.useEffect(() => {
    setShowMenu(false);
  }, [location.pathname]);
  return (
    <>
      <header className="bg-primary text-white p-4  flex items-center justify-between">
        <Link to="/">
          <div className="flex items-center space-x-4 hover:text-secondary">
            <GiBookCover size={39} className="" />
            <p className="font-medium ">Prayash Education</p>
          </div>
        </Link>
        <div onClick={toggleMenu} className="md:hidden cursor-pointer">
          <GiHamburgerMenu size={30} />
        </div>
        <div className="hidden md:flex items-center justify-end  text-sm">
          <NavLink
            activeClassName="text-secondary"
            exact
            to="/"
            className="p-4 hover:text-secondary transition-all"
          >
            Home
          </NavLink>
          <NavLink
            activeClassName="text-secondary"
            to="/gallery"
            className="p-4 hover:text-secondary transition-all"
          >
            Gallery
          </NavLink>
          <NavLink
            activeClassName="text-secondary"
            to="/result"
            className="p-4 hover:text-secondary transition-all"
          >
            Results
          </NavLink>
          <NavLink
            activeClassName="text-secondary"
            to="/admission-form"
            className="p-4 hover:text-secondary transition-all"
          >
            Admission
          </NavLink>
          <NavLink
            activeClassName="text-secondary"
            to="/scholarship-form"
            className="p-4 hover:text-secondary transition-all"
          >
            Scholarship
          </NavLink>
          <NavLink
            activeClassName="text-secondary"
            to="/school-registration"
            className="p-2 hover:text-secondary transition-all block"
          >
            School Registration
          </NavLink>
          <NavLink
            activeClassName="text-secondary"
            to="/job-application"
            className="p-4 hover:text-secondary transition-all"
          >
            Apply for job
          </NavLink>
          <NavLink
            activeClassName="text-secondary"
            to="/contact"
            className="p-4 hover:text-secondary transition-all"
          >
            Contact us
          </NavLink>
        </div>
      </header>
      <div
        className={`${
          !showMenu ? "h-0" : "h-auto p-4 md:p-8"
        } transition-all bg-primary overflow-hidden  text-white  `}
      >
        <NavLink
          activeClassName="text-secondary"
          exact
          to="/"
          className="p-2 hover:text-secondary transition-all block"
        >
          Home
        </NavLink>
        <NavLink
          activeClassName="text-secondary"
          to="/gallery"
          className="p-4 hover:text-secondary transition-all"
        >
          Gallery
        </NavLink>
        <NavLink
          activeClassName="text-secondary"
          exact
          to="/result"
          className="p-2 hover:text-secondary transition-all block"
        >
          Results
        </NavLink>
        <NavLink
          activeClassName="text-secondary"
          to="/admission-form"
          className="p-2 hover:text-secondary transition-all block"
        >
          Admission
        </NavLink>
        <NavLink
          activeClassName="text-secondary"
          to="/scholarship-form"
          className="p-2 hover:text-secondary transition-all block"
        >
          Scholarship
        </NavLink>
        <NavLink
          activeClassName="text-secondary"
          to="/student-league"
          className="p-2 hover:text-secondary transition-all block"
        >
          Student Premium League
        </NavLink>
        <NavLink
          activeClassName="text-secondary"
          to="/job-application"
          className="p-2 hover:text-secondary transition-all block"
        >
          Apply for job
        </NavLink>
        <NavLink
          activeClassName="text-secondary"
          to="/school-registration"
          className="p-2 hover:text-secondary transition-all block"
        >
          School Registration
        </NavLink>
        <NavLink
          activeClassName="text-secondary"
          to="/contact"
          className="p-2 hover:text-secondary transition-all block"
        >
          Contact us
        </NavLink>
      </div>
    </>
  );
}

export default Header;
