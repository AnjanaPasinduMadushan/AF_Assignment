import React from "react";
import { complaintsStore } from "../src/stores/complaintsStore";

const GenerateReportButton = () => {
  const generatePDFReport = () => {
    complaintsStore.getState().generatePDFReport();
  };

  return (
    <button onClick={generatePDFReport}>Generate Report</button>
  );
};

export default GenerateReportButton;
