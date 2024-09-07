import { Module } from '@nestjs/common';
import { EmailService } from './email/email.service';
import { BaseHandlerService } from './base-handler/base-handler.service';

@Module({
  providers: [EmailService, BaseHandlerService],
  exports: [EmailService, BaseHandlerService],
})
export class CoreModule {}
