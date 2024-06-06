import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { getSession } from "next-auth/react";

export async function POST(req: Request) {
  try {
    const {
      firstName,
      lastName,
      afiliasi,
      country,
      email,
      userName,
      password,
      confPassword,
    } = await req.json();

    const validationEmail = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (validationEmail)
      return NextResponse.json(
        { message: "email already exists" },
        { status: 500 }
      );

    if (password !== confPassword) {
      return NextResponse.json(
        { message: "password is incorrect" },
        { status: 400 }
      );
    }

    const passHash = await bcrypt.hash(password, 10);

    // if(!role){
    //   role  ="member"
    // }
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        afiliasi,
        country,
        email,
        userName,
        password: passHash,
      },
    });

    return NextResponse.json({ status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}


