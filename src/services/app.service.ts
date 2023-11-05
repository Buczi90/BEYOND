import { User, Task } from '@prisma/client';
import { UserBaseDto, TaskDto } from '../dto/app.dto';
import UsePrisma from '../utils/Prisma/usePrisma';
import { HttpStatusCode } from '../enum/server/status.codes.enum';

class AppService extends UsePrisma {
  private findUserById(userID: number) {
    return new Promise<User>((resolve, reject) => {
      this.prisma.user
        .findUnique({ where: { id: userID } })
        .then((user) => {
          if (!user) {
            return reject({ statusCode: HttpStatusCode.NotFound, message: `The user doesn't exist` });
          }
          resolve(user);
        })
        .catch((e) => reject(e));
    });
  }

  private findTaskById(userID: number, taskID: number) {
    return new Promise<Task | null>((resolve, reject) => {
      this.prisma.task
        .findFirst({ where: { AND: [{ id: taskID }, { userID }] } })
        .then((task) => {
          if (!task) {
            return reject({ statusCode: HttpStatusCode.NotFound, message: `The task doesn't exist` });
          }
          resolve(task);
        })
        .catch((e) => reject(e));
    });
  }

  createUser(body: UserBaseDto) {
    return new Promise<void>((resolve, reject) => {
      const { username, first_name, last_name } = body;
      this.prisma.user
        .create({
          data: {
            userName: username,
            firstName: first_name,
            lastName: last_name,
          },
        })
        .then(() => {
          resolve();
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  updateUser(userID: number, body: UserBaseDto) {
    return new Promise<void>((resolve, reject) => {
      const { username, first_name, last_name } = body;
      this.findUserById(userID)
        .then((user) => {
          this.prisma.user
            .update({
              where: { id: user.id },
              data: {
                userName: username,
                firstName: first_name,
                lastName: last_name,
              },
            })
            .then(() => resolve())
            .catch((e) => reject(e));
        })
        .catch((e) => reject(e));
    });
  }

  listUsers() {
    return new Promise((resolve, reject) => {
      this.prisma.user
        .findMany()
        .then((users) => resolve(users))
        .catch((e) => reject(e));
    });
  }

  getUser(userID: number) {
    return new Promise((resolve, reject) => {
      this.findUserById(userID)
        .then((user) => resolve(user))
        .catch((e) => reject(e));
    });
  }

  createTask(userID: number, body: TaskDto) {
    return new Promise<void>((resolve, reject) => {
      const { name, description, date_time } = body;
      this.findUserById(userID)
        .then(() =>
          this.prisma.task
            .create({
              data: {
                description,
                name,
                userID,
                dateTime: new Date(date_time),
              },
            })
            .then(() => resolve())
            .catch((e) => reject(e)),
        )
        .catch((e) => reject(e));
    });
  }

  updateTask(userID: number, taskID: number, body: TaskDto) {
    return new Promise<void>((resolve, reject) => {
      const { name, description, date_time } = body;
      this.findTaskById(userID, taskID)
        .then(() =>
          this.prisma.task
            .update({
              where: { id: taskID },
              data: {
                description,
                name,
                userID,
                dateTime: date_time,
              },
            })
            .then(() => resolve())
            .catch((e) => reject(e)),
        )
        .catch((e) => reject(e));
    });
  }

  deleteTask(userID: number, taskID: number) {
    return new Promise<void>((resolve, reject) => {
      this.findTaskById(userID, taskID)
        .then(() => {
          this.prisma.task
            .delete({ where: { id: taskID } })
            .then(() => resolve())
            .catch((e) => reject(e));
        })
        .catch((e) => reject(e));
    });
  }

  getTask(userID: number, taskID: number) {
    return new Promise((resolve, reject) => {
      this.findTaskById(userID, taskID)
        .then((task) => {
          resolve(task);
        })
        .catch((e) => reject(e));
    });
  }

  listTasksByUser(userID: number) {
    return new Promise((resolve, reject) => {
      this.prisma.task
        .findMany({ where: { userID } })
        .then((tasks) => resolve(tasks))
        .catch((e) => reject(e));
    });
  }
}

export default new AppService();
