import { NextResponse } from "next/server";
import * as nunjucks from "nunjucks";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const template = (body?.template ?? "").toString();

   
    const rendered = nunjucks.renderString(template, {});

    return new NextResponse(rendered, {
      status: 200,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? "render error" }, { status: 400 });
  }
}
