import { paymentStatus } from 'src/utils/enums';

export class createPayment {
  amount: number;
  payment_method: string;
  payment_status: paymentStatus;
  userId: number;
  orderId: number;
}
