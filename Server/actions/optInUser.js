const emailService = require("../services/email");
const validationService = require("../services/validation");

/* Parameters
 *   Send email controller.
 */

module.exports = async function optInUser(req, res) {
  // Gets all form values.
  const submittedFormValues = req.body;
  // Validate all form options using validation service.
  const optInForm = await validationService.validateOptInForm(
    submittedFormValues
  );

  // If submittedFormValues is not valid throw error back.
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

    await emailService.sendEmail(
      "contact@jyze.net",
      "contact@jyze.net",
      "Jyza - New Beta registration",
      `<h1>${submittedFormValues.name} with the email ${submittedFormValues.email} - signed up beta service notification for launch in ${submittedFormValues.city}!</div>`
    );

    // @TODO
    // Add use to sendGrid contact list
  } catch (e) {
    // If error console error.
    console.error(e);
    // Return response with error.
    return res.json({
      success: false,
      message: e,
    });
  }

  // Return response.
  return res.json(optInForm);
};
