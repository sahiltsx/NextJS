import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/db"

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { email, password } = data;

  try {
    const user = await prisma.user.create({
      data: {
        email: email,
        password: password
      }
    });

    return NextResponse.json({
      message: "User Signup successfully",
      user
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong", error: String(error) },
      { status: 500 }
    );
  }
}