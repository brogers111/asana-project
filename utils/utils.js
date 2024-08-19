// Function to convert seconds to HH:MM:SS format
function convertSeconds(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours} hrs, ${minutes} min`;
}

// Create new variable for the prior week to use in Everhour & Asana fetch request
const oneWeekAgo = new Date();
oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
const year = oneWeekAgo.getFullYear();
const month = (oneWeekAgo.getMonth() + 1).toString().padStart(2, "0");
const day = oneWeekAgo.getDate().toString().padStart(2, "0");
const oneWeekAgoFormattedDate = `${year}-${month}-${day}`;

// Create new variable for today's date for Everhour fetch
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, "0");
const currentDay = currentDate.getDate().toString().padStart(2, "0");
const todayFormattedDate = `${currentYear}-${currentMonth}-${currentDay}`;

module.exports = {
  convertSeconds,
  oneWeekAgoFormattedDate,
  todayFormattedDate,
};
