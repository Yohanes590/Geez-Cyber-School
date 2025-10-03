import { NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

// Helper to extract the algorithm from the JWT header
function getAlgorithm(token: string): string | null {
  try {
    const header = JSON.parse(
      Buffer.from(token.split(".")[0], "base64").toString("utf8")
    );
    return header.alg || null;
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  const prisma = new PrismaClient();
  const { token } = await request.json();

  if (!token) {
    return NextResponse.json({ message: "no token provided" }, { status: 400 });
  }

  const alg = getAlgorithm(token);

  try {
    let payload: JwtPayload | null = null;

    if (alg === "RS256") {
      const publicKey = process.env.PUBLIC_KEY?.replace(/\\n/g, "\n");
      if (!publicKey) {
        return NextResponse.json({ message: "missing PUBLIC_KEY" }, { status: 500 });
      }
      payload = jwt.verify(token, publicKey, { algorithms: ["RS256"] }) as JwtPayload;
    } else if (alg === "HS256") {
      const secret = process.env.JWT_SECRET;
      if (!secret) {
        return NextResponse.json({ message: "missing JWT_SECRET" }, { status: 500 });
      }
      payload = jwt.verify(token, secret, { algorithms: ["HS256"] }) as JwtPayload;
    } else {
      return NextResponse.json({ message: `Unsupported algorithm: ${alg}` }, { status: 400 });
    }

    // Fetch user data from DB using the verified payload
    const userInformation = await prisma.user.findUnique({
      where: { id: payload.user_id },
    });

    return NextResponse.json({
      user_profile: userInformation?.user_profile,
      decoded: payload,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 401 });
  }
}
