// src/context/JobContext.js
import { createContext, useContext, useState } from "react";

const JobContext = createContext();

export function JobProvider({ children }) {
  const [jobConfig, setJobConfig] = useState(null);

  return (
    <JobContext.Provider value={{ jobConfig, setJobConfig }}>
      {children}
    </JobContext.Provider>
  );
}

export function useJob() {
  return useContext(JobContext);
}
