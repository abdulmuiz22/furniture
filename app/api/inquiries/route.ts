import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Inquiry from "@/models/Inquiry";

export const dynamic = "force-dynamic";

interface LocalInquiry {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  productName?: string;
  productId?: string;
  message: string;
  status: "new" | "contacted" | "completed";
  createdAt: string;
}

// In-memory fallback store when MongoDB is connecting / offline
let inMemoryInquiries: LocalInquiry[] = [
  {
    _id: "inq_demo_1",
    name: "Amaka Adeleke",
    email: "amaka.adeleke@example.com",
    phone: "+234 803 456 7890",
    productName: "Luna Fabric Sofa",
    message: "Hello, I am interested in customizing the Luna Fabric Sofa in a dark emerald velvet finish. What is the lead time for Lagos delivery?",
    status: "new",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "inq_demo_2",
    name: "Babajide Williams",
    email: "b.williams@archdesign.ng",
    phone: "+234 802 111 2233",
    productName: "Milano Dining Table",
    message: "We are outfitting a private residence in Ikoyi and would like a consultation for the Milano Dining Table with 8 matching chairs.",
    status: "contacted",
    createdAt: new Date().toISOString(),
  },
];

export async function GET() {
  try {
    await connectToDatabase();
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, count: inquiries.length, data: inquiries });
  } catch (error) {
    console.warn("MongoDB unavailable for inquiries GET, using memory cache:", error);
    return NextResponse.json({
      success: true,
      count: inMemoryInquiries.length,
      data: inMemoryInquiries,
      isFallback: true,
    });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, productName, productId, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Please provide your name, email, and message." },
        { status: 400 }
      );
    }

    try {
      await connectToDatabase();
      const newInquiry = await Inquiry.create({
        name,
        email,
        phone: phone || "",
        productName: productName || "General Showroom Inquiry",
        productId: productId || "",
        message,
        status: "new",
      });

      return NextResponse.json(
        {
          success: true,
          message: "Your inquiry has been received. Our concierge team will contact you shortly!",
          data: newInquiry,
        },
        { status: 201 }
      );
    } catch (dbError) {
      console.warn("MongoDB write failed, storing inquiry in memory fallback:", dbError);
      const fallbackInquiry: LocalInquiry = {
        _id: "inq_" + Date.now(),
        name,
        email,
        phone: phone || "",
        productName: productName || "General Showroom Inquiry",
        productId: productId || "",
        message,
        status: "new",
        createdAt: new Date().toISOString(),
      };
      inMemoryInquiries.unshift(fallbackInquiry);

      return NextResponse.json(
        {
          success: true,
          message: "Your inquiry has been received. Our concierge team will contact you shortly!",
          data: fallbackInquiry,
          isFallback: true,
        },
        { status: 201 }
      );
    }
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Failed to submit inquiry";
    console.error("Error saving inquiry:", error);
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: "Inquiry id and status are required." },
        { status: 400 }
      );
    }

    try {
      await connectToDatabase();
      const updated = await Inquiry.findByIdAndUpdate(id, { status }, { new: true });
      if (!updated) {
        return NextResponse.json({ success: false, error: "Inquiry not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true, data: updated });
    } catch {
      // Memory fallback update
      const inq = inMemoryInquiries.find((i) => i._id === id);
      if (inq) {
        inq.status = status;
        return NextResponse.json({ success: true, data: inq, isFallback: true });
      }
      return NextResponse.json({ success: false, error: "Inquiry not found" }, { status: 404 });
    }
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Failed to update inquiry";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Inquiry id is required" },
        { status: 400 }
      );
    }

    try {
      await connectToDatabase();
      await Inquiry.findByIdAndDelete(id);
      return NextResponse.json({ success: true, message: "Inquiry deleted successfully" });
    } catch {
      inMemoryInquiries = inMemoryInquiries.filter((i) => i._id !== id);
      return NextResponse.json({ success: true, message: "Inquiry deleted successfully (memory)" });
    }
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Failed to delete inquiry";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
