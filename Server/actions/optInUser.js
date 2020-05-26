const emailService = require("../services/email");
const validationService = require("../services/validation");

/* Parameters
 *   Send email controller.
 */

module.exports = async function optInUser(req, res) {
  const submittedFormValues = req.body;
  const optInForm = await validationService.validateOptInForm(
    submittedFormValues
  );

  //if submittedFormValues is not valid throw error back
  if (optInForm.success !== true) {
    return res.json(optInForm);
  }

  // Send confirmation email to user.
  try {
    await emailService.sendEmail(
      submittedFormValues.email,
      "contact@jyze.net",
      "Thank you for signing-up!",
      `<h1>${submittedFormValues.name}, we really appreciate you signing up for our beta release!</h1><div><h3>We'll let you know when we launch in ${submittedFormValues.city}!</h3></div><div style="color:c9c9c9;">Copyright Jyze.net | Find Halal Food Near You 2019. All Rights Reserved. Ottawa, Canada.</div>`
    );

    // @TODO
    // Add use to sendGrid contact list
  } catch (e) {
    console.error(e);
    return res.json({
      success: false,
    });
  }

  // Return response.
  return res.json(optInForm);
};
