import { Router } from "express";
import { userRouter } from "../modules/user/user.routes";
import { productRouter } from "../modules/product/product.routes";
import { orderRouter } from "../modules/order/order.routes";
import { referralRouter } from "../modules/referral/referral.routes";

interface IModuleRoute {
  path: string;
  router: Router;
}

export const appRoutes = Router();

const moduleRoutes: IModuleRoute[] = [
  {
    path: "/user",
    router: userRouter,
  },
  {
    path: "/product",
    router: productRouter,
  },
  {
    path: "/order",
    router: orderRouter,
  },
  {
    path: "/referral",
    router: referralRouter,
  },
];

moduleRoutes.forEach((route) => {
  appRoutes.use(route.path, route.router);
});
