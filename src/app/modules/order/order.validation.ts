import { z } from "zod";

export const createOrderValidationSchema = z.object({
  product: z.string().min(1, "product is required"),
});

export const OrderValidations = {
  createOrderValidationSchema,
};
