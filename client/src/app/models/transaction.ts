export interface Transaction {
  transactionId: number;
  clientName: string;
  paymentMethod: string;
  totalAmount: number;
  discountType: string;
  discountPercentage: number;
  products: Product[];
}

export interface Product {
  productId: number;
  productName: string;
  quantitySold: number;
}
