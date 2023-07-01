const nodemailer = require("nodemailer");
const Joi = require("joi");
const Response = require("../utils/response");

const getMail = async (req, res) => {
  const { name, email, phone, about } = req.body;
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string(),
    about: Joi.string(),
  });
  try {
    // e posta ayarlarını yapılandırıyoruz.
    await schema.validateAsync({ name, email, phone, about }); // joi validation
    let transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      secure: false,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
        // user: "68f51a9cf6a1dd",
        // pass: "53a7ab1928710c",
      },
    });
    let mailOptions = {
      from: "Magic Elves <from@example.com>",
      to: `Mailtrap Inbox <${email}>`,
      subject: name,
      text: about,
      html: `
                  <!doctype html>
                  <html>
                    <head>
                      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                    </head>
                    <body style="font-family: sans-serif;">
                      <div style="display: block; margin: auto; max-width: 600px;" class="main">
                        <h1 style="font-size: 18px; font-weight: bold; margin-top: 20px">Congrats for sending test email with Mailtrap!</h1>
                        <img alt="Inspect with Tabs" src="https://assets-examples.mailtrap.io/integration-examples/welcome.png" style="width: 100%;">
                        <h2>${name}</h2>
                        <h3>${phone}</h3>
                        <h4>${email}</h4>
                        <h5>${about}</h5>
                      </div>
                      <!-- Example of invalid for email html/css, will be detected by Mailtrap: -->
                      <style>
                        .main { background-color: white; }
                        a:hover { border-left-width: 1em; min-height: 2em; }
                      </style>
                    </body>
                  </html>
                `,
    };
    let info = await transporter.sendMail(mailOptions);
    console.log("E-posta gönderildi:", info.messageId);
    return new Response(
      info.messageId,
      "E-posta Başarıyla Gönderildi."
    ).success(res);
  } catch (error) {
    if (error instanceof Joi.ValidationError) {
      // error instanceof Joi.ValidationError diyerek hatanın bir joi validation error hatası olup olmadığını kontrol ediyoruz.
      return new Response(error.message, "Doğrulama Hatası").error400(res);
    } else {
      return new Response(error, "E-posta Gönderilemedi.").error500(res);
    }
  }
};

module.exports = { getMail };
