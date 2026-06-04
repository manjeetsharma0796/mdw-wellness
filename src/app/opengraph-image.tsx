import { ImageResponse } from "next/og";

export const alt = "MDW Wellness — Home Physiotherapy & Wellness in Kolkata";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Branded social share card. Solid brand-blue field (no gradients, per brand),
// white wordmark + tagline, generated at build time.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#018bc4",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: 30,
            fontWeight: 600,
            opacity: 0.92,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: 16,
              backgroundColor: "#ffffff",
              color: "#018bc4",
              fontSize: 30,
              fontWeight: 800,
            }}
          >
            m
          </div>
          MDW Wellness
        </div>

        <div
          style={{
            marginTop: 40,
            fontSize: 76,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            maxWidth: 900,
          }}
        >
          Home Physiotherapy & Wellness in Kolkata
        </div>

        <div
          style={{
            marginTop: 28,
            fontSize: 32,
            opacity: 0.9,
            maxWidth: 820,
          }}
        >
          Online consultations, home therapy, and home wellness vitals checks.
        </div>
      </div>
    ),
    { ...size },
  );
}
