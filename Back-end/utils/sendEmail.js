const nodemailer = require("nodemailer");
const path = require("path");
const Cw_space = require("../models/Cw_space");
const logoPath = path.join(__dirname, "..", "public", "images", "logo.png");

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    },
});

module.exports = {
    sendWelcome: (email, user)=>{
        return new Promise((resolve, reject) => {
            const htmlContent = `
                <html>
                    <head>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                background-color: #f8f8f8;
                            }
                            .container {
                                max-width: 600px;
                                margin: 0 auto;
                                padding: 20px;
                                background-color: #1B262C;
                                border: 1px solid #dddddd;
                                border-radius: 5px;
                                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                            }
                            .heading {
                                text-align: center;
                                color: #BBE1FA;
                                font-size: 36px;
                                margin-bottom: 20px;
                            }
                            .cancel-button {
                                margin-top: 20px;
                                margin-bottom: 30px;
                            }
                            .code-box {
                                display: center;
                                padding: 10px 20px;
                                background-color: #BBE1FA;
                                border: 1px solid #dddddd;
                                border-radius: 5px;
                                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                            }
                            .signature {
                                text-align: center;
                                font-weight: bold;
                                margin-top: 20px;
                                color: #BBE1FA;
                            }
                            p {
                                font-size: 24px;
                                color: #0F4C75
                            }
                            .button {
                                display: block;
                                padding: 10px 20px;
                                background-color: #1B262C;
                                color: #BBE1FA;
                                text-align: center;
                                text-decoration: none;
                                font-size: 24px;
                                border-radius: 5px;
                                cursor: pointer;
                            }
                            .button:hover {
                                background-color: #0F4C75;
                            }
                            a{
                                color: #BBE1FA
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <div class="heading">
                                Welcome to SPACES Platform!
                            </div>
                            <div style="text-align: center;">
                                <img src="cid:logo" alt="Spaces Logo" style="width: 300px; height: auto; ">
                            </div>
                            <div class="code-box">
                                <p>Dear ${user},</p>
                                <p>Thank you for registering at Spaces platform.</p>
                                <p>Log in to your account</p>
                                <p>We wish you all the best in our platform!</</p>
                            </div>
                            <div class="signature">
                                Thanks,<br>
                                Spaces Team
                            </div>
                        </div>
                    </body>
                </html>
                `;
            const mailOptions = {
                from: {
                    name: "Spaces Platform",
                    address: process.env.GMAIL_USER,
                },
                to: email,
                subject: "Welcome to Spaces Platform",
                html: htmlContent,
                attachments: [
                    {
                    filename: "logo.png",
                    path: logoPath,
                    cid: "logo",
                    },
                ],
                };
            transporter.sendMail(mailOptions, (error) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
            });
        });
    },
    sendVerificationCode: (email, code) => {
        return new Promise((resolve, reject) => {
        const htmlContent = `
                <html>
                    <head>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                background-color: #f8f8f8;
                            }
                            .container {
                                max-width: 600px;
                                margin: 0 auto;
                                padding: 20px;
                                background-color: #1B262C;
                                border: 1px solid #dddddd;
                                border-radius: 5px;
                                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                            }
                            .heading {
                                text-align: center;
                                color: #BBE1FA;
                                font-size: 36px;
                                margin-bottom: 20px;
                            }
                            .verification-code {
                                text-align: center;
                                color: #1B262C;
                                font-size: 48px;
                                margin-top: 20px;
                                margin-bottom: 30px;
                            }
                            .code-box {
                                display: center;
                                padding: 10px 20px;
                                background-color: #BBE1FA;
                                border: 1px solid #dddddd;
                                border-radius: 5px;
                                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                            }
                            .signature {
                                text-align: center;
                                font-weight: bold;
                                margin-top: 20px;
                                color: #BBE1FA;
                            }
                            p {
                                font-size: 24px;
                                color: #0F4C75
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <div class="heading">
                                HI, YOU'RE ALMOST THERE!
                            </div>
                            <div style="text-align: center;">
                                <img src="cid:logo" alt="Spaces Logo" style="width: 300px; height: auto; ">
                            </div>
                            <div class="code-box">
                                <p>Complete your registration using the verification code shown below.</p>
                                <p>Your verification code is</p>
                                <div class="verification-code">
                                    ${code}
                                </div>
                            </div>
                            <div class="signature">
                                Thanks,<br>
                                Spaces Team
                            </div>
                            <div style="text-align: center; margin-top: 20px; color: #999999;">
                                [This is an automated response, do not reply]
                            </div>
                        </div>
                    </body>
                </html>
                `;
        const mailOptions = {
            from: {
                name: "Spaces Platform",
                address: process.env.GMAIL_USER,
            },
            to: email,
            subject: "Verification Code",
            html: htmlContent,
            attachments: [
                {
                filename: "logo.png",
                path: logoPath,
                cid: "logo",
                },
            ],
            };
        transporter.sendMail(mailOptions, (error) => {
        if (error) {
            reject(error);
        } else {
            resolve();
        }
        });
    });
    },
    sendResetLink: (email, token) => {
        return new Promise((resolve, reject) => {
        const resetLink = `https://graduation-project-cw-spaces.onrender.com/ResetPassword?token=${token}`;
        const htmlContent = `
            <html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #f8f8f8;
                        }
                        .container {
                            max-width: 600px;
                            margin: 0 auto;
                            padding: 20px;
                            background-color: #1B262C;
                            border: 1px solid #dddddd;
                            border-radius: 5px;
                            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                        }
                        .heading {
                            text-align: center;
                            color: #BBE1FA;
                            font-size: 36px;
                            margin-bottom: 20px;
                        }
                        .reset-button {
                            margin-top: 20px;
                            margin-bottom: 30px;
                        }
                        .code-box {
                            display: center;
                            padding: 10px 20px;
                            background-color: #BBE1FA;
                            border: 1px solid #dddddd;
                            border-radius: 5px;
                            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                        }
                        .signature {
                            text-align: center;
                            font-weight: bold;
                            margin-top: 20px;
                            color: #BBE1FA;
                        }
                        p {
                            font-size: 24px;
                            color: #0F4C75
                        }
                        .button {
                            display: block;
                            padding: 10px 20px;
                            background-color: #1B262C;
                            color: #BBE1FA;
                            text-align: center;
                            text-decoration: none;
                            font-size: 24px;
                            border-radius: 5px;
                            cursor: pointer;
                        }
                        .button:hover {
                            background-color: #0F4C75;
                        }
                        a{
                            color: #BBE1FA
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="heading">
                            FORGOT YOUR PASSWORD?
                        </div>
                        <div style="text-align: center;">
                            <img src="cid:logo" alt="Spaces Logo" style="width: 300px; height: auto; ">
                        </div>
                        <div class="code-box">
                            <p>If you've lost your password or wish to reset it, use the link below to get started.</p>
                            <div class="reset-button">
                            <a href= ${resetLink} class="button">Reset password</a>
                            </div>
                        </div>
                        <div class="signature">
                            Thanks,<br>
                            Spaces Team
                        </div>
                        <div style="text-align: center; margin-top: 20px; color: #999999;">
                            [If you did not request a password reset, you can safely ignore this email. Only a person with access to your email can reset your account password.]
                        </div>
                    </div>
                </body>
            </html>
            `;
        const mailOptions = {
            from: {
                name: "Spaces Platform",
                address: process.env.GMAIL_USER,
            },
            to: email,
            subject: "Forgot Password",
            html: htmlContent,
            attachments: [
                {
                filename: "logo.png",
                path: logoPath,
                cid: "logo",
                },
            ],
            };
        transporter.sendMail(mailOptions, (error) => {
        if (error) {
            reject(error);
        } else {
            resolve();
        }
        });
    });
    },
    sendReminder: (email, bookID) => {
        let cancelLink = `https://spaces-xnt3.onrender.com/cancelbook?id=${bookID}`;
        return new Promise((resolve, reject) => {
            const htmlContent = `
                <html>
                    <head>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                background-color: #f8f8f8;
                            }
                            .container {
                                max-width: 600px;
                                margin: 0 auto;
                                padding: 20px;
                                background-color: #1B262C;
                                border: 1px solid #dddddd;
                                border-radius: 5px;
                                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                            }
                            .heading {
                                text-align: center;
                                color: #BBE1FA;
                                font-size: 36px;
                                margin-bottom: 20px;
                            }
                            .cancel-button {
                                margin-top: 20px;
                                margin-bottom: 30px;
                            }
                            .code-box {
                                display: center;
                                padding: 10px 20px;
                                background-color: #BBE1FA;
                                border: 1px solid #dddddd;
                                border-radius: 5px;
                                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                            }
                            .signature {
                                text-align: center;
                                font-weight: bold;
                                margin-top: 20px;
                                color: #BBE1FA;
                            }
                            p {
                                font-size: 24px;
                                color: #0F4C75
                            }
                            .button {
                                display: block;
                                padding: 10px 20px;
                                background-color: #1B262C;
                                color: #BBE1FA;
                                text-align: center;
                                text-decoration: none;
                                font-size: 24px;
                                border-radius: 5px;
                                cursor: pointer;
                            }
                            .button:hover {
                                background-color: #0F4C75;
                            }
                            a{
                                color: #BBE1FA
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <div class="heading">
                                YOUR BOOKING IS IN 6 HOURS!
                            </div>
                            <div style="text-align: center;">
                                <img src="cid:logo" alt="Spaces Logo" style="width: 300px; height: auto; ">
                            </div>
                            <div class="code-box">
                                <p>Please be ready in your time for your booking.</p>
                                <p>If you want to cancel your booking click on the cancel button</p>
                                <div class="cancel-button">
                                <a href= ${cancelLink} class="button">Cancel booking</a>
                                </div>
                            </div>
                            <div class="signature">
                                Thanks,<br>
                                Spaces Team
                            </div>
                        
                        </div>
                    </body>
                </html>
                `;
            const mailOptions = {
                from: {
                    name: "Spaces Platform",
                    address: process.env.GMAIL_USER,
                },
                to: email,
                subject: "Booking Reminder",
                html: htmlContent,
                attachments: [
                    {
                    filename: "logo.png",
                    path: logoPath,
                    cid: "logo",
                    },
                ],
                };
            transporter.sendMail(mailOptions, (error) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
            });
        });
    },
    sendReminderReview: (email, cwSpaceID) => {
        let reviewLink = `https://spaces-xnt3.onrender.com/reviewbook?id=${cwSpaceID}`;
        return new Promise((resolve, reject) => {
            const htmlContent = `
                <html>
                    <head>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                background-color: #f8f8f8;
                            }
                            .container {
                                max-width: 600px;
                                margin: 0 auto;
                                padding: 20px;
                                background-color: #1B262C;
                                border: 1px solid #dddddd;
                                border-radius: 5px;
                                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                            }
                            .heading {
                                text-align: center;
                                color: #BBE1FA;
                                font-size: 36px;
                                margin-bottom: 20px;
                            }
                            .review-button {
                                margin-top: 20px;
                                margin-bottom: 30px;
                            }
                            .code-box {
                                display: center;
                                padding: 10px 20px;
                                background-color: #BBE1FA;
                                border: 1px solid #dddddd;
                                border-radius: 5px;
                                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                            }
                            .signature {
                                text-align: center;
                                font-weight: bold;
                                margin-top: 20px;
                                color: #BBE1FA;
                            }
                            p {
                                font-size: 24px;
                                color: #0F4C75
                            }
                            .button {
                                display: block;
                                padding: 10px 20px;
                                background-color: #1B262C;
                                color: #BBE1FA;
                                text-align: center;
                                text-decoration: none;
                                font-size: 24px;
                                border-radius: 5px;
                                cursor: pointer;
                            }
                            .button:hover {
                                background-color: #0F4C75;
                            }
                            a{
                                color: #BBE1FA
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <div class="heading">
                                Thanks for using Spaces
                            </div>
                            <div style="text-align: center;">
                                <img src="cid:logo" alt="Spaces Logo" style="width: 300px; height: auto; ">
                            </div>
                            <div class="code-box">
                                <p>To continuously improve our services and provide you with the best experience possible, we would greatly appreciate it if you could take a few moments to share your thoughts and feedback with us. Your opinion matters to us, and your insights will help us enhance our offerings for you and future clients.</p>
                                <p>Please click on the button below to share your valuable feedback:</p>
                                <div class="review-button">
                                <a href= ${reviewLink} class="button">Review booking</a>
                                </div>
                            </div>
                            <div class="signature">
                                Thanks,<br>
                                Spaces Team
                            </div>
                            
                        </div>
                    </body>
                </html>
                `;
            const mailOptions = {
                from: {
                    name: "Spaces Platform",
                    address: process.env.GMAIL_USER,
                },
                to: email,
                subject: "Booking Review",
                html: htmlContent,
                attachments: [
                    {
                    filename: "logo.png",
                    path: logoPath,
                    cid: "logo",
                    },
                ],
                };
            transporter.sendMail(mailOptions, (error) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
            });
        });
    }
};
