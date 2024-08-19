const fetch = require("node-fetch");
const config = require("../config/config");
const utils = require("../utils/utils");

// Function to fetch data from Everhour API
async function fetchEverhourData() {
  const { everhourUserId, everhourApiKey } = config;
  const { oneWeekAgoFormattedDate, todayFormattedDate } = utils;

  // Set up the request headers for Everhour fetch request
  try {
    const headers = {
      "Content-Type": "application/json",
      "X-Api-Key": everhourApiKey,
    };

    const response = await fetch(
      `https://api.everhour.com/users/${everhourUserId}/time?from=${oneWeekAgoFormattedDate}&to=${todayFormattedDate}&limit=100`,
      {
        method: "GET",
        headers: headers,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch Everhour data");
    }

    const data = await response.json();

    const taskNameAndTime = [];

    // For each item in the returned data, assign the task names to taskName and times to complete to taskTime
    data.forEach((item) => {
      const taskName = item.task.name;
      const taskTime = item.time;

      //Then add each completed task to the newly created empty array with taskName and taskTime
      taskNameAndTime.push({
        taskName,
        taskTime,
      });
    });

    //Sort the completed projects by taskTime in descending order
    taskNameAndTime.sort((a, b) => b.taskTime - a.taskTime);

    //Display only the top 10 tasks
    const topTenTasks = taskNameAndTime.slice(0, 10);

    return topTenTasks;
  } catch (error) {
    console.error("Error fetching Everhour data:", error);
    throw error;
  }
}

module.exports = { fetchEverhourData };
