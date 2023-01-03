import React from "react";
import "./Section.scss";
const Section = ({ children, name }) => {
  return <section className={`formContainer ${name}`}>{children}</section>;
};

export default Section;
