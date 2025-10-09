// app/api/auth/route.ts
import { NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import nunjucks from "nunjucks";

nunjucks.configure({ autoescape: true });

function getAlgorithm(token: string): string | null {
  try {
    const header = JSON.parse(Buffer.from(token.split(".")[0], "base64").toString("utf8"));
    return header.alg || null;
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  const prisma = new PrismaClient();
  try {
    const body = (await request.json().catch(() => ({}))) as any;
    const token = (body?.token as string | undefined) ?? "";
    const mode = (body?.mode as "VULN" | "SAFE" | undefined) ?? "SAFE";

    if (!token) {
      return NextResponse.json({ message: "no token provided" }, { status: 400 });
    }

    const alg = getAlgorithm(token);
    if (!alg) {
      return NextResponse.json({ message: "invalid token header" }, { status: 400 });
    }

    let payload: JwtPayload | null = null;
    try {
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
    } catch (verr: any) {
      return NextResponse.json({ message: `JWT verification failed: ${verr?.message ?? String(verr)}` }, { status: 401 });
    }

    // Determine user id from token payload (adapt if your payload uses a different field)
    const userId = (payload as any)?.user_id ?? (payload as any)?.sub ?? null;
    if (!userId) {
      return NextResponse.json({ message: "token missing user id" }, { status: 400 });
    }

    // Fetch user. Keep it simple and typed; cast to any for flexible field access.
    const userInformation = (await prisma.user.findUnique({
      where: { id: userId },
    })) as any | null;

    // Build username from a few possible fields in a tolerant way
    const username =
      (userInformation?.user_profile && Array.isArray(userInformation.user_profile) && userInformation.user_profile[0]?.student_name) ||
      userInformation?.full_name ||
      userInformation?.username ||
      "Student";

    // Render HTML: VULN or SAFE pattern
    let renderedHtml = "";
    const vulnAllowed = process.env.ENABLE_VULN === "true";

    if (mode === "VULN" && vulnAllowed) {
      // LAB ONLY: intentionally vulnerable — username is inserted into template source
      const tpl = `<div>Hi, ${username} — welcome back!</div>`;
      try {
        // pass empty context object to satisfy typings
        renderedHtml = nunjucks.renderString(tpl, {});
      } catch (err: any) {
        renderedHtml = `<pre>Template render error: ${String(err?.message ?? err)}</pre>`;
      }
    } else {
      // SAFE: developer template, username passed as data (user cannot change template logic)
      const safeTpl = `<div>Hi, {{ name }} — welcome back!</div>`;
      try {
        renderedHtml = nunjucks.renderString(safeTpl, { name: username });
      } catch (err: any) {
        renderedHtml = `<pre>Template render error: ${String(err?.message ?? err)}</pre>`;
      }
    }

    // Compose response
    const resp = {
      user_profile: userInformation?.user_profile ?? null,
      decoded: payload,
      rendered: renderedHtml,
    };

    return NextResponse.json(resp, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ message: err?.message ?? String(err) }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
