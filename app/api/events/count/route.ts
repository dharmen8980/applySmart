import { query } from "@/lib/db";
import { AuthenticationError, verifySession } from "@/lib/verifySession";
import { RowDataPacket } from "mysql2";
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
    
            let sql = `SELECT 
                        CASE
                            WHEN DATEDIFF(e.event_date, NOW()) BETWEEN 0 AND 15 THEN 1
                            WHEN DATEDIFF(e.event_date, NOW()) BETWEEN 16 AND 30 THEN 2
                            ELSE 3
                        END AS labelCode,
                        COUNT(*) AS count
                    FROM Events e
                    JOIN Applications a ON e.application_id = a.application_id
                    WHERE a.email = ? AND DATEDIFF(e.event_date, NOW()) >= 0
                    GROUP BY labelCode;`;
    
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