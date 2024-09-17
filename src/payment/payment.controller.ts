import { Controller, Post, HttpStatus, Req, Res } from '@nestjs/common';
import * as crypto from 'crypto';
import { PaymentStatus } from 'src/orders/schemas/order.schema';
import { PaymentService } from './payment.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Payment')
@ApiBearerAuth('jwt')
@Controller('razorpay')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('webhook')
  async handleWebhook(@Req() req, @Res() res) {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    const shasum = crypto.createHmac('sha256', secret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest('hex');

    if (digest === req.headers['x-razorpay-signature']) {
      const paymentData = req.body.payload.payment.entity;
      const orderId = paymentData.notes.order_id;

      if (req.body.event === 'payment.captured') {
        await this.paymentService.updatePaymentStatus(
          orderId,
          PaymentStatus.COMPLETED,
        );
      } else {
        await this.paymentService.updatePaymentStatus(
          orderId,
          PaymentStatus.FAILED,
        );
      }

      return res.status(HttpStatus.OK).json({ status: 'ok' });
    } else {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ status: 'invalid signature' });
    }
  }
}
