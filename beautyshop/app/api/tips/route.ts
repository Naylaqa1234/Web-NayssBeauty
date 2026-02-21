import { NextResponse } from "next/server";
import { beautyTips } from "@/lib/tips-data";

// SSG-like API - fully static
export const dynamic = "force-static";

export async function GET() {
  return NextResponse.json({
    tips: beautyTips,
    total: beautyTips.length,
    cached: true,
  });
}
