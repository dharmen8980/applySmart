import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { AuthenticationError, verifySession } from "@/lib/verifySession";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }>}) {
    try {
      const id = (await params).id;
      const application_id = parseInt(id, 10);
      
      await verifySession();

      const rows = (await query(`SELECT * FROM Applications WHERE application_id = ?`, [application_id])) as RowDataPacket[];
  
      if (rows.length === 0) {
        return NextResponse.json({ message: "No applications found" }, { status: 200 });
      }
  
      return NextResponse.json(rows);
    } catch (error) {
      console.error("Error fetching applications:", error);
      if (error instanceof AuthenticationError) {
        return NextResponse.json({ error: error.message }, { status: error.status });
      }
      return NextResponse.json({ error: `${error}` }, { status: 500 });
    }
  }

export async function PUT(request: NextRequest) {
    try {  
      await verifySession();

      const { application_id, application_type, institution_name, location, role_program, application_link, status, notes } =
        await request.json();
  
      if (!application_id || !institution_name || !location || !role_program) {
        return NextResponse.json({ error: "Please provide all required fields" }, { status: 400 });
      }
  
      await query(
        `UPDATE Applications SET 
          application_type = ?, 
          institution_name = ?, 
          location = ?, 
          role_program = ?, 
          application_link = ?, 
          status = ?, 
          notes = ?, 
          updated_at = NOW() 
          WHERE application_id = ?`,
        [application_type, institution_name, location, role_program, application_link, status, notes, application_id]
      );
  
      return NextResponse.json({ message: "Application updated successfully" }, { status: 200 });
    } catch (error) {
      console.error("Error updating application:", error);
      if (error instanceof AuthenticationError) {
        return NextResponse.json({ error: error.message }, { status: error.status });
      }
      return NextResponse.json({ error: `${error}` }, { status: 500 });
    }
  }
  
  export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }>}) {
    try {
        const id = (await params).id;
        const application_id = parseInt(id);

      const session = await verifySession();
      const email = session?.user?.email;
  
      // If the email is missing, respond with an error
      if (!email) {
        return NextResponse.json({ error: "User email not found in session" }, { status: 401 });
      }
  
      await query(`DELETE FROM Events WHERE application_id = ?`, [application_id]);
      await query(`DELETE FROM Applications WHERE application_id = ?`, [application_id]);
  
      return NextResponse.json({ message: "Application deleted successfully" }, { status: 200 });
    } catch (error) {
      console.error("Error deleting application:", error);
      if (error instanceof AuthenticationError) {
        return NextResponse.json({ error: error.message }, { status: error.status });
      }
      return NextResponse.json({ error: `${error}` }, { status: 500 });
    }
  }