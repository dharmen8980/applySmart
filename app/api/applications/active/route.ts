import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { AuthenticationError, verifySession } from "@/lib/verifySession";

export async function GET(request: NextRequest) {
  try {
    const session = await verifySession();
    const email = session?.user?.email;
    
    const statusFilter = request.nextUrl.searchParams.get("statusFilter");
    const applicationFilter = request.nextUrl.searchParams.get("applicationFilter");

    let sql = "SELECT * FROM Applications";
    let params: string[] = [];

    if (email) {
      sql += " WHERE email = ?";
      params.push(email);
    }
    
    // filter applications by status, if applicable
    if (statusFilter) {
      sql += " AND status = ?";
      params.push(statusFilter);
    }

    // filter applications by search query, if applicable
    if (applicationFilter) {
      sql += ` AND (institution_name LIKE ? OR location LIKE ? OR role_program LIKE ? OR hr_email LIKE ? OR application_link LIKE ? OR notes LIKE ?)`;
      params.push(`%${applicationFilter}%`, `%${applicationFilter}%`, `%${applicationFilter}%`, `%${applicationFilter}%`, `%${applicationFilter}%`, `%${applicationFilter}%`);
    }

    const rows = (await query(sql, params)) as RowDataPacket[];

    if (rows.length === 0) {
      return NextResponse.json({ message: "No applications found" }, { status: 200 });
    }

    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching applications:", error);
    if (error instanceof AuthenticationError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await verifySession();
    const { email, company_university, location, role_program, hr_email, application_link, next_event_date, status, notes } =
      await request.json();

    if (!email || !company_university || !location || !role_program) {
      return NextResponse.json({ error: "Please provide all required fields" }, { status: 400 });
    }

    const currentDate = new Date().toISOString().slice(0, 19).replace("T", " ");

    const result = (await query(
      `INSERT INTO Applications (
        email, 
        company_university, 
        location, 
        role_program, 
        hr_email, 
        application_link, 
        next_event_date, 
        status, 
        notes, 
        created_at, 
        updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        email,
        company_university,
        location,
        role_program,
        hr_email,
        application_link,
        next_event_date,
        status,
        notes,
        currentDate,
        currentDate,
      ]
    )) as ResultSetHeader;

    return NextResponse.json({ message: "Application added successfully", result }, { status: 201 });
  } catch (error) {
    console.error("Error adding application:", error);
    if (error instanceof AuthenticationError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    return NextResponse.json({ error: `${error}` }, { status: 500 });
  }
}
