// Resilient Prisma client mock/wrapper

export interface ConsultationRequestData {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  subject: string;
  message?: string | null;
  status: "PENDING" | "APPROVED" | "COMPLETED" | "CANCELLED";
  date: Date | string;
  createdAt?: Date;
  updatedAt?: Date;
}

class PrismaClientMock {
  private consultations: ConsultationRequestData[] = [
    {
      id: "1",
      name: "Eleanor Vance",
      email: "e.vance@example.com",
      phone: "+1 (555) 234-5678",
      date: new Date("2024-10-24"),
      subject: "Corporate Structuring",
      status: "PENDING",
      createdAt: new Date("2024-10-24"),
    },
    {
      id: "2",
      name: "Marcus Sterling",
      email: "m.sterling@example.com",
      phone: "+1 (555) 345-6789",
      date: new Date("2024-10-23"),
      subject: "Intellectual Property Dispute",
      status: "APPROVED",
      createdAt: new Date("2024-10-23"),
    },
    {
      id: "3",
      name: "Sophia Chen",
      email: "s.chen@example.com",
      phone: "+1 (555) 456-7890",
      date: new Date("2024-10-22"),
      subject: "Estate Planning",
      status: "COMPLETED",
      createdAt: new Date("2024-10-22"),
    },
    {
      id: "4",
      name: "David Roth",
      email: "d.roth@example.com",
      phone: "+1 (555) 567-8901",
      date: new Date("2024-10-21"),
      subject: "Contract Review",
      status: "PENDING",
      createdAt: new Date("2024-10-21"),
    },
  ];

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
  };
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientMock | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClientMock();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
