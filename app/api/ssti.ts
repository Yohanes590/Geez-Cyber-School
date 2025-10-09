// pages/api/ssti.ts
import type { NextApiRequest, NextApiResponse } from "next";
import * as nunjucks from "nunjucks";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const template = (req.body?.template ?? "").toString();

  try {
    const rendered = nunjucks.renderString(template, {});
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    return res.status(200).send(rendered);
  } catch (err: any) {
    return res.status(400).json({ error: err?.message ?? "render error" });
  }
}
