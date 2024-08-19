const cron = require("node-cron");
const { fetchEverhourData } = require("./api/everhour");
const { fetchAsanaData, tasksCompleted } = require("./api/asana");
const { generateSummary } = require("./openai");
const { sendEmail } = require("./routes/email");

//Schedule the email to be sent every Monday (1) at 6 am (0 6 * * 1)
cron.schedule("1 1 * * 1", async () => {
  try {
    const everhourData = await fetchEverhourData();
    const asanaData = await fetchAsanaData();
    const sortedTaskTotals = tasksCompleted(asanaData);
    const summary = await generateSummary(asanaData);
    await sendEmail(everhourData, sortedTaskTotals, summary);
  } catch (error) {
    console.error("Error:", error);
  }
});
