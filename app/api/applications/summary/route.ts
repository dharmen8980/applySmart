import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { verifySession } from "@/lib/verifySession";

export async function GET(request: NextRequest) {
  try {
    const session = await verifySession();
    const email = session?.user?.email;

    // If the email is missing, respond with an error
    if (!email) {
      return NextResponse.json({ error: "User email not found in session" }, { status: 401 });
    }

    let sql = "SELECT status, count(*) as count FROM Applications WHERE email = ? GROUP BY status";
    let params: string[] = [email];

    const rows = (await query(sql, params)) as RowDataPacket[];

    if (rows.length === 0) {
      return NextResponse.json({ message: "No applications found" }, { status: 200 });
    }

    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}