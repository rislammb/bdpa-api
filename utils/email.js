const nodemailer = require('nodemailer');

const sendEmail = async (message) => {
  const cofigTransport = {
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  };
  const transporter = nodemailer.createTransport(cofigTransport);

  transporter.sendMail(message);
};

const getMessage = (user, clientUrl) => ({
  subject: 'Verify your Email on BDPA website',
  html: `
    <div
      style="
        max-width: 270px;
        padding: 16px;
        margin: 8px 0px;
        border-radius: 8px;
	color: #3a3a3a;
        border: 1px solid #dadada;
        font-family: Tahoma, Geneva, Verdana, sans-serif;
      "
    >
      <h3>Verify your Email</h3>
      <hr style="border: none; border-bottom: 1px solid #dadada" />
      <p>
        You send a request on BDPA website to create your account. For verify
        your account please follow this link
        <a
          style="text-decoration: none; color: #007595"
          href="${clientUrl}${user?.emailToken}"
          >verify email</a
        >
      </p>

      <p
        style="margin: 24px 0px; width: 64px; border-bottom: 1px solid #dadada"
      ></p>

      <div>
        For more details mail to
        <a
          style="text-decoration: none; color: #007595"
          href="mailto:rislammb@gmail.com"
          >rislammb@gmail.com</a
        >
      </div>
    </div>
`,
});

module.exports = { sendEmail, getMessage };
