import { useState } from "react";
import { saveJob } from "./lib/storage";
import JobManager from "./JobManager";
import { exportToPDF, exportToCSV } from "./lib/exportUtils";

export default function StartPage({ onSubmit }) {
  const [jobName, setJobName] = useState("");
  const [lineups, setLineups] = useState("A01,A02,B01,B02,C01");
  const [pdusPerLineup, setPdusPerLineup] = useState(2);
  const [subfeedsPerPDU, setSubfeedsPerPDU] = useState(8);
  const [subfeedBreakerAmps, setSubfeedBreakerAmps] = useState(600);
  const [subfeedVoltage, setSubfeedVoltage] = useState(415);
  const [pduMainBreakerAmps, setPduMainBreakerAmps] = useState(996);
  const [pduVoltage, setPduVoltage] = useState(480);
  const [upstreamBreakers, setUpstreamBreakers] = useState([{ label: "MSB", tripAmps: 1200 }]);

  const handleSubmit = () => {
    const lineupNames = lineups.split(",").map((l) => l.trim());
    const config = {
      jobName,
      lineupNames,
      subfeedsPerPDU,
      subfeedBreakerAmps,
      subfeedVoltage,
      pduMainBreakerAmps,
      pduVoltage,
      upstreamBreakers,
      pdusPerLineup
    };
    saveJob(jobName, config);
    onSubmit(config);
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h2>Create New Job</h2>
      <label>Jobsite Name</label>
      <input value={jobName} onChange={(e) => setJobName(e.target.value)} />
      <label>Lineups (comma-separated)</label>
      <input value={lineups} onChange={(e) => setLineups(e.target.value)} />
      <label>PDUs per Lineup</label>
      <input type="number" value={pdusPerLineup} onChange={(e) => setPdusPerLineup(Number(e.target.value))} />
      <label>Subfeeds per PDU</label>
      <input type="number" value={subfeedsPerPDU} onChange={(e) => setSubfeedsPerPDU(Number(e.target.value))} />
      <label>Subfeed Breaker Size (A)</label>
      <input type="number" value={subfeedBreakerAmps} onChange={(e) => setSubfeedBreakerAmps(Number(e.target.value))} />
      <label>Subfeed Voltage (V)</label>
      <input type="number" value={subfeedVoltage} onChange={(e) => setSubfeedVoltage(Number(e.target.value))} />
      <label>PDU Main Breaker Trip (A)</label>
      <input type="number" value={pduMainBreakerAmps} onChange={(e) => setPduMainBreakerAmps(Number(e.target.value))} />
      <label>PDU Voltage (V)</label>
      <input type="number" value={pduVoltage} onChange={(e) => setPduVoltage(Number(e.target.value))} />
      <button onClick={handleSubmit} style={{ marginTop: 16 }}>Continue to Planner & Save Job</button>
      <hr style={{ margin: "2rem 0" }} />
      <JobManager />
    </div>
  );
}
