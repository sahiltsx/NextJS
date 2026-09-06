import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const client = new PrismaClient({ adapter });

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { email, password } = data;

  try {
    const user = await client.user.create({
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