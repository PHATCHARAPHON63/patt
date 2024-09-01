const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const connectEmail = require("../config/email");

const resetTokens = {};
const veterinarian = require("../models/veterinarian");

const URL = process.env.STAFF_API_URL;

exports.send_approval_email = async (req, res) => {
  const { 
    email, 
    username, 
    password,
    applicationDate
  } = req.body;
  console.log(req.body);

  try {
    const mailOptions = {
      from: "allsolution@tlogical.com",
      to: email, 
      subject: "Your Thailand Equestrian Federation Membership Approved",
      text: `
      Dear Dr. ${username},

      We are pleased to inform you that your membership application with the Thailand Equestrian Federation has been successfully approved. Thank you for choosing to join us!

      Your membership details are as follows:

      Username: ${username}
      Member number: VIT_0001
      Password: TEF12345
      Application date: ${applicationDate}

      Next steps:
      1. Login: Please use your username and password to log in at [Login link] to get started with your member account.
      2. Update personal information: Once logged in, please update your personal information and set a new password for security.
      3. Explore Benefits: Review the benefits and information that members can access.

      Contact information: If you have any questions or encounter any problems, our member services can be contacted at: Email: TEF@tlogical.com Telephone: 0000000000

      Thank you for joining the Thailand Equestrian Federation. We look forward to seeing you at various club events soon!
      `,
      };


    // Send email and wait for result
    const info = await connectEmail.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    return res.status(200).json({ message: "Approval email sent successfully", info: info.response });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ message: "Failed to send email", error: error.toString() });
  }
};