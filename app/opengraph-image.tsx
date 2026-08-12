import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Susie Sculpts — Private body reset and wellness support in Gilbert, Arizona";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "linear-gradient(135deg, #fbf7f2 0%, #f2e9df 55%, #eee5f5 100%)",
          color: "#2c1f14",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 54, color: "#714aa2", letterSpacing: "-1px" }}>Susie Sculpts</div>
          <div style={{ marginTop: 8, fontSize: 20, color: "#b08c4e", letterSpacing: "5px", textTransform: "uppercase" }}>
            Empowered Transformations
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 980 }}>
          <div style={{ fontSize: 70, lineHeight: 1.02, fontWeight: 400 }}>
            Feel lighter, stronger, and more like yourself again.
          </div>
          <div style={{ marginTop: 26, fontSize: 29, lineHeight: 1.3, color: "#675a52", fontFamily: "sans-serif" }}>
            Private body reset, lymphatic, PEMF, and sculpting support for women in Gilbert and the East Valley.
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "sans-serif" }}>
          <div style={{ fontSize: 22, color: "#714aa2", fontWeight: 600 }}>Free. Private. No Pressure.</div>
          <div style={{ fontSize: 20, color: "#7c6d64" }}>susiesculpts.com</div>
        </div>
      </div>
    ),
    size,
  );
}
