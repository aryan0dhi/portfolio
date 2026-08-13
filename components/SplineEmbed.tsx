"use client";

interface SplineEmbedProps {
  url: string;
  title?: string;
  className?: string;
  height?: string;
  width?: string;
}

export default function SplineEmbed({
  url,
  title = "3D Scene",
  className = "",
  height = "600px",
  width = "100%",
}: SplineEmbedProps) {
  return (
    <div className={className}>
      <iframe
        title={title}
        src={url}
        style={{
          height,
          width,
          border: "none",
          borderRadius: "0.5rem",
        }}
        allowFullScreen
      />
    </div>
  );
}
