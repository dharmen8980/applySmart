import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const email = searchParams.get("email");

    let sql = "SELECT * FROM Applications";
    let params: string[] = [];

    if (email) {
      sql += " WHERE email = ?";
      params.push(email);
    }

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

export async function POST(request: NextRequest) {
  try {
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
    return NextResponse.json({ error: `${error}` }, { status: 500 });
  }
}
