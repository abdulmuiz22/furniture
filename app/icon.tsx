import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: "7px",
        }}
      >
        <img
          src={`data:image/png;base64,${markBase64}`}
          alt="Icon"
          style={{ width: "24px", height: "24px", objectFit: "contain" }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}

