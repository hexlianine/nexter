import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

const ALLOWED_EXT = [".ts", ".tsx", ".js", ".jsx", ".css", ".json", ".md"];

export async function GET(request: NextRequest) {
  const pathParam = request.nextUrl.searchParams.get("path");
  if (!pathParam || typeof pathParam !== "string") {
    return NextResponse.json(
      { error: "Missing path parameter" },
      { status: 400 }
    );
  }

  // Prevent path traversal
  const normalized = pathParam.replace(/^(\.\.(\/|\\|$))+/, "");
  if (normalized.includes("..")) {
    return NextResponse.json({ error: "Invalid path" }, { status: 400 });
  }

  const ext = path.extname(normalized).toLowerCase();
  if (!ALLOWED_EXT.includes(ext)) {
    return NextResponse.json(
      { error: "File type not allowed for preview" },
      { status: 400 }
    );
  }

  const projectRoot = process.cwd();
  const fullPath = path.resolve(projectRoot, normalized);

  // Ensure resolved path stays within project
  const relative = path.relative(projectRoot, fullPath);
  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    return NextResponse.json({ error: "Invalid path" }, { status: 400 });
  }

  try {
    const content = await readFile(fullPath, "utf-8");
    return NextResponse.json({ content, path: normalized });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to read file";
    return NextResponse.json({ error: message }, { status: 404 });
  }
}
