import bcrypt from "bcryptjs";

const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD || "";

export async function verifyAdminPassword(password: string): Promise<boolean> {
  try {
    // For simplicity, we're doing direct comparison
    // In production, you'd want to hash the password in .env and compare hashes
    return password === ADMIN_PASSWORD_HASH;
  } catch (error) {
    console.error("Password verification error:", error);
    return false;
  }
}

export function hashPassword(password: string): string {
  return bcrypt.hashSync(password, 10);
}

// Simple session management using cookies
export function createAdminSession(): string {
  const sessionToken =
    Math.random().toString(36).substring(2) + Date.now().toString(36);
  return sessionToken;
}

export function isValidSession(token: string | undefined): boolean {
  // In a real app, you'd validate against a database or Redis
  // For now, we'll just check if the token exists
  return !!token && token.length > 10;
}
