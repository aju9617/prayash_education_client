import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

import Home from "./Home";
import AdmissionForm from "./AdmissionForm";
import ScholarshipForm from "./ScholarshipForm";
import SchoolRegistration from "./SchoolRegistration";
import JobApplication from "./JobApplication";
import StudentPremiumLeague from "./StudentPremiumLeague";
import About from "./About";
import Contact from "./Contact";
import Result from "./Result";
import Gallery from "./Gallery";

function Pages() {
  const location = useLocation();

  React.useEffect(() => {
    document
      .querySelector("body")
      .scrollIntoView({ block: "start", behavior: "smooth" });
  }, [location]);
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/admission-form" component={AdmissionForm} />
        <Route exact path="/scholarship-form" component={ScholarshipForm} />
        <Route
          exact
          path="/school-registration"
          component={SchoolRegistration}
        />
        <Route exact path="/student-league" component={StudentPremiumLeague} />
        <Route exact path="/job-application" component={JobApplication} />
        <Route exact path="/about" component={About} />
        <Route exact path="/contact" component={Contact} />
        <Route path="/result" component={Result} />
        <Route path="/gallery" component={Gallery} />
        <Redirect from="/" to="/" />
      </Switch>
      <Footer />
    </>
  );
}

export default Pages;
