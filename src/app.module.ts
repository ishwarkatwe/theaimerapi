import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CartModule } from './cart/cart.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentModule } from './payment/payment.module';
import { CategoryModule } from './category/category.module';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { CoreModule } from './core/core.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/guard/auth.guard';
import { JwtService } from '@nestjs/jwt';

const ENV = process.env.NODE_ENV;
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: !ENV
        ? '.env'
        : ENV === 'production'
          ? '.env.production'
          : '.env.development',
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI, {}),
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_SERVICE,
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      },
      defaults: {
        from: process.env.BRAND + '<' + process.env.EMAIL_USERNAME + '>',
      },
    }),
    UserModule,
    ProductModule,
    CartModule,
    OrdersModule,
    PaymentModule,
    CategoryModule,
    AuthModule,
    CoreModule,
  ],
  controllers: [AppController],
  providers: [AppService,
    JwtService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,  // Global JWT Guard
    },
  ],
})
export class AppModule {}
