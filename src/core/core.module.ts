import { Module } from '@nestjs/common';
import { EmailService } from './email/email.service';
import { BaseHandlerService } from './base-handler/base-handler.service';
import { FirebaseService } from './firebase/firebase.service';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [EmailService, BaseHandlerService, FirebaseService, ConfigService],
  exports: [EmailService, BaseHandlerService, FirebaseService],
})
export class CoreModule {}
