"use client";

import { motion, useReducedMotion } from "motion/react";
import { LAT_SPAN, LAT_TOP, MAP_H, MAP_W, WORLD_DOTS } from "./worldDots";

// Координаты меток по списку GEO (тот же порядок). Для регионов Европы взяты условные центры.
const COORDS: [number, number][] = [
  [55.75, 37.6], // Россия
  [41.7, 44.8], // Грузия
  [35.1, 33.4], // Кипр
  [25.2, 55.3], // ОАЭ
  [32.1, 34.8], // Израиль
  [41.0, 29.0], // Турция
  [56.95, 24.1], // Латвия
  [40.7, -74.0], // США
  [50.8, 4.4], // Западная Европа
  [52.2, 21.0], // Восточная Европа
];
const HUB: [number, number] = [41.65, 41.64]; // Батуми

function project([lat, lon]: [number, number]) {
  return {
    x: ((lon + 180) / 360) * MAP_W,
    y: ((LAT_TOP - lat) / LAT_SPAN) * MAP_H,
  };
}

// Показываем только часть карты от США до ОАЭ: там все проекты, и метки не слипаются.
const VIEW = "140 8 580 196";

export function GlobalMap({
  geo,
  hubLabel,
}: {
  geo: string[];
  hubLabel: string;
}) {
  const reduce = useReducedMotion();
  const hub = project(HUB);

  return (
    <svg
      viewBox={VIEW}
      className="block h-auto w-full"
      role="img"
      aria-label={geo.join(", ")}
    >
      <path
        d={WORLD_DOTS}
        stroke="#b9b9f2"
        strokeWidth={2.2}
        strokeLinecap="round"
        fill="none"
      />

      {COORDS.map((c, i) => {
        const p = project(c);
        const mx = (p.x + hub.x) / 2;
        const my =
          Math.min(p.y, hub.y) - Math.max(30, Math.abs(p.x - hub.x) * 0.35);
        return (
          <motion.path
            key={`arc-${i}`}
            d={`M${hub.x} ${hub.y} Q${mx} ${my} ${p.x} ${p.y}`}
            fill="none"
            stroke="var(--d-blue)"
            strokeWidth={1.3}
            strokeLinecap="round"
            initial={reduce ? false : { pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.9 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 1.2,
              delay: 0.15 + i * 0.08,
              ease: [0.6, 0, 0.2, 1],
            }}
          />
        );
      })}

      {COORDS.map((c, i) => {
        const p = project(c);
        return (
          <circle
            key={`pin-${i}`}
            cx={p.x}
            cy={p.y}
            r={3.6}
            fill="var(--d-blue)"
          >
            <title>{geo[i]}</title>
          </circle>
        );
      })}

      <circle cx={hub.x} cy={hub.y} r={10} fill="var(--d-lime)" opacity={0.55}>
        {!reduce && (
          <animate
            attributeName="r"
            values="6;16;6"
            dur="2.4s"
            repeatCount="indefinite"
          />
        )}
      </circle>
      <circle
        cx={hub.x}
        cy={hub.y}
        r={5.5}
        fill="var(--d-lime)"
        stroke="var(--d-blue)"
        strokeWidth={2.2}
      />
      <text
        x={hub.x + 9}
        y={hub.y + 16}
        className="fill-[var(--d-blue)] text-[11px] font-bold"
      >
        {hubLabel}
      </text>
    </svg>
  );
}
