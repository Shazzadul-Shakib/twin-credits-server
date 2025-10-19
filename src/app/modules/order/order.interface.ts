import { Types } from 'mongoose';

export interface IOrder {
  userId: Types.ObjectId;
  product: Types.ObjectId;
  totalPrice: number;
}

export interface TOrder {
  userId: string;
  product: string;
}