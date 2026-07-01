import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Contact from "@/models/Contact";
import { sendContactEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body ?? {};

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email and message are required." },
        { status: 400 }
      );
    }

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email));
    if (!emailOk) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // Save to database
    await connectToDatabase();
    await Contact.create({ name, email, phone, subject, message });

    // Send email notification — runs in the background; a failure does NOT
    // block the success response so the user still gets confirmation.
    sendContactEmail({ name, email, phone, subject, message }).catch((err) =>
      console.error("Email dispatch failed:", err)
    );

    return NextResponse.json(
      { message: "Thanks for reaching out! We'll get back to you soon." },
      { status: 201 }
    );
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
