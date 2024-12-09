import { query } from "@/lib/db";
import { AuthenticationError, verifySession } from "@/lib/verifySession";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        // Verify the session and get the user's email
        const session = await verifySession();
        const email = session?.user?.email;

        // If the email is missing, respond with an error
        if (!email) {
            return NextResponse.json({ error: "User email not found in session" }, { status: 401 });
        }

        let sql = `SELECT application_id, institution_name FROM Applications WHERE email = ?`;
        const params: string[] = [email];

        const rows = (await query(sql, params)) as RowDataPacket[];

        if (rows.length === 0) {
            return NextResponse.json({ message: "No applications found" }, { status: 200 });
        }

        return NextResponse.json(rows);
    } catch (error) {
        console.error("Error fetching events:", error);
        if (error instanceof AuthenticationError) {
            return NextResponse.json({ error: error.message }, { status: error.status });
        }
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
