import nodemailer from "nodemailer";

const sendEmail = (studentEmail: any, studentName: any) => {
  // Create a transporter using your email service provider's SMTP settings
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "cardstudent030@gmail.com",
      pass: "aaiw gbhs wohr ajpt",
    },
  });

  // Email content
  const mailOptions = {
    from: "cardstudent030@gmail.com",
    to: studentEmail,
    subject: "Your Report Card Arrived",
    html: `
          <div style="background-color: #f2f2f2; padding: 20px; text-align: center;">
            <h1 style="color: #0073e6; font-weight: bold;">Greetings from TT University</h1>
            <h3 style="color: #333;">Your Report Card is Here</h3>
            <h1 style="color: #0073e6; font-weight: bold; background-color: #fff; padding: 10px;">check the link {https://bigapp.com/view}</h1>
          </div>
        `,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

export { sendEmail };
