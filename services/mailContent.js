

const mailContent = (name)=>{
    return `<!DOCTYPE html>
        <html>
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Your ToDo List!</title>
        <style>
            body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            }
            table {
            margin: auto;
            background-color: #ffffff;
            border-radius: 5px;
            }
            h1 {
            margin: 0;
            padding: 20px;
            color: #ffffff;
            background-color: #007bff;
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
            }
            p {
            margin: 10px 20px;
            }
            a {
            color: #007bff;
            text-decoration: none;
            }
            a:hover {
            text-decoration: underline;
            }
            .footer {
            text-align: center;
            padding: 20px;
            background-color: #f4f4f4;
            border-bottom-left-radius: 5px;
            border-bottom-right-radius: 5px;
            }
        </style>
        </head>
        <body>
        <table border="0" cellpadding="0" cellspacing="0" width="600">
            <tr>
            <td>
                <h1>Welcome to Your ToDo List!</h1>
            </td>
            </tr>
            <tr>
            <td>
                <p>Hello ${name},</p>
                <p>Thank you for registering on our ToDo List website! You're now ready to start managing your tasks and getting things done.</p>
                <p>We're excited to have you on board. Log in to your account and start creating your to-do list today!</p>
                <!-- <p>If you have any questions or need assistance, feel free to <a href="mailto:support@todolist.com">contact our support team</a>. -->
                <p>This is an Auto-Generated Mail. Please Do Not Reply To This Mail !!!</p>
                <p>Best regards,</p>
                <p>The ToDo List Team</p>
            </td>
            </tr>
            <tr>
            <td class="footer">
                <p>&copy; 2023 ToDo List. All rights reserved.</p>
            </td>
            </tr>
        </table>
        </body>
        </html>`;
    }

exports.mailContent = mailContent;