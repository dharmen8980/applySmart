import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { AuthenticationError, verifySession } from "@/lib/verifySession";

export async function GET(request: NextRequest) {
  try {
    const session = await verifySession();
    const email = session?.user?.email;

    if (!email) {
      return NextResponse.json({ error: "User email not found in session" }, { status: 401 });
    }

    const statusFilter = request.nextUrl.searchParams.get("statusFilter");
    const searchQuery = request.nextUrl.searchParams.get("searchQuery");
    const pageParam = request.nextUrl.searchParams.get("page");
    const limitParam = request.nextUrl.searchParams.get("limit");

    // Default values
    const page = pageParam ? parseInt(pageParam, 10) : 1;
    const limit = limitParam ? parseInt(limitParam, 10) : 5;
    const offset = (page - 1) * limit;

    // Base SQL query
    let sql = "SELECT * FROM Applications WHERE email = ?";
    let params: string[] = [email];

    // Apply status filter if provided
    if (statusFilter) {
      sql += " AND status = ?";
      params.push(statusFilter);
    }

    // Apply search query if provided
    if (searchQuery) {
      sql += ` AND (
        institution_name LIKE ? OR 
        location LIKE ? OR 
        role_program LIKE ? OR 
        hr_email LIKE ? OR 
        application_link LIKE ? OR 
        notes LIKE ?
      )`;
      const searchPattern = `%${searchQuery}%`;
      params.push(searchPattern, searchPattern, searchPattern, searchPattern, searchPattern, searchPattern);
    }

    // Clone the SQL for counting total records
    const countSql =
      `SELECT COUNT(*) as total FROM Applications WHERE email = ?` +
      (statusFilter ? " AND status = ?" : "") +
      (searchQuery
        ? ` AND (
          institution_name LIKE ? OR 
          location LIKE ? OR 
          role_program LIKE ? OR 
          hr_email LIKE ? OR 
          application_link LIKE ? OR 
          notes LIKE ?
        )`
        : "");

    const countParams = [...params]; // Clone current params for count query

    // Append LIMIT and OFFSET for pagination
    sql += ` LIMIT ? OFFSET ?`;
    params.push(limit.toString(), offset.toString());

    // Execute both queries in parallel
    const [rows, countResult] = await Promise.all([query(sql, params), query(countSql, countParams)]);

    const total = (countResult as RowDataPacket[])[0].total;
    const totalPages = Math.ceil(total / limit);

    if ((rows as RowDataPacket[]).length === 0) {
      return NextResponse.json({ message: "No applications found" }, { status: 200 });
    }

    return NextResponse.json({
      data: rows,
      pagination: {
        total,
        page,
        limit,
        totalPages,
      },
    });
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
    const email = session.user?.email;

    // If the email is missing, respond with an error
    if (!email) {
      return NextResponse.json({ error: "User email not found in session" }, { status: 401 });
    }

    const { application_type, institution_name, location, role_program, application_link, next_event_date, status, notes } =
      await request.json();

    if (!institution_name || !location || !role_program) {
      return NextResponse.json({ error: "Please provide all required fields" }, { status: 400 });
    }

    const currentDate = new Date().toISOString().slice(0, 19).replace("T", " ");
    console.log(
      email,
      application_type,
      institution_name,
      location,
      role_program,
      application_link,
      application_link,
      status,
      notes,
      currentDate
    );
    const result = (await query(
      `INSERT INTO Applications (
          email, 
          application_type,
          institution_name, 
          location, 
          role_program, 
          application_link, 
          status, 
          notes, 
          created_at, 
          updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        email,
        application_type,
        institution_name,
        location,
        role_program,
        application_link,
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
