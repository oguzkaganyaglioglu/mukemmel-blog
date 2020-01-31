const express = require("express");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../../models/User");
const nodemailer = require("nodemailer");
require("dotenv").config();

const route = () => {
  const router = new express.Router();

  router.route(`/login`).post((req, res) => {
    const { email, password } = req.body;
    const passwordHashed = crypto
      .createHmac("sha512", process.env.PASS_SECRET)
      .update(password)
      .digest("hex");

    User.findOne({ email: email }).then(user => {
      if (!user) {
        res.send({
          status: false,
          message: "kullanıcı bulunamadı"
        });
      } else {
        if (user.password === passwordHashed) {
          const token = jwt.sign(
            { userId: user._id, admin: user.admin },
            process.env.JWT_SECRET
          );

          // req.session.user.lastName = user.lastName;
          // req.session.user.firstName = user.firstName;

          if (user.banned) {
            res.send({
              status: "banned"
            });
          } else {
            req.session.userToken = token;
            req.session.useremail = email;
            if (user.deleted) {
              res.send({
                status: "deleted",
                token: token
              });
            } else {
              res.send({
                status: true,
                token: token
              });
            }
          }
        } else {
          res.send({
            status: false,
            message: "kullanıcı bulunamadı"
          });
        }
      }
    });
  });

  router.route(`/register`).post((req, res) => {
    const { email, password, firstName, lastName, repassword } = req.body;
    const passwordHashed = crypto
      .createHmac("sha512", process.env.PASS_SECRET)
      .update(password)
      .digest("hex");
    const newUser = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: passwordHashed,
      admin: false,
      dateCreated: new Date(),
      dateModified: new Date()
    });
    newUser.save().then(
      data => {
        res.send({ status: true, user: data });
      },
      err => {
        res.send({ status: false, error: err });
      }
    );
  });

  router.route(`/forgot-pass`).post((req, res) => {
    const { email } = req.body;
    User.findOne({ email: email }).then(user => {
      if (!user) {
        res.send({ status: false, reason: "falseuser" });
      } else {
        const resettoken = jwt.sign(
          { userId: user._id, hashed: user.password },
          process.env.JWT_SECRET
        );

        const htmlEmail = `
        <!DOCTYPE html>
        <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
        
        <head>
            <title> </title>
            <!--[if !mso]><!-- -->
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <!--<![endif]-->
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style type="text/css">
                #outlook a {
                    padding: 0;
                }
                
                .ReadMsgBody {
                    width: 100%;
                }
                
                .ExternalClass {
                    width: 100%;
                }
                
                .ExternalClass * {
                    line-height: 100%;
                }
                
                body {
                    margin: 0;
                    padding: 0;
                    -webkit-text-size-adjust: 100%;
                    -ms-text-size-adjust: 100%;
                }
                
                table,
                td {
                    border-collapse: collapse;
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                }
                
                img {
                    border: 0;
                    height: auto;
                    line-height: 100%;
                    outline: none;
                    text-decoration: none;
                    -ms-interpolation-mode: bicubic;
                }
                
                p {
                    display: block;
                    margin: 13px 0;
                }
            </style>
            <!--[if !mso]><!-->
            <style type="text/css">
                @media only screen and (max-width:480px) {
                    @-ms-viewport {
                        width: 320px;
                    }
                    @viewport {
                        width: 320px;
                    }
                }
            </style>
            <!--<![endif]-->
            <!--[if mso]>        <xml>        <o:OfficeDocumentSettings>          <o:AllowPNG/>          <o:PixelsPerInch>96</o:PixelsPerInch>        </o:OfficeDocumentSettings>        </xml>        <![endif]-->
            <!--[if lte mso 11]>        <style type="text/css">          .outlook-group-fix { width:100% !important; }        </style>        <![endif]-->
            <!--[if !mso]><!-->
            <link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css">
            <link href="https://fonts.googleapis.com/css?family=Cabin:400,700" rel="stylesheet" type="text/css">
            <style type="text/css">
                @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);
                @import url(https://fonts.googleapis.com/css?family=Cabin:400,700);
            </style>
            <!--<![endif]-->
            <style type="text/css">
                @media only screen and (min-width:480px) {
                    .mj-column-per-100 {
                        width: 100% !important;
                        max-width: 100%;
                    }
                }
            </style>
            <style type="text/css">
                @media only screen and (max-width:480px) {
                    table.full-width-mobile {
                        width: 100% !important;
                    }
                    td.full-width-mobile {
                        width: auto !important;
                    }
                }
            </style>
            <style type="text/css">
                .hide_on_mobile {
                    display: none !important;
                }
                
                @media only screen and (min-width: 480px) {
                    .hide_on_mobile {
                        display: block !important;
                    }
                }
                
                [owa] .mj-column-per-100 {
                    width: 100%!important;
                }
                
                [owa] .mj-column-per-50 {
                    width: 50%!important;
                }
                
                [owa] .mj-column-per-33 {
                    width: 33.333333333333336%!important;
                }
                
                p {
                    margin: 0px;
                }
            </style>
        </head>
        
        <body style="background-color:#FFFFFF;">
            <div style="display:none;font-size:1px;color:#ffffff;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;"> &#x15E;ifre S&#x131;f&#x131;rlama Talebinizi Ald&#x131;k </div>
            <div style="background-color:#FFFFFF;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#000000;background-color:#000000;width:100%;">
                    <tbody>
                        <tr>
                            <td>
                                <!--[if mso | IE]>      <table         align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"      >        <tr>          <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">      <![endif]-->
                                <div style="Margin:0px auto;max-width:600px;">
                                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                                        <tbody>
                                            <tr>
                                                <td style="direction:ltr;font-size:0px;padding:9px 0px 9px 0px;text-align:center;vertical-align:top;">
                                                    <!--[if mso | IE]>                  <table role="presentation" border="0" cellpadding="0" cellspacing="0">                        <tr>                  <td               class="" style="vertical-align:top;width:600px;"            >          <![endif]-->
                                                    <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                                            <tbody>
                                                                <tr>
                                                                    <td align="center" style="font-size:0px;padding:0px 0px 0px 0px;word-break:break-word;">
                                                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td style="width:600px;"> <img height="auto" src="https://i.ibb.co/0fCyBgg/1580244362.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="600"> </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td align="left" style="font-size:0px;padding:15px 15px 15px 15px;word-break:break-word;">
                                                                        <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:11px;line-height:1.5;text-align:left;color:#6c757d;">
                                                                            <table role="presentation" style="-webkit-font-smoothing:antialiased; font-style:normal; font-variant-ligatures:normal; font-variant-caps:normal; font-variant-numeric:inherit; font-variant-east-asian:inherit; font-weight:400; font-stretch:inherit; font-size:13px; line-height:inherit; font-family:" segoe ui web (east european) ", "segoe ui ", -apple-system, blinkmacsystemfont, roboto, "helvetica neue ", sans-serif; border-collapse:collapse; color:#201f1e; letter-spacing:normal; orphans:2; text-align:left; text-transform:none; white-space:normal; widows:2; word-spacing:0px; -webkit-text-stroke-width:0px; background-color:#000000; text-decoration-style:initial; text-decoration-color:initial; vertical-align:top; border:undefined" width="100%">
                                                                                <tbody style="-webkit-font-smoothing:antialiased">
                                                                                    <tr style="-webkit-font-smoothing:antialiased">
                                                                                        <td align="center" style="border-collapse:collapse">
                                                                                            <div style="border:0px; margin:0px; padding:18px; text-align:center">
                                                                                                <p style="margin:0px"><span style="font-size:0px"><span style="-webkit-font-smoothing:antialiased"><span style="font-style:inherit"><span style="font-variant:inherit"><span style="font-weight:inherit"><span style="font-stretch:inherit"><span style="line-height:1.5"><span style="font-family:Ubuntu, Helvetica, Arial, sans-serif"><span style="vertical-align:baseline"><span style="color:#fff8f8"><span style="white-space:normal !important"><span style="word-break:break-word"><span style="background-color:#000000"><span style="-webkit-font-smoothing:antialiased"><span style="display:block"><span style="border:0px; font-size:26px; margin:0px; padding:0px"><span style="-webkit-font-smoothing:antialiased"><span style="font-style:inherit"><span style="font-variant:inherit"><span style="font-weight:inherit"><span style="font-stretch:inherit"><span style="line-height:inherit"><span style="font-family:inherit"><span style="vertical-align:baseline"><span style="color:inherit"><font color="#bdc3c7"><font style="-webkit-font-smoothing: antialiased;">O&#x11F;uz Ka&#x11F;an Ya&#x11F;l&#x131;o&#x11F;lu</font></font></span></span>
                                                                                                    </span>
                                                                                                    </span>
                                                                                                    </span>
                                                                                                    </span>
                                                                                                    </span>
                                                                                                    </span>
                                                                                                    </span>
                                                                                                    </span>
                                                                                                    </span>
                                                                                                    </span>
                                                                                                    </span>
                                                                                                    </span>
                                                                                                    </span>
                                                                                                    </span>
                                                                                                    </span>
                                                                                                    </span>
                                                                                                    </span>
                                                                                                    </span>
                                                                                                    </span>
                                                                                                    </span>
                                                                                                    </span>
                                                                                                    </span>
                                                                                                    </span>
                                                                                                </p>
                                                                                            </div>
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td align="center" style="font-size:0px;padding:15px 15px 15px 15px;word-break:break-word;">
                                                                        <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:11px;line-height:1.5;text-align:center;color:#6c757d;">
                                                                            <p style="margin:0px"><span style="font-size:0px"><span style="-webkit-font-smoothing:antialiased"><span style="font-style:inherit"><span style="font-variant:inherit"><span style="font-weight:inherit"><span style="font-stretch:inherit"><span style="line-height:1.5"><span style="font-family:Ubuntu, Helvetica, Arial, sans-serif"><span style="vertical-align:baseline"><span style="color:#6e6e6e"><span style="white-space:normal !important"><span style="word-break:break-word"><span style="background-color:#000000"><span style="-webkit-font-smoothing:antialiased"><span style="display:block"><span style="border:0px; font-size:14px; margin:0px; padding:0px"><span style="-webkit-font-smoothing:antialiased"><span style="font-style:inherit"><span style="font-variant:inherit"><span style="font-weight:inherit"><span style="font-stretch:inherit"><span style="line-height:inherit"><span style="font-family:inherit"><span style="vertical-align:baseline"><span style="color:inherit">Merhaba &#x15F;ifre s&#x131;f&#x131;rlama talebini ald&#x131;k. A&#x15F;a&#x11F;&#x131;daki linke t&#x131;klayarak &#x15F;ifreni s&#x131;f&#x131;rlayabilirsin.</span></span>
                                                                                </span>
                                                                                </span>
                                                                                </span>
                                                                                </span>
                                                                                </span>
                                                                                </span>
                                                                                </span>
                                                                                </span>
                                                                                </span>
                                                                                </span>
                                                                                </span>
                                                                                </span>
                                                                                </span>
                                                                                </span>
                                                                                </span>
                                                                                </span>
                                                                                </span>
                                                                                </span>
                                                                                </span>
                                                                                </span>
                                                                                </span>
                                                                                </span>
                                                                                </span>
                                                                            </p>
                                                                            <p style="margin:0px"><span style="font-size:0px"><span style="-webkit-font-smoothing:antialiased"><span style="font-style:inherit"><span style="font-variant:inherit"><span style="font-weight:inherit"><span style="font-stretch:inherit"><span style="line-height:1.5"><span style="font-family:Ubuntu, Helvetica, Arial, sans-serif"><span style="vertical-align:baseline"><span style="color:#6e6e6e"><span style="white-space:normal !important"><span style="word-break:break-word"><span style="background-color:#000000"><span style="-webkit-font-smoothing:antialiased"><span style="display:block"><span style="border:0px; font-size:14px; margin:0px; padding:0px"><span style="-webkit-font-smoothing:antialiased"><span style="font-style:inherit"><span style="font-variant:inherit"><span style="font-weight:inherit"><span style="font-stretch:inherit"><span style="line-height:inherit"><span style="font-family:inherit"><span style="vertical-align:baseline"><span style="color:inherit">E&#x11F;er b&#xF6;yle bir istekte bulunmad&#x131;ysan endi&#x15F;elenmene gerek yok bu maili silebilirsin</span></span>
                                                                                </span>
                                                                                </span>
                                                                                </span>
                                                                                </span>
                                                                                </span>
                                                                                </span>
                                                                                </span>
                                                                                </span>
                                                                                </span>
                                                                                </span>
                                                                                </span>
                                                                                </span>
                                                                                </span>
                                                                                </span>
                                                                                </span>
                                                                                </span>
                                                                                </span>
                                                                                </span>
                                                                                </span>
                                                                                </span>
                                                                                </span>
                                                                                </span>
                                                                                </span>
                                                                            </p>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td align="center" vertical-align="middle" style="font-size:0px;padding:28px 28px 28px 28px;word-break:break-word;">
                                                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;width:auto;line-height:100%;">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align="center" bgcolor="#e85034" role="presentation" style="border:0px solid #000;border-radius:24px;cursor:auto;mso-padding-alt:12px 34px 12px 34px;background:#e85034;" valign="middle"> <a href=\`${process.env.DOMAIN}/reset-password?token=${resettoken}\` style="display:inline-block;background:#e85034;color:#ffffff;font-family:Ubuntu, Helvetica, Arial, sans-serif, Helvetica, Arial, sans-serif;font-size:17px;font-weight:normal;line-height:100%;Margin:0;text-decoration:none;text-transform:none;padding:12px 34px 12px 34px;mso-padding-alt:0px;border-radius:24px;" target="_blank">              &#x15E;ifemi S&#x131;f&#x131;rla            </a> </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td align="center" style="font-size:0px;padding:15px 15px 15px 15px;word-break:break-word;">
                                                                        <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:11px;line-height:1.5;text-align:center;color:#6c757d;">
                                                                            <p>E&#x11F;er butonu g&#xF6;remiyorsan&#x131;z alttaki linki kopyalay&#x131;p taray&#x131;c&#x131;n&#x131;zayap&#x131;&#x15F;t&#x131;rabilirsiniz</p>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td align="center" style="font-size:0px;padding:15px 15px 15px 15px;word-break:break-word;">
                                                                        <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:11px;line-height:1.5;text-align:center;color:#6c757d;">
                                                                            <a href=\`${process.env.DOMAIN}/reset-password?token=${resettoken}\`>${process.env.DOMAIN}/reset-password?token=${resettoken}</a>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td style="font-size:0px;word-break:break-word;">
                                                                        <!--[if mso | IE]>            <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td height="83" style="vertical-align:top;height:83px;">          <![endif]-->
                                                                        <div style="height:83px;"> &#xA0; </div>
                                                                        <!--[if mso | IE]>            </td></tr></table>          <![endif]-->
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td align="center" style="font-size:0px;padding:15px 15px 15px 15px;word-break:break-word;">
                                                                        <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:11px;line-height:1.5;text-align:center;color:#000000;">
                                                                            <p><span style="color: rgb(108, 117, 125); font-family: Quicksand, sans-serif; font-size: 16px; text-align: center; background-color: rgb(5, 0, 20);">Copyright &#xA9; O&#x11F;uz Ka&#x11F;an YA&#x11E;LIO&#x11E;LU 2020</span></p>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    <!--[if mso | IE]>            </td>                  </tr>                        </table>                <![endif]-->
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <!--[if mso | IE]>          </td>        </tr>      </table>      <![endif]-->
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </body>
        
        </html>
      `;

        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: process.env.SMTP_PORT,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
          }
        });

        const mailOptions = {
          from: process.env.SMTP_FROM,
          to: email,
          subject: "Şifre Sıfırlama",
          html: htmlEmail
        };

        transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
            res.send({ status: false, reason: "err" });
          }
          res.send({ status: true });
        });
      }
    });
  });

  router.route(`/send-message`).post((req, res) => {
    const htmlEmail = `
        <!DOCTYPE html>
        <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
        
        <head>
            <title> </title>
            <!--[if !mso]><!-- -->
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <!--<![endif]-->
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style type="text/css">
                #outlook a {
                    padding: 0;
                }
                
                .ReadMsgBody {
                    width: 100%;
                }
                
                .ExternalClass {
                    width: 100%;
                }
                
                .ExternalClass * {
                    line-height: 100%;
                }
                
                body {
                    margin: 0;
                    padding: 0;
                    -webkit-text-size-adjust: 100%;
                    -ms-text-size-adjust: 100%;
                }
                
                table,
                td {
                    border-collapse: collapse;
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                }
                
                img {
                    border: 0;
                    height: auto;
                    line-height: 100%;
                    outline: none;
                    text-decoration: none;
                    -ms-interpolation-mode: bicubic;
                }
                
                p {
                    display: block;
                    margin: 13px 0;
                }
            </style>
            <!--[if !mso]><!-->
            <style type="text/css">
                @media only screen and (max-width:480px) {
                    @-ms-viewport {
                        width: 320px;
                    }
                    @viewport {
                        width: 320px;
                    }
                }
            </style>
            <!--<![endif]-->
            <!--[if mso]>        <xml>        <o:OfficeDocumentSettings>          <o:AllowPNG/>          <o:PixelsPerInch>96</o:PixelsPerInch>        </o:OfficeDocumentSettings>        </xml>        <![endif]-->
            <!--[if lte mso 11]>        <style type="text/css">          .outlook-group-fix { width:100% !important; }        </style>        <![endif]-->
            <!--[if !mso]><!-->
            <link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css">
            <link href="https://fonts.googleapis.com/css?family=Cabin:400,700" rel="stylesheet" type="text/css">
            <style type="text/css">
                @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);
                @import url(https://fonts.googleapis.com/css?family=Cabin:400,700);
            </style>
            <!--<![endif]-->
            <style type="text/css">
                @media only screen and (min-width:480px) {
                    .mj-column-per-100 {
                        width: 100% !important;
                        max-width: 100%;
                    }
                }
            </style>
            <style type="text/css">
                @media only screen and (max-width:480px) {
                    table.full-width-mobile {
                        width: 100% !important;
                    }
                    td.full-width-mobile {
                        width: auto !important;
                    }
                }
            </style>
            <style type="text/css">
                .hide_on_mobile {
                    display: none !important;
                }
                
                @media only screen and (min-width: 480px) {
                    .hide_on_mobile {
                        display: block !important;
                    }
                }
                
                [owa] .mj-column-per-100 {
                    width: 100%!important;
                }
                
                [owa] .mj-column-per-50 {
                    width: 50%!important;
                }
                
                [owa] .mj-column-per-33 {
                    width: 33.333333333333336%!important;
                }
                
                p {
                    margin: 0px;
                }
            </style>
        </head>
        
        <body style="background-color:#FFFFFF;">
            <div style="background-color:#FFFFFF;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#000000;background-color:#000000;width:100%;">
                    <tbody>
                        <tr>
                            <td>
                                <!--[if mso | IE]>      <table         align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"      >        <tr>          <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">      <![endif]-->
                                <div style="Margin:0px auto;max-width:600px;">
                                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                                        <tbody>
                                            <tr>
                                                <td style="direction:ltr;font-size:0px;padding:9px 0px 9px 0px;text-align:center;vertical-align:top;">
                                                    <!--[if mso | IE]>                  <table role="presentation" border="0" cellpadding="0" cellspacing="0">                        <tr>                  <td               class="" style="vertical-align:top;width:600px;"            >          <![endif]-->
                                                    <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                                            <tbody>
                                                                <tr>
                                                                    <td align="center" style="font-size:0px;padding:0px 0px 0px 0px;word-break:break-word;">
                                                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td style="width:600px;"> <img height="auto" src="https://i.hizliresim.com/XbnqBk.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="600"> </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td align="center" style="font-size:0px;padding:15px 15px 15px 15px;word-break:break-word;">
                                                                        <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:11px;line-height:1.5;text-align:center;color:#000000;">
                                                                            <p><span style="color:#dddddd;"><span style="font-size:18px;">${req.body.name}</span> <span style="font-size:14px;">size mesaj g&#xF6;nderdi</span></span>
                                                                            </p>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td style="font-size:0px;padding:10px 25px;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;word-break:break-word;">
                                                                        <p style="border-top:solid 1px #727272;font-size:1;margin:0px auto;width:100%;"> </p>
                                                                        <!--[if mso | IE]>        <table           align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 1px #727272;font-size:1;margin:0px auto;width:580px;" role="presentation" width="580px"        >          <tr>            <td style="height:0;line-height:0;">              &nbsp;            </td>          </tr>        </table>      <![endif]-->
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td align="left" style="font-size:0px;padding:15px 15px 15px 15px;word-break:break-word;">
                                                                        <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:11px;line-height:1.5;text-align:left;color:#000000;">
                                                                            <p><span style="color:#dddddd;"><span style="font-size:14px;">Mail adresi: ${req.body.mail}</span></span>
                                                                            </p>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td style="font-size:0px;padding:10px 25px;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;word-break:break-word;">
                                                                        <p style="border-top:solid 1px #727272;font-size:1;margin:0px auto;width:100%;"> </p>
                                                                        <!--[if mso | IE]>        <table           align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 1px #727272;font-size:1;margin:0px auto;width:580px;" role="presentation" width="580px"        >          <tr>            <td style="height:0;line-height:0;">              &nbsp;            </td>          </tr>        </table>      <![endif]-->
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td align="left" style="font-size:0px;padding:15px 15px 15px 15px;word-break:break-word;">
                                                                        <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:11px;line-height:1.5;text-align:left;color:#000000;">
                                                                            <p><span style="font-size:14px;"><span style="color:#dddddd;">Mesaj&#x131;:</span></span>
                                                                            </p>
                                                                            <p></p>
                                                                            <p><span style="font-size:14px;"><span style="color:#dddddd;">${req.body.message}</span></span>
                                                                            </p>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td style="font-size:0px;padding:10px 25px;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;word-break:break-word;">
                                                                        <p style="border-top:solid 1px #727272;font-size:1;margin:0px auto;width:100%;"> </p>
                                                                        <!--[if mso | IE]>        <table           align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 1px #727272;font-size:1;margin:0px auto;width:580px;" role="presentation" width="580px"        >          <tr>            <td style="height:0;line-height:0;">              &nbsp;            </td>          </tr>        </table>      <![endif]-->
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td style="font-size:0px;word-break:break-word;">
                                                                        <!--[if mso | IE]>            <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td height="50" style="vertical-align:top;height:50px;">          <![endif]-->
                                                                        <div style="height:50px;"> &#xA0; </div>
                                                                        <!--[if mso | IE]>            </td></tr></table>          <![endif]-->
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td align="center" style="font-size:0px;padding:15px 15px 15px 15px;word-break:break-word;">
                                                                        <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:11px;line-height:1.5;text-align:center;color:#000000;">
                                                                            <p><span style="color:#95a5a6;"><span style="font-size:12px;">Copyright &#xA9; O&#x11F;uz Ka&#x11F;an YA&#x11E;LIO&#x11E;LU 2020</span></span>
                                                                            </p>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    <!--[if mso | IE]>            </td>                  </tr>                        </table>                <![endif]-->
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <!--[if mso | IE]>          </td>        </tr>      </table>      <![endif]-->
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </body>
        
        </html>
      `;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    const mailOptions = {
      from: process.env.SMTP_FROM,
      to: process.env.MESSAGE_TO,
      subject: "Mesajınız var",
      html: htmlEmail
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        res.send({ status: false, reason: "err" });
      }
      res.send({ status: true, info: info });
    });
  });


  router.route(`/reset-pass`).post((req, res) => {
    jwt.verify(req.body.userToken, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        //res.status(403).json(isEmpty(err) ? { message: 'Wrong token!' } : err);
        res.send({ status: false, message: "invalid token" });
      } else {
        //res.send(decoded.userId)
        User.findById(decoded.userId).then(user => {
          if (!user) {
            res.send({ status: false, message: "user couldn't found" });
          } else {
            const passwordHashed = crypto
              .createHmac("sha512", process.env.PASS_SECRET)
              .update(req.body.newPass)
              .digest("hex");
            if (decoded.hashed === user.password) {
              User.findByIdAndUpdate(
                user._id,
                { password: passwordHashed },
                (err, comment) => {
                  if (err) {
                    res.send({ status: false });
                  } else {
                    res.send({ status: true });
                  }
                }
              );
            } else {
              res.send({ status: false, message: "invalid link" });
            }
          }
        });
      }
    });
  });

  return router;
};

module.exports = {
  route,
  routePrefix: `/${process.env.API_VERSION}/auth`
};
