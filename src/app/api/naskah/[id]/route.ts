import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { getSession } from "next-auth/react";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await req.formData();
    const title = data.get("title") as string | null;
    const subTitle = data.get("subTitle") as string | null;
    const abstrak = data.get("abstrak") as string | null;
    const prefiks = data.get("prefiks") as string | null;
    const keyword = data.get("keyword") as string | null;
    const file = data.get("file") as File | null;

    if (!title || !subTitle || !abstrak || !prefiks || !keyword || !file) {
      return NextResponse.json(
        { message: "Please fill in all the fields" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const base64 = Buffer.from(bytes).toString("base64");

    // Decode base64 image data to binary buffer
    const imageBuffer = Buffer.from(base64, "base64");

    // Define file path and name for the PNG image
    const fileName = `${Date.now()}.png`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    const filePath = path.join(uploadDir, fileName);

    // Create the uploads directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Write the binary buffer to a PNG image file
    fs.writeFileSync(filePath, imageBuffer);
    const imageUrl = `/uploads/${fileName}`;

    // const user = await prisma.user.findMany({
    //   where:{
    //     afiliasi: 
    //   }
    // })

    const res = await prisma.naskah.create({
      data: {
        title: title,
        subTitle: subTitle,
        abstrak: abstrak,
        prefiks: prefiks,
        keywords: keyword,
        file: imageUrl,
        userId: Number(params.id),
      },
    });

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  // console.log(params.id);
  try {
    const naskah = await prisma.naskah.findMany({
      where: {
        userId: Number(params.id),
      },
    });
    if (!naskah)
      return NextResponse.json({ message: "Data not found" }, { status: 404 });

    return NextResponse.json(naskah, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
