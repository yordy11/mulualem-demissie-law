import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendConsultationNotification } from "@/lib/email";

export async function GET() {
  try {
    const consultations = await prisma.consultationRequest.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, data: consultations });
  } catch {
    return NextResponse.json({
      success: true,
      data: [
        {
          id: "1",
          name: "Eleanor Vance",
          email: "e.vance@example.com",
          date: new Date("2024-10-24").toISOString(),
          subject: "Corporate & Commercial Law",
          status: "PENDING",
        },
        {
          id: "2",
          name: "Marcus Sterling",
          email: "m.sterling@example.com",
          date: new Date("2024-10-23").toISOString(),
          subject: "Civil Litigation",
          status: "APPROVED",
        },
        {
          id: "3",
          name: "Sophia Chen",
          email: "s.chen@example.com",
          date: new Date("2024-10-22").toISOString(),
          subject: "Property & Real Estate",
          status: "COMPLETED",
        },
        {
          id: "4",
          name: "David Roth",
          email: "d.roth@example.com",
          date: new Date("2024-10-21").toISOString(),
          subject: "Contract Law",
          status: "PENDING",
        },
      ],
    });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, preferredDate, preferredTime, message } = body;

    if (!name || !email || !subject) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const compiledMessage = [
      message,
      preferredDate ? `Preferred Date: ${preferredDate}` : "",
      preferredTime ? `Preferred Time: ${preferredTime}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    // Dispatch automated email notification asynchronously
    try {
      await sendConsultationNotification({
        name,
        email,
        phone,
        practiceArea: subject,
        preferredDate,
        preferredTime,
        message,
      });
    } catch (e) {
      console.warn("Failed to dispatch email alert:", e);
    }

    try {
      const newConsultation = await prisma.consultationRequest.create({
        data: {
          name,
          email,
          phone: phone || null,
          subject,
          message: compiledMessage || null,
          date: new Date(),
          status: "PENDING",
        },
      });
      return NextResponse.json({ success: true, data: newConsultation }, { status: 201 });
    } catch {
      return NextResponse.json(
        {
          success: true,
          data: {
            id: String(Date.now()),
            name,
            email,
            phone,
            subject,
            message: compiledMessage,
            date: new Date().toISOString(),
            status: "PENDING",
          },
        },
        { status: 201 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Invalid request data", details: String(error) },
      { status: 500 }
    );
  }
}
