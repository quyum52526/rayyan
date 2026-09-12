import Image from "next/image";
import type { CSSProperties } from "react";

type Layer = {
  src: string;
  /** Left edge and width of the 1080px square canvas, as % of the stage width. */
  x: number;
  width: number;
  /** Baseline the product stands on, as % of the stage height. */
  floor: number;
  /** Where the product's opaque pixels end inside its canvas (0–1, measured), so it stands on `floor` rather than on its transparent margin. */
  bottom: number;
  row: "back" | "mid" | "front";
};

// Stand-up pouch pairs at the back, one pair in the middle, the big jars in front. Every canvas stays inside
// 0–100% of the stage width, so the scene never pushes the page wider on small screens.
const layers: Layer[] = [
  { src: "/rayyan-products/5.png", x: 0, width: 46, floor: 30, bottom: 0.883, row: "back" },
  { src: "/rayyan-products/6.png", x: 27, width: 46, floor: 32, bottom: 0.882, row: "back" },
  { src: "/rayyan-products/8.png", x: 54, width: 46, floor: 30, bottom: 0.855, row: "back" },
  { src: "/rayyan-products/7.png", x: 17, width: 40, floor: 12, bottom: 0.875, row: "mid" },
  { src: "/rayyan-products/1.png", x: 0, width: 34, floor: 2, bottom: 0.951, row: "front" },
  { src: "/rayyan-products/2.png", x: 41, width: 34, floor: 3, bottom: 0.934, row: "front" },
  { src: "/rayyan-products/4.png", x: 62, width: 34, floor: 1, bottom: 0.95, row: "front" },
];

type StoryCollageProps = { label: string; badgeNumber: string; badgeText: string };

/** The "Why RAYYAN" scene: transparent product cut-outs layered for depth, straight on the section background. */
export default function StoryCollage({ label, badgeNumber, badgeText }: StoryCollageProps) {
  return (
    <div className="story-collage">
      <div className="story-collage-stage" role="img" aria-label={label}>
        <span className="story-collage-floor" />
        {layers.map((layer) => (
          <span
            className={`story-collage-item is-${layer.row}`}
            style={{ "--x": `${layer.x}%`, "--w": `${layer.width}%`, "--floor": `${layer.floor}%`, "--b": layer.bottom } as CSSProperties}
            key={layer.src}
          >
            <Image src={layer.src} width={1080} height={1080} alt="" sizes="(max-width: 620px) 46vw, 260px" />
          </span>
        ))}
      </div>
      <div className="story-badge"><strong>{badgeNumber}</strong><span>{badgeText}</span></div>
    </div>
  );
}
