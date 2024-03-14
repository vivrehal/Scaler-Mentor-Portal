import nodemailer from 'nodemailer';

const sendEmail=async({ from, sendername, to, subject, html  })=>{
        const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    host: process.env.SMTP_HOST,
                    port: process.env.SMTP_PORT, 
                    auth: {
                        user: process.env.EMAIL,
                        pass: process.env.EMAIL_PASSWORD 
                    }
                });
            
                try {
                    const info = await transporter.sendMail({
                        from: `mentor <${from}>`,
                        sendername: sendername,
                        to: to,
                        subject: subject,
                        html: html,
                    }); 
                } catch (error) {
                    return false;
                }

        // console.log(info);
        return true;
    }

export default sendEmail;
