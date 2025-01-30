import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { name, email, message } = await req.json();
  console.log("server::", name, email, message);

  if (!name || !email || !message) {
    return NextResponse.json(
      { message: "Please fill all fields" },
      { status: 400 }
    );
  }

  console.log("dotenv variable:::", process.env.EMAIL_USER);

  // Configure Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: "gmail", // Use your email service (e.g., Gmail, Outlook)
    auth: {
      user: process.env.EMAIL_USER, // Your email address
      pass: process.env.EMAIL_PASSWORD, // Your email password or app-specific password
    },
  });

  // Email content
  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender address
    to: process.env.ADMIN_EMAIL, // Admin email address
    subject: `New Contact Form Submission from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    NextResponse.json({ message: "Email sent successfully." }, { status: 201 });
  } catch (error) {
    console.error("Error sending email:", error);
    NextResponse.json({ message: "Error sending email." }, { status: 500 });
  }
}
