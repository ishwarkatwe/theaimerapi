import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { WishlistModule } from './wishlist/wishlist.module';
import { CartModule } from './cart/cart.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://ishwarkatwe0816:ckHSfVHuKrMj1FNY@cluster0.9bysf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
      {},
    ),
    UserModule,
    ProductModule,
    WishlistModule,
    CartModule,
    OrdersModule,
    PaymentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
