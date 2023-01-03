import React from "react";

const Helmet = ({ children, title }) => {
  document.title = "Wa3rin Chat - " + title;
  return <>{children}</>;
};

export default Helmet;
