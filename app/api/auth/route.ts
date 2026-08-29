import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const serverPassword = process.env.ADMIN_PASSWORD || "admin123";

    if (!password || password !== serverPassword) {
      return NextResponse.json(
        { success: false, error: "Invalid admin passcode" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Admin authentication successful",
      token: "adm_" + Buffer.from(Date.now().toString()).toString("base64"),
    });
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json(
      { success: false, error: "Authentication failed" },
      { status: 500 }
    );
  }
}
