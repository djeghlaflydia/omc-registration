import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { registrationSchema } from "@/lib/validation";
import { z } from "zod";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();

    // Validate the data using Zod schema
    const validatedData = registrationSchema.parse(body);

    // Create Supabase client for this request
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        auth: {
          persistSession: false,
        },
      },
    );

    // Insert data into Supabase
    const { data, error } = await supabase
      .from("registrations")
      .insert([
        {
          first_name: validatedData.firstName,
          last_name: validatedData.lastName,
          student_id: validatedData.studentId,
          email: validatedData.email,
          phone: validatedData.phone,
          field_of_study: validatedData.fieldOfStudy,
          faculty: validatedData.faculty,
          academic_level: validatedData.academicLevel,
          selected_team: validatedData.selectedTeam,
          experience_level: validatedData.experienceLevel,
          motivation: validatedData.motivation,
          expectation: validatedData.expectation || null,
          portfolio: validatedData.portfolio || null,
          github: validatedData.github || null,
          created_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) {
      console.error("Supabase error:", error);

      // Check for unique constraint violations
      if (error.code === "23505") {
        return NextResponse.json(
          {
            success: false,
            error:
              "A registration with this email or student ID already exists.",
          },
          { status: 409 },
        );
      }

      return NextResponse.json(
        {
          success: false,
          error: "Failed to submit registration. Please try again.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Registration submitted successfully!",
        data: data[0],
      },
      { status: 201 },
    );
  } catch (error) {
    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          errors: error.issues.map((err: z.ZodIssue) => ({
            field: err.path.join("."),
            message: err.message,
          })),
        },
        { status: 400 },
      );
    }

    // Handle JSON parsing errors
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { success: false, error: "Invalid JSON format" },
        { status: 400 },
      );
    }

    // Handle unexpected errors
    console.error("Unexpected error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred. Please try again.",
      },
      { status: 500 },
    );
  }
}
