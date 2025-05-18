export function calculateAge(birthdate: string | Date): string {
  const birth = new Date(birthdate);
  const today = new Date();

  const years = today.getFullYear() - birth.getFullYear();
  const months = today.getMonth() - birth.getMonth();
  const days = today.getDate() - birth.getDate();

  let ageInMonths = years * 12 + months;
  if (days < 0) ageInMonths--;

  if (ageInMonths < 12) {
    return `${ageInMonths} month${ageInMonths !== 1 ? "s" : ""}`;
  }

  const finalYears = Math.floor(ageInMonths / 12);
  return `${finalYears} year${finalYears !== 1 ? "s" : ""}`;
}
