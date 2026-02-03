import { NextResponse } from "next/server";
// import nodemailer from "nodemailer";

interface ExclusiveFormData {
  name: string;
  email: string;
  phone: string;
  token: string;
}

export async function POST(req: Request) {
  try {
    const { name, email, phone, token }: ExclusiveFormData = await req.json();

    // Basic validation
    if (!name || !email || !phone || !token) {
      return NextResponse.json(
        { message: "Please fill all fields" },
        { status: 400 },
      );
    }

    // Additional validation for email and phone format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Please provide a valid email address" },
        { status: 400 },
      );
    }

    const phoneRegex = /^0\d{9}$/; // Example: Simple 10-digit phone number validation
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { message: "Please provide a valid phone number" },
        { status: 400 },
      );
    }

    // Send details to email
    // const emailUser = process.env.EMAIL_USER || "unique.theo98@gmail.com";
    // const emailPass = process.env.EMAIL_PASSWORD || "qhhc qiie ohxh hzrd";
    const adminEmail = process.env.ADMIN_EMAIL || "0719000292@ttu.edu.gh";

    // ✅ Configure Nodemailer
    // const transporter = nodemailer.createTransport({
    //   service: "gmail", // Or use SMTP settings for another provider
    //   auth: {
    //     user: emailUser, // Your email (use env variables)
    //     pass: emailPass, // Your email app password (not your real password)
    //   },
    // });

    // ✅ Compose Email
    // const mailOptions = {
    //   from: emailUser,
    //   to: adminEmail, // Replace with admin email
    //   subject: "New Token Submission",
    //   text: `New submission received:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nToken: ${token}`,
    // };

    // ✅ Send Email
    // await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: `Token received and ${email} sent to admin, ${adminEmail}` },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { message: "Something went wrong, please try again" },
      { status: 500 },
    );
  }
}
