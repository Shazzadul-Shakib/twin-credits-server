import { ProductModel } from "./product.model";

// ----- get all products service ----- //
const getAllProducts = async () => {
  const products = await ProductModel.find().select("-__v");
  return products;
};

export const productService = {
  getAllProducts,
};
