const Asana = require("asana");
const config = require("../config/config");
const utils = require("../utils/utils");

// Initialize Asana API client
const client = Asana.ApiClient.instance;
const token = client.authentications["token"];
token.accessToken = config.asanaApiKey;

// Initialize Asana Tasks API instance
const tasksApiInstance = new Asana.TasksApi();

// Function to fetch data from Asana API
async function fetchAsanaData() {
  try {
    const { asanaAssignee, asanaWorkspace } = config;
    const { oneWeekAgoFormattedDate } = utils;

    // Create options for fetching Asana tasks
    const opts = {
      limit: 100,
      assignee: asanaAssignee,
      workspace: asanaWorkspace,
      completed_since: oneWeekAgoFormattedDate,
      opt_fields: "completed,projects.name,name,notes",
    };

    const result = await tasksApiInstance.getTasks(opts);
    const completedTasks = result.data;

    const asanaData = {};

    for (const task of completedTasks) {
      if (completedTasks.length > 0 && task.completed === true) {
        if (asanaData[task.projects[0]?.name]) {
          asanaData[task.projects[0].name].push({
            name: task.name,
            notes: task.notes,
          });
        } else {
          asanaData[task.projects[0]?.name || "No client assigned to task(s)"] =
            [{ name: task.name, notes: task.notes }];
        }
      }
    }

    return asanaData;
  } catch (error) {
    console.error("Error getting Asana tasks:", error);
    throw error;
  }
}

// Function to format tasks completed per client
function tasksCompleted(asanaData) {
  const sortedEntries = Object.entries(asanaData).sort(
    ([, tasksA], [, tasksB]) => tasksB.length - tasksA.length
  );

  let taskSummary = "";
  for (const [clientName, tasks] of sortedEntries) {
    taskSummary += `${tasks.length} Tasks Completed - ${clientName}\n`;
  }
  return taskSummary;
}

module.exports = { fetchAsanaData, tasksCompleted };
