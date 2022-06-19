import nodemailer from 'nodemailer';

const sendEmail = async(message, res) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: '***',
          pass: '***',
        },
      });

      let info = await transporter.sendMail({
        from: `"온라인 명륜당" <${'***'}>`,
        to: message.to,
        subject: 'Magic Login Test',
        text: message.body,
      });
    
      console.log('Message sent: %s', info.messageId);
    
      res.status(200).json({
        status: 'Success',
        code: 200,
        message: 'Sent Auth Email',
      });
};

export default sendEmail;