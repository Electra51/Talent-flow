import React from "react";
import { Helmet } from "react-helmet";

const HelmetReact = ({ title }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content="Employee management system" />
    </Helmet>
  );
};

export default HelmetReact;
