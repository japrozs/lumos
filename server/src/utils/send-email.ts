import nodemailer from "nodemailer";

export async function sendEmail(to: string, html: string) {
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
        from: '"Fred Foo 👻" <foo@example.com>',
        to: to,
        subject: "Change password or verify Account",
        html,
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
