import { getServerSession } from "next-auth";

// Custom Error Class for Authentication
export class AuthenticationError extends Error {
  status: number;

  constructor(message: string = "You are not authenticated") {
    super(message);
    this.name = "AuthenticationError";
    this.status = 401;
  }
}

export async function verifySession() {
  const session = await getServerSession();
  if (session) {
    return session;
  } else {
    throw new AuthenticationError();
  }
}
