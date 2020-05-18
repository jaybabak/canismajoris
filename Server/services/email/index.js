const sgMail = require("@sendgrid/mail");
const sendGridAPIKey =
  "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";
sgMail.setApiKey(sendGridAPIKey);

/* Parameters
 *   Send en email somewhere.
 */
async function sendEmail(to, from, subject, html) {
  // Define initial variables.
  const msg = {
    to: to,
    from: from,
    subject: subject,
    text: "NULL",
    html: html,
  };

  // Send the email.
  return sgMail.send(msg);
}

module.exports.sendEmail = sendEmail;
