import { createContext, useContext, useState } from 'react';

const JobContext = createContext();

export function JobProvider({ children }) {
  const [jobConfig, setJobConfig] = useState(null);
  const [jobName, setJobName] = useState("");
  const [distributionState, setDistributionState] = useState({});

  const value = {
    jobName,
    setJobName,
    jobConfig,
    setJobConfig,
    distributionState,
    setDistributionState
  };

  return <JobContext.Provider value={value}>{children}</JobContext.Provider>;
}

export function useJob() {
  return useContext(JobContext);
}