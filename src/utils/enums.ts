export enum Role {
  Admin = 'Admin',
  Customer = 'Customer',
}

export enum OrderStatus {
  pending = 'pending',
  shipped = 'shipped',
  completed = 'completed',
  cancelled = 'cancelled',
}

export enum paymentStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  PAID = 'paid',
  FAILED = 'failed',
  REFUNDED = 'refunded',
  DISPUTED = 'disputed',
  CANCELLED = 'cancelled',
}
