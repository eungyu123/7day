import { useState } from "react";
import "../../index.css";
import "./stepAnalysisPage.css";
import WeekStep from "../../component/stepAnalysis/weekStep";
import MonthStep from "../../component/stepAnalysis/monthStep";

export default function stepAnalysisPage() {
  return (
    <div className="container">
      <WeekStep />
      <MonthStep />
    </div>
  );
}
