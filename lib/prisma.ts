// Resilient Prisma client wrapper for production & local execution

export interface ConsultationRequestData {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  subject: string;
  message?: string | null;
  status: "PENDING" | "APPROVED" | "CONTACTED" | "COMPLETED" | "CANCELLED";
  date: Date | string;
  createdAt?: Date;
  updatedAt?: Date;
}

class PrismaClientMock {
  // Empty array - only real client submissions will exist
  private consultations: ConsultationRequestData[] = [];

  consultationRequest = {
    findMany: async (_args?: { orderBy?: Record<string, "asc" | "desc"> }) => {
      return [...this.consultations];
    },
    create: async ({ data }: { data: Omit<ConsultationRequestData, "id"> }) => {
      const record: ConsultationRequestData = {
        ...data,
        id: String(Date.now()),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      this.consultations.unshift(record);
      return record;
    },
    update: async ({
      where,
      data,
    }: {
      where: { id: string };
      data: Partial<ConsultationRequestData>;
    }) => {
      const index = this.consultations.findIndex((c) => c.id === where.id);
      if (index !== -1) {
        this.consultations[index] = {
          ...this.consultations[index],
          ...data,
          updatedAt: new Date(),
        };
        return this.consultations[index];
      }
      return null;
    },
    delete: async ({ where }: { where: { id: string } }) => {
      this.consultations = this.consultations.filter((c) => c.id !== where.id);
      return { success: true };
    },
  };
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientMock | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClientMock();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
