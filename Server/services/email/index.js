const sgMail = require("@sendgrid/mail");
const config = require("./../../config");
sgMail.setApiKey(config.sendgrid);

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
