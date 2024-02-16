import nodemailer from "nodemailer";

interface EmailArgType {
    to: string;
    html: string;
    subject: string;
}

export async function sendEmail({ to, html, subject }: EmailArgType) {
    // const testAccount = await nodemailer.createTestAccount();
    // console.log("testAccount :: ", testAccount);
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: "idcbbsiqbanx6jfg@ethereal.email",
            pass: "SssHBNhzeD8DaVqXAK",
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: "sainijaproz@gmail.com>",
        to: to,
        subject,
        html,
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
