import { NextResponse } from "next/server";
import { getProfileData } from "@/lib/profile";

export const runtime = "nodejs";

export async function GET() {
  const data = await getProfileData();
  return NextResponse.json(data);
}