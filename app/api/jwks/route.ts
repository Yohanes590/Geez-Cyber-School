import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";


export async function GET() {
try {
const jwksPath = path.join(process.cwd(), "public", "jwks.json");


if (!fs.existsSync(jwksPath)) {
return NextResponse.json({ message: "jwks.json not found" }, { status: 500 });
}


const jwks = JSON.parse(fs.readFileSync(jwksPath, "utf8"));
return NextResponse.json(jwks);
} catch (err: any) {
return NextResponse.json({ message: err?.message || "unknown error" }, { status: 500 });
}
}