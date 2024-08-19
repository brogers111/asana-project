const OpenAI = require("openai");
const config = require("./config");

// Initialize OpenAI API client
const openai = new OpenAI({ apiKey: config.openaiApiKey });

// Function to generate summary using OpenAI
async function generateSummary(asanaData) {
  try {
    const formattedAsanaData = JSON.stringify(asanaData);
    // Prepare prompt for OpenAI
    const prompt = `${formattedAsanaData} \n \n The data above has been exported from a project management tool. It includes tasks I've completed for the prior week. It has been sorted by client for you to simplify the summarization process for each client. I want you to provide me with a 1-2 paragraph summary for each client based on the task names and notes (if available). Identify the client or project name first, then provide the summary in the following format: "Client Name: Summary of all tasks and task notes completed for that client". Refer to me in your answer in the second person - 'you did x, y, z' not 'I did x, y, z'. Separate each of these client summaries with two new lines to make it easier to read. Just give me the summaries - no need to include a title for your answers.`;

    // Request completion from OpenAI
    const response = await openai.chat.completions.create({
      messages: [{ role: "system", content: prompt }],
      model: "gpt-3.5-turbo",
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error generating summary:", error);
    throw error;
  }
}

module.exports = { generateSummary };
