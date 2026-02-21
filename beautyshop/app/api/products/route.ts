import { NextResponse } from "next/server";

// SSR API route - runs on server
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get("limit") || "12";
  const skip = searchParams.get("skip") || "0";
  const category = searchParams.get("category") || "beauty";

  try {
    const url = `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`;
    const res = await fetch(url, {
      next: { revalidate: 3600 }, // ISR - cache for 1 hour
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
    }

    const data = await res.json();
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        "X-Rendering-Strategy": "SSR-with-ISR",
      },
    });
  } catch (err) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
