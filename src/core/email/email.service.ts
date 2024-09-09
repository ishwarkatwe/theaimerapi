import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ResetPassword, UserEmailTemplate, WelcomeOnBoard } from './templates';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendWelcomeMail(user) {
    try {
      await this.mailerService.sendMail({
        to: user.email,
        subject: 'Welcome to ' + process.env.BRAND,
        html: WelcomeOnBoard(
          process.env.LOGO,
          process.env.BRAND,
          user.username,
          process.env.FE_BASE_URL + '/login',
        ),
      });
      console.log('Welcome mail send to ', user.email);
    } catch (error) {
      console.error('Error sending welcome email:', error);
    }
  }

  async sendOtpMail(user: any) {
    try {
      await this.mailerService.sendMail({
        to: user.email,
        subject: 'Email OTP Verification | ' + process.env.BRAND,
        html: UserEmailTemplate(
          process.env.LOGO,
          process.env.BRAND,
          user.username,
          user.otp,
        ),
      });
      console.log('Otp email sent successfully', user);
    } catch (error) {
      console.error('Error sending otp email:', error);
    }
  }

  async sendPasswordResetMail(user: {
    email: string;
    username: string;
    resetUrl: string;
  }) {
    try {
      await this.mailerService.sendMail({
        to: user.email,
        subject: 'Reset Your Password | ' + process.env.BRAND,
        html: ResetPassword(
          process.env.LOGO,
          process.env.BRAND,
          user.username,
          user.resetUrl,
        ),
      });
      console.log('Password reset email sent successfully');
    } catch (error) {
      console.error('Error sending password reset email:', error);
    }
  }
}
