import { PrismaClient } from '@prisma/client';

class UsePrisma {
  prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  /* async findMany(model: string) {
    return await this.prisma[model].findMany();
  }

  async create(model: string, data: Record<string, any>) {
    return await this.prisma[model].create({ data });
  } */
}

export default UsePrisma;
