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

        let sql = `SELECT e.event_id, a.application_id, e.event_title, e.event_date FROM Events e
                   JOIN Applications a ON e.application_id = a.application_id
                   WHERE a.email = ?`;
        const params: string[] = [email];

        const rows = (await query(sql, params)) as RowDataPacket[];

        if (rows.length === 0) {
            return NextResponse.json({ message: "No events found" }, { status: 200 });
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

export async function POST(request: NextRequest) {
    try {
        // Verify the session and get the user's email
        const session = await verifySession();
        const email = session?.user?.email;

        // If the email is missing, respond with an error
        if (!email) {
            return NextResponse.json({ error: "User email not found in session" }, { status: 401 });
        }

        const { title, date, applicationId } = await request.json();

        const result = (await query(`INSERT INTO Events (event_title, event_date, application_id)
                   VALUES (?, ?, ?)`, 
                   [title, date, applicationId])) as ResultSetHeader;

        
        // update application
        await query(`UPDATE Applications SET event_id = ?, updated_at = NOW() WHERE application_id = ?`, [result.insertId, applicationId]);

        return NextResponse.json({ message: "Event created", event_id: result.insertId }, { status: 201 });
    } catch (error) {
        console.error("Error creating event:", error);
        if (error instanceof AuthenticationError) {
            return NextResponse.json({ error: error.message }, { status: error.status });
        }
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}