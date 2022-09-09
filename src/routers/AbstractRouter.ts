import { Router } from 'express';
import middlewareWrapper from '@lib/middlewareWrapper';

abstract class AbstractRouter {
  protected readonly router: Router;

  constructor(router: Router) {
    this.router = router;
    this.initializeRoutes();
  }

  public getRouter() {
    return this.router;
  }

  protected abstract initializeRoutes(): void;

  protected wrapRoute(route: Function) {
    const boundRoute = route.bind(this);
    return middlewareWrapper(boundRoute)
  }
}

export { AbstractRouter };