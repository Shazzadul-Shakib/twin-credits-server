import { Router } from "express";

interface IModuleRoute {
  path: string;
  router: Router;
}

export const appRoutes = Router();

const moduleRoutes: IModuleRoute[] = [];

moduleRoutes.forEach((route) => {
  appRoutes.use(route.path, route.router);
});
