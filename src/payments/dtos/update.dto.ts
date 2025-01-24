import { PartialType } from '@nestjs/mapped-types';
import { createPayment } from './create.dto';

export class updatePaymentDto extends PartialType(createPayment) {}
