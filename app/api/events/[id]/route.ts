import { query } from "@/lib/db";
import { AuthenticationError, verifySession } from "@/lib/verifySession";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }>}) {
    try {
        const id = (await params).id;
        const event_id = parseInt(id, 10);

        // Verify the session
        await verifySession();

        const rows = (await query(`SELECT * FROM Events WHERE event_id = ?`, [event_id])) as RowDataPacket[];

        if (rows.length === 0) {
            return NextResponse.json({ message: "No events found" }, { status: 200 });
        }

        return NextResponse.json(rows);
    } catch (error) {
        console.error("Error fetching event:", error);
        if (error instanceof AuthenticationError) {
            return NextResponse.json({ error: error.message }, { status: error.status });
        }
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        // Verify the session
        await verifySession();

        const { event_id, event_title, event_date } = await request.json();

        await query(`UPDATE Events SET event_title = ?, event_date = ? WHERE event_id = ?`, [event_title, event_date, event_id]);

        return NextResponse.json({ message: "Event updated" }, { status: 200 });
    } catch (error) {
        console.error("Error updating event:", error);
        if (error instanceof AuthenticationError) {
            return NextResponse.json({ error: error.message }, { status: error.status });
        }
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }>}) {
    try {
        const id = (await params).id;
        const event_id = parseInt(id);

        // Verify the session and get the user's email
        const session = await verifySession();
        const email = session?.user?.email;

        // If the email is missing, respond with an error
        if (!email) {
            return NextResponse.json({ error: "User email not found in session" }, { status: 401 });
        }

        const result = (await query(`UPDATE Applications SET event_id = NULL WHERE event_id = ? AND email = ?`, [event_id, email])) as ResultSetHeader;

        if (result.affectedRows === 0) 
            return NextResponse.json({ error: "Event not found" }, { status: 404 });

        await query(`DELETE FROM Events WHERE event_id = ?`, [event_id]);

        return NextResponse.json({ message: "Event deleted" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting event:", error);
        if (error instanceof AuthenticationError) {
            return NextResponse.json({ error: error.message }, { status: error.status });
        }
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}