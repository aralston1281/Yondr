export function saveJob(name, config) {
  const jobs = JSON.parse(localStorage.getItem("jobs") || "{}");
  jobs[name] = config;
  localStorage.setItem("jobs", JSON.stringify(jobs));
}

export function loadJob(name) {
  const jobs = JSON.parse(localStorage.getItem("jobs") || "{}");
  return jobs[name] || null;
}

export function getAllJobNames() {
  return Object.keys(JSON.parse(localStorage.getItem("jobs") || "{}"));
}

export function deleteJob(name) {
  const jobs = JSON.parse(localStorage.getItem("jobs") || "{}");
  delete jobs[name];
  localStorage.setItem("jobs", JSON.stringify(jobs));
}