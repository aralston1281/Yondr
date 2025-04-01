import { useState } from "react";
import StartPage from "./StartConfigPage";
import LoadDistributionPlanner from "./LoadDistributionPlanner";
import { JobProvider, useJob } from "./context/JobContext";

function Router() {
  const { jobConfig } = useJob();
  return jobConfig ? <LoadDistributionPlanner config={jobConfig} /> : <StartPageWrapper />;
}

function StartPageWrapper() {
  const { setJobConfig } = useJob();
  return <StartPage onSubmit={setJobConfig} />;
}

export default function App() {
  return (
    <JobProvider>
      <Router />
    </JobProvider>
  );
}