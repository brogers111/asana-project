// Configuration variables
const config = {
  // Declare Everhour User ID found by exporting "Export My Data" on https://app.everhour.com/#/account/profile while logged into Everhour
  everhourUserId: process.env.EVERHOUR_USER_ID,
  // Declare Everhour API Key found on https://app.everhour.com/#/account/profile while logged into Everhour
  everhourApiKey: process.env.EVERHOUR_API_KEY,
  // Declare Asana assignee User GID found on https://app.asana.com/api/1.0/users while logged into Asana
  asanaAssignee: "me",
  // Identify Asana workspace ID found on https://app.asana.com/api/1.0/workspaces while logged into Asana
  asanaWorkspace: process.env.ASANA_WORKSPACE,
  // Identify Asana API Key found on XXX while logged into Asana
  asanaApiKey: process.env.ASANA_API_KEY,
  //OpenAI API key for ChatGPT
  openaiApiKey: process.env.OPENAI_API_KEY,
  // Fed to email.js file for email functionality
  gmailUsername: process.env.GMAIL_USERNAME,
  gmailPassword: process.env.GMAIL_PASSWORD,
};

module.exports = config;
