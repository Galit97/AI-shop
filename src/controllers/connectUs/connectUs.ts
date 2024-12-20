import nodemailer from "nodemailer";

export async function connectUs (req:any, res:any){
    try{
        const {fullName, email, message} = req.body;

        // הגדרת המייל
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "slimani0309@gmail.com", 
            pass: "nbrl zfph vfeh empj",
          },
        });
    
        // תוכן המייל
        const mailOptions = {
          from: email,
          to: "yosefib88@gmail.com",
          subject: `AI Shop new message from ${fullName}`,
          text: `Name: ${fullName}\nEmail: ${email}\nMessage: ${message}`,
        };
      
          await transporter.sendMail(mailOptions);
          res.status(200).send("Email sent successfully!");

    }
   catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Failed to send email.");
  }
}

