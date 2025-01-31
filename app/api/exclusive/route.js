import { NextResponse } from "next/server";

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

    const phoneRegex = /^\d{10}$/; // Example: Simple 10-digit phone number validation
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { message: "Please provide a valid phone number" },
        { status: 400 }
      );
    }

    // Process the token (e.g., validate it)
    // ...

    return NextResponse.json({ message: "Token received" }, { status: 201 });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { message: "Invalid JSON format" },
      { status: 400 }
    );
  }
}

// export async function GET() {
//   return NextResponse.json(
//     { message: "GET request not allowed" },
//     { status: 200 }
//   );
// }
