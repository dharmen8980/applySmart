export default async function getApplicationData() {
  const result = await fetch(`/api/database/activeApplications`);
  const data = result.json();
  return data;
}
