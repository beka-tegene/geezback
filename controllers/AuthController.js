const bcrypt = require("bcryptjs");
const User = require('../models/User')

const jwt = require("jsonwebtoken");


const JWT_SECRET = "nhjndshnbhsiduy78q3ye3yhrewhriewopfew[fpe-fpe-pf[df[s;f[ds;f[ds;f[ds;f[ds;,fld,s.mdnshbgvcarfdtwygyqgygdhsabjbcnvgawqrr6t8siahjdvdgvds()!@#$%^&*";

exports.signUp = async (req, res) => {
    const { data } = req.body;
    const { email, password } = data;

    const role = "user";
    // const Creator =email;
  
    const encreptedPassword = await bcrypt.hash(password, 10);
  
    console.log("hello");
  
    try {
        
      await User.create({
        email,
        password: encreptedPassword,
        role,
      });
    
      console.log("success");
    
      res.send({ status: 200 });
    } catch (error) {
      if (error.code === 11000 || error.code === 16460) {
        // Duplicate key error or unique key constraint violation
        res.send({ status: "error", error: "Duplicate data" });
        console.log("Duplicate data");
      } else if (error.code === 17140) {
        // Missing expected field error
        res.send({ status: "error", error: "Missing expected field" });
        console.log("Missing expected field");
      } else if (error.code === 20250) {
        // Invalid document or field name error
        res.send({ status: "error", error: "Invalid document or field name" });
        console.log("Invalid document or field name");
      } else if (error.code === 21328) {
        // Maximum index key length exceeded error
        res.send({ status: "error", error: "Maximum index key length exceeded" });
        console.log("Maximum index key length exceeded");
      } else {
        // Generic error handling
        res.send({ status: "error", error: error.message });
        console.log(error.message);
      }
    }
    
    
  }




exports.loginUser = async (req, res) => {
    try {

      const { data} = req.body;
      console.log(req.body);
      const { email, password } = data;

      console.log("loged in ");
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.json({ error: "User Not found" });
      }
  
      if (await bcrypt.compare(password, user.password)) {

        const token = jwt.sign(
          {
            email: user.email,
            role: user.role,
            data:user
          },
          process.env.JWT_SECRET,
          { expiresIn: "9h" }
        );
  
  
        return res.status(200).json({ token: token });
      } else {
        throw new Error("Invalid Password");
      }
    } catch (error) {
      console.error(error);
      return res.json({ status: "error", error: error.message });
    }
  };


  exports.forgotPassword = async (req, res) => {
    var email = req.body.email;
    console.log(email);
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User Not found");
      return res.json({ error: "User Not found" });
    }
  
    console.log("forget password");
    var nodemailer = require("nodemailer");
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "refugee823@gmail.com",
        pass: "kulwwmpybuhcvfeq",
      },
    });
    console.log("hello", email);
    if (email) {
      console.log(email);
      // const forgotPasswordToken = jwt.sign({},
      //   { userEmail: req.query.email },
      //   "Wintu-Yoni@2022",
      //   {
      //     expiresIn: "4h",
      //   }
      // );
  
      var forgotPasswordLink = "http://localhost:3000/reset-password/?token=";
      var mailOptions = {
        from: "Askuala@gmail.com",
        to: email,
        subject: "Reset Password",
        html:
          '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">' +
          '<html xmlns="http://www.w3.org/1999/xhtml"><head>' +
          '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />' +
          "<title>Forgot Password</title>" +
          "<style> body {background-color: #FFFFFF; padding: 0; margin: 0;}</style></head>" +
          '<body style="background-color: #FFFFFF; padding: 0; margin: 0;">' +
          '<table style="max-width: 650px; background-color: #2F6296; color: #ffffff;" id="bodyTable">' +
          '<tr><td align="center" valign="top">' +
          '<table id="emailContainer" style="font-family: Arial; color: #FFFFFF; text-align: center;">' +
          '<tr><td align="left" valign="top" colspan="2" style="border-bottom: 1px solid #CCCCCC; padding-  bottom: 10px;">' +
          "</td></tr><tr>" +
          '<td align="left" valign="top" colspan="2" style="border-bottom: 1px solid #FFFFFF; padding: 20px 0 10px 0;">' +
          '<span style="font-size: 24px; font-weight: normal;color: #FFFFFF">FORGOT PASSWORD</span></td></tr><tr>' +
          '<td align="left" valign="top" colspan="2" style="padding-top: 10px;">' +
          '<span style="font-size: 18px; line-height: 1.5; color: #333333;">' +
          " We have sent you this email in response to your request to reset your password on <a href='http://localhost:3000'>Askula Management System</a><br/><br/>" +
          'To reset your password for, please follow the link below: <button style="font:inherit; cursor: pointer; border: #272727 2px solid; background-color: transparent; border-radius: 5px;"><a href="' +
          forgotPasswordLink +
          '"style="color: #272727; text-decoration: none;">Reset Password</a></button><br/><br/>' +
          "We recommend that you keep your password secure and not share it with anyone.If you didn't request to this message, simply ignore this message.<br/><br/>" +
          "Ethiopian Askula Management System </span> </td> </tr> </table> </td> </tr> </table> </body></html>",
      };
  
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          return res.json({
            ErrorMessage: error,
          });
        } else {
          console.log("succcesssss");
          return res.json({
            SuccessMessage: "email successfully sent!",
          });
        }
      });
    } else {
      return res.json({
        ErrorMessage: "Email can't be none!",
      });
    }
  };
  exports.ResetPassword = async (req, res) => {
    try {
      const { newPassword, email } = req.body;
      console.log(newPassword, email);
      const encreptedPassword = await bcrypt.hash(newPassword, 10);
  console.log(encreptedPassword);
      const existingUser = await User.findOne({ email });
if (!existingUser) {
  return res.status(404).json({ message: 'User not found' });
}

      // Use the updateOne method with async/await
      const result = await User.updateOne(
        { email: email },
        { $set: { password: encreptedPassword } }
      );
        console.log(result);
      // Check the result and handle it accordingly
      if (result.modifiedCount === 1) {
        return res.json({ message: 'Password reset successful' });
      } else {
        return res.status(404).json({ message: 'User not found or password not modified' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  