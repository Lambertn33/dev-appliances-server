import { PrismaClient, Job } from "@prisma/client";

const prisma = new PrismaClient();

export class JobRepository {
  async getAlldJobs(
    page: number,
    pageSize: number
  ): Promise<{ jobs: Job[]; total: number }> {
    const total = await prisma.job.count();
    const jobs = await prisma.job.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { id: "asc" },
    });

    return { jobs, total };
  }

  async createJob(
    name: string,
    description: string,
    companyId: number
  ): Promise<Job> {
    return prisma.job.create({ data: { name, description, companyId } });
  }

  async deleteJob(id: number): Promise<void> {
    await prisma.job.delete({ where: { id } });
  }
}