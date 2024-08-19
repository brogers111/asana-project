const nodemailer = require("nodemailer");
const config = require("../config/config");
const { convertSeconds } = require("../utils/utils");

// Function to send email using Nodemailer
async function sendEmail(everhourData, sortedTaskTotals, summary) {
  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: config.gmailUsername,
      pass: config.gmailPassword,
    },
    secure: true,
  });

  // Prepare email content
  const mailData = {
    from: {
      name: "Your Weekly Asana Summary",
      address: config.gmailUsername,
    },
    to: "ADD_RECIPIENT_EMAIL_HERE",
    subject: "Your Weekly Asana Summary has arrived...",
    html: `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
            }
  
            h2 {
              color: #fc636b;
            }
          </style>
        </head>
        <body>
          <h2>Tasks Completed Per Client:</h2>
          <pre>${sortedTaskTotals}</pre>
          <h2>Longest Task Length:</h2>
          ${everhourData
            .map(
              (item) =>
                `<pre>${convertSeconds(item.taskTime)} to Complete Task - ${
                  item.taskName
                }</pre>`
            )
            .join("")}
          <h2>Your Weekly Client Summaries:</h2>
          <pre>${summary}</pre>
        </body>
      </html>
    `,
  };

  try {
    const info = await transporter.sendMail(mailData);
    console.log("Email sent:", info);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}

module.exports = { sendEmail };
