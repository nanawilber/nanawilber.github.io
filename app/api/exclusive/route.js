import { NextResponse } from "next/server";
// import nodemailer from "nodemailer";

export async function POST(req) {
  const { name, email, phone, token } = await req.json();
  console.log(name, email, phone, token);
  if (!name || !email || !phone || !token) {
    return NextResponse.json(
      { message: "Please fill all fields" },
      { status: 400 }
    );
  }

  return NextResponse.json({ message: "Token received" }, { status: 201 });
}

export async function GET() {
  return NextResponse.json(
    { message: "GET request not allowed" },
    { status: 405 }
  );
}
