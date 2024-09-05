export const UserEmailTemplate = (
  logo,
  brand,
  username,
  otp,
) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email OTP Verification</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f9f9f9; margin: 0; padding: 0;">
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; background-color: #ffffff; margin-top: 50px; border: 1px solid #dddddd; border-radius: 5px;">
        <tr>
            <td align="center" style="padding: 20px 0;">
                <img src="${logo}" alt="${brand}" style="width: 100px; height: auto;">
            </td>
        </tr>
        <tr>
            <td style="padding: 20px; text-align: center;">
                <h2 style="color: #333333; margin-bottom: 20px;">Email OTP Verification</h2>
                <p style="color: #555555; font-size: 16px; line-height: 24px; margin-bottom: 30px;">
                    Hello <strong style="color: #333333;">${username}</strong>,<br>
                    Your One-Time Password (OTP) for email verification is:
                </p>
                <div style="font-size: 36px; font-weight: bold; color: #007bff; text-align: center; margin-bottom: 30px;">
                    ${otp}
                </div>
                <p style="color: #555555; font-size: 16px; line-height: 24px;">
                    Please enter this code in the app to verify your email address. The code is valid for the next 10 minutes.
                </p>
                <p style="color: #999999; font-size: 14px; line-height: 20px; margin-top: 40px;">
                    If you didn't request this, please ignore this email or contact support if you have concerns.
                </p>
            </td>
        </tr>
        <tr>
            <td style="background-color: #f4f4f4; text-align: center; padding: 20px; border-top: 1px solid #dddddd;">
                <p style="color: #aaaaaa; font-size: 12px; line-height: 18px;">
                    &copy; 2024 ${brand}. All rights reserved.<br>
                    Made with &#x2764; in India	
                </p>
            </td>
        </tr>
    </table>
</body>
</html>`;

export const ResetPassword = (
    logo,
    brand,
    username,
    resetLink,
  ) =>  `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; background-color: #ffffff; margin-top: 50px; border: 1px solid #dddddd; border-radius: 5px;">
        <tr>
            <td align="center" style="padding: 20px 0;">
                <img src="${logo}" alt="${brand}" style="width: 100px; height: auto;">
            </td>
        </tr>
        <tr>
            <td style="padding: 20px; text-align: center;">
                <h2 style="color: #333333; margin-bottom: 20px;">Reset Your Password</h2>
                <p style="color: #555555; font-size: 16px; line-height: 24px; margin-bottom: 30px;">
                    Hello <strong style="color: #333333;">${username}</strong>,
                </p>
                <p style="color: #555555; font-size: 16px; line-height: 24px; margin-bottom: 30px;">
                    We received a request to reset your password. Click the button below to reset your password:
                </p>
                <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #ffffff; background-color: #007bff; text-decoration: none; border-radius: 5px;">
                    Reset Password
                </a>
                <p style="color: #555555; font-size: 16px; line-height: 24px; margin-top: 30px;">
                    This link is valid for the next 15 minutes and can only be used once.
                </p>
                <p style="color: #999999; font-size: 14px; line-height: 20px; margin-top: 40px;">
                    If you didn't request this, please ignore this email or contact support if you have concerns.
                </p>
            </td>
        </tr>
        <tr>
            <td style="background-color: #f4f4f4; text-align: center; padding: 20px; border-top: 1px solid #dddddd;">
                <p style="color: #aaaaaa; font-size: 12px; line-height: 18px;">
                    &copy; 2024 ${brand}. All rights reserved.<br>
                    Made with &#x2764; in India	
                </p>
            </td>
        </tr>
    </table>
</body>
</html>
`