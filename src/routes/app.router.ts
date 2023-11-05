import { Router, Request, Response, NextFunction } from 'express';

import { HttpStatusCode } from '../enum/server/status.codes.enum';
import appService from '../services/app.service';
import { AppError } from '../utils/Error/AppError';
import { request } from 'http';

const appRouter = Router();

appRouter.post('/users', (req: Request, res: Response, next: NextFunction) => {
  appService
    .createUser(req.body)
    .then(() => {
      res.status(HttpStatusCode.Created).send();
    })
    .catch((e) =>
      next(
        new AppError(e.statusCode ? e.statusCode : HttpStatusCode.InternalServerError, e.message ? e.message : JSON.stringify(e)),
      ),
    );
});

appRouter.put('/users/:userID', (req: Request, res: Response, next: NextFunction) => {
  appService
    .updateUser(parseInt(req.params.userID), req.body)
    .then(() => {
      res.status(HttpStatusCode.NoContent).send();
    })
    .catch((e) =>
      next(
        new AppError(e.statusCode ? e.statusCode : HttpStatusCode.InternalServerError, e.message ? e.message : JSON.stringify(e)),
      ),
    );
});

appRouter.get('/users', (req: Request, res: Response, next: NextFunction) => {
  appService
    .listUsers()
    .then((data) => {
      res.status(HttpStatusCode.Ok).send(data);
    })
    .catch((e) =>
      next(
        new AppError(e.statusCode ? e.statusCode : HttpStatusCode.InternalServerError, e.message ? e.message : JSON.stringify(e)),
      ),
    );
});

appRouter.get('/users/:userID', (req: Request, res: Response, next: NextFunction) => {
  appService
    .getUser(parseInt(req.params.userID))
    .then((data) => {
      res.status(HttpStatusCode.Ok).send(data);
    })
    .catch((e) =>
      next(
        new AppError(e.statusCode ? e.statusCode : HttpStatusCode.InternalServerError, e.message ? e.message : JSON.stringify(e)),
      ),
    );
});

appRouter.post('/users/:userID/tasks', (req: Request, res: Response, next: NextFunction) => {
  appService
    .createTask(parseInt(req.params.userID), req.body)
    .then(() => {
      res.status(HttpStatusCode.Created).send();
    })
    .catch((e) =>
      next(
        new AppError(e.statusCode ? e.statusCode : HttpStatusCode.InternalServerError, e.message ? e.message : JSON.stringify(e)),
      ),
    );
});

appRouter.put('/users/:userID/tasks/:taskID', (req: Request, res: Response, next: NextFunction) => {
  appService
    .updateTask(parseInt(req.params.userID), parseInt(req.params.taskID), req.body)
    .then(() => {
      res.status(HttpStatusCode.NoContent).send();
    })
    .catch((e) =>
      next(
        new AppError(e.statusCode ? e.statusCode : HttpStatusCode.InternalServerError, e.message ? e.message : JSON.stringify(e)),
      ),
    );
});

appRouter.delete('/users/:userID/tasks/:taskID', (req: Request, res: Response, next: NextFunction) => {
  appService
    .deleteTask(parseInt(req.params.userID), parseInt(req.params.taskID))
    .then(() => {
      res.status(HttpStatusCode.Ok).send();
    })
    .catch((e) =>
      next(
        new AppError(e.statusCode ? e.statusCode : HttpStatusCode.InternalServerError, e.message ? e.message : JSON.stringify(e)),
      ),
    );
});

appRouter.get('/users/:userID/tasks/:taskID', (req: Request, res: Response, next: NextFunction) => {
  appService
    .getTask(parseInt(req.params.userID), parseInt(req.params.taskID))
    .then((data) => {
      res.status(HttpStatusCode.Ok).send(data);
    })
    .catch((e) =>
      next(
        new AppError(e.statusCode ? e.statusCode : HttpStatusCode.InternalServerError, e.message ? e.message : JSON.stringify(e)),
      ),
    );
});

appRouter.get('/users/:userID/tasks/', (req: Request, res: Response, next: NextFunction) => {
  appService
    .listTasksByUser(parseInt(req.params.userID))
    .then((data) => {
      res.status(HttpStatusCode.Ok).send(data);
    })
    .catch((e) =>
      next(
        new AppError(e.statusCode ? e.statusCode : HttpStatusCode.InternalServerError, e.message ? e.message : JSON.stringify(e)),
      ),
    );
});

export default appRouter;
