import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  const markPath = path.join(process.cwd(), "public", "logo-mark.png");
  const markBase64 = fs.readFileSync(markPath).toString("base64");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#18181b",
          borderRadius: "36px",
        }}
      >
        <img
          src={`data:image/png;base64,${markBase64}`}
          alt="Apple Icon"
          style={{ width: "135px", height: "135px", objectFit: "contain" }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}

