import jsPDF from "jspdf";

export function exportToPDF(jobName, config, distributionData) {
  const doc = new jsPDF();
  doc.setFontSize(14);
  doc.text(`Job: ${jobName}`, 10, 10);
  doc.setFontSize(12);
  doc.text("Lineups: " + config.lineupNames.join(", "), 10, 20);
  doc.text(`PDUs/Lineup: ${config.pdusPerLineup}`, 10, 30);

  let y = 40;
  distributionData.forEach((entry, i) => {
    doc.text(`${entry.pduKey} - ${entry.load} kW`, 10, y);
    if (entry.subfeeds && entry.subfeeds.length) {
      entry.subfeeds.forEach((sf, idx) => {
        y += 6;
        doc.text(`  S${idx + 1}: ${sf.load} kW`, 15, y);
      });
    }
    y += 10;
  });

  doc.save(`${jobName || "load-distribution"}.pdf`);
}

export function exportToCSV(jobName, distributionData) {
  let csv = "PDU,Load (kW),Subfeed,Subfeed Load (kW)\n";
  distributionData.forEach((entry) => {
    if (!entry.subfeeds || entry.subfeeds.length === 0) {
      csv += `${entry.pduKey},${entry.load},,\n`;
    } else {
      entry.subfeeds.forEach((sf, idx) => {
        csv += `${entry.pduKey},${entry.load},S${idx + 1},${sf.load}\n`;
      });
    }
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${jobName || "load-distribution"}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
