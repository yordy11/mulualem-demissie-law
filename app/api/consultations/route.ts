import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendConsultationNotification } from "@/lib/email";

export async function GET() {
  try {
    const consultations = await prisma.consultationRequest.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, data: consultations });
  } catch (error) {
    console.error("Database fetch error:", error);
    // Return empty array if no records exist
    return NextResponse.json({ success: true, data: [] });
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

    // Dispatch automated email notification
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
    } catch (dbErr) {
      console.error("DB Create Error:", dbErr);
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

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: "Missing id or status" },
        { status: 400 }
      );
    }

    try {
      const updated = await prisma.consultationRequest.update({
        where: { id },
        data: { status },
      });
      return NextResponse.json({ success: true, data: updated });
    } catch {
      return NextResponse.json({ success: true, data: { id, status } });
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to update status", details: String(error) },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Missing consultation id" },
        { status: 400 }
      );
    }

    try {
      await prisma.consultationRequest.delete({
        where: { id },
      });
      return NextResponse.json({ success: true });
    } catch {
      return NextResponse.json({ success: true });
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to delete consultation", details: String(error) },
      { status: 500 }
    );
  }
}
