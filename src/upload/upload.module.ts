import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { ProductModule } from 'src/product/product.module';
import { UploadService } from './upload.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [ProductModule,UserModule],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
