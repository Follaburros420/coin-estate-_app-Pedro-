export const handleFormateTime = (dateString) => {
  if (!dateString)
    return '__'
  const date = new Date(dateString);
  const day = date.getUTCDate(); // Get the day
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = monthNames[date.getUTCMonth()]; // Get the month name
  // const year = date.getUTCFullYear() + 10; // Add 10 to the year
  const year = date.getUTCFullYear(); // Add 10 to the year

  return `${day} ${month} ${year}`;
}