import { query } from "@/lib/db";
import { AuthenticationError, verifySession } from "@/lib/verifySession";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest,  { params }: { params: Promise<{ id: string }>}) {
    try {
        const id = (await params).id;
        const application_id = parseInt(id);

        const session = await verifySession();
        const email = session?.user?.email;

        let sql = "DELETE FROM Applications WHERE application_id = ? AND email = ?";
        let sqlParams: any[] = [application_id, email];

        await query(sql, sqlParams);

        return NextResponse.json({ message: "Application deleted" }, { status: 200 });

    } catch (error) {
        console.error("Error deleting application:", error);
        if (error instanceof AuthenticationError) {
            return NextResponse.json({ error: error.message }, { status: error.status });
        }
        return NextResponse.json({ error: `${error}` }, { status: 500 });
    }
}