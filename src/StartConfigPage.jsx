// src/StartConfigPage.jsx
import { useState } from "react";

export default function StartPage({ onSubmit }) {
  const [jobName, setJobName] = useState("");
  const [lineupNames, setLineupNames] = useState("A01,A02,B01,B02,C01");
  const [pdusPerLineup, setPdusPerLineup] = useState(2);
  const [subfeedsPerPDU, setSubfeedsPerPDU] = useState(8);

  const handleSubmit = (e) => {
    e.preventDefault();
    const config = {
      jobName: jobName.trim(),
      lineupNames: lineupNames.split(",").map(name => name.trim()),
      pdusPerLineup: parseInt(pdusPerLineup),
      subfeedsPerPDU: parseInt(subfeedsPerPDU),
    };
    onSubmit(config);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "2rem auto", padding: "1rem", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2>Start New Job</h2>
      <label>
        Job Name:
        <input value={jobName} onChange={(e) => setJobName(e.target.value)} required />
      </label>
      <br />
      <label>
        Lineups (comma separated):
        <input value={lineupNames} onChange={(e) => setLineupNames(e.target.value)} required />
      </label>
      <br />
      <label>
        PDUs per Lineup:
        <input type="number" value={pdusPerLineup} onChange={(e) => setPdusPerLineup(e.target.value)} min={1} required />
      </label>
      <br />
      <label>
        Subfeeds per PDU:
        <input type="number" value={subfeedsPerPDU} onChange={(e) => setSubfeedsPerPDU(e.target.value)} min={1} required />
      </label>
      <br />
      <button type="submit">Continue to Planner</button>
    </form>
  );
}
