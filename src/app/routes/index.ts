import { Router } from "express";
import { userRouter } from "../modules/user/user.routes";

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
];

moduleRoutes.forEach((route) => {
  appRoutes.use(route.path, route.router);
});
