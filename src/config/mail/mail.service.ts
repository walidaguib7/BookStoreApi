import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}
  async sendEmail(to: string, code: string) {
    try {
      await this.mailerService.sendMail({
        to,
        subject: `code verification is ${code}`,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
