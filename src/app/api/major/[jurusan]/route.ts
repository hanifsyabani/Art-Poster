import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { jurusan: string } }
) {
  try {
    const res = await prisma.naskah.findMany({
      where: {
        user: {
          afiliasi: params.jurusan,
        },
      },
    });

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
