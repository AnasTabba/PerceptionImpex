"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { useInView } from "@/lib/useInView";
import { WORLD_VIEWBOX, WORLD_PATH } from "@/lib/worldmap";

// Equirectangular projection matching the generated map:
// scale = 1000 / (2π), translate = [500, 250].
const SCALE = 1000 / (2 * Math.PI);
const project = (lon: number, lat: number): [number, number] => {
  const x = SCALE * (lon * (Math.PI / 180)) + 500;
  const y = 250 - SCALE * (lat * (Math.PI / 180));
  return [Math.round(x * 10) / 10, Math.round(y * 10) / 10];
};

const ORIGIN = { name: "Pakistan", lon: 67.0, lat: 24.9 };
const DESTINATIONS = [
  { name: "United Kingdom", lon: -0.13, lat: 51.5 },
  { name: "United States", lon: -98, lat: 39.5 },
  { name: "Canada", lon: -100, lat: 53 },
];

const [ox, oy] = project(ORIGIN.lon, ORIGIN.lat);

// Quadratic arc from origin to destination, bowed upward.
function arcPath(dx: number, dy: number) {
  const mx = (ox + dx) / 2;
  const my = (oy + dy) / 2;
  const dist = Math.hypot(dx - ox, dy - oy);
  const lift = Math.min(dist * 0.32, 90);
  const cx = mx;
  const cy = my - lift;
  return `M ${ox} ${oy} Q ${cx} ${cy} ${dx} ${dy}`;
}

export function GlobalReach() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 });

  return (
    <section id="global" className="scroll-mt-24 bg-ink py-20 text-white sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Global Reach"
          title={<span className="text-white">Sourced in Pakistan, supplied worldwide</span>}
          description="From our mill network in Pakistan, we supply manufacturers and exporters across international markets — including the United States, Canada, and the United Kingdom."
          align="center"
          className="[&_p]:text-white/70"
        />

        <div ref={ref} className="relative mx-auto mt-14 max-w-4xl">
          <svg
            viewBox={WORLD_VIEWBOX}
            className="h-auto w-full"
            role="img"
            aria-label="World map showing yarn supplied from Pakistan to the United States, Canada, and the United Kingdom"
          >
            {/* Landmasses */}
            <path d={WORLD_PATH} fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.10)" strokeWidth={0.5} />

            {/* Arcs origin → destinations */}
            {DESTINATIONS.map((d, i) => {
              const [dx, dy] = project(d.lon, d.lat);
              return (
                <path
                  key={d.name}
                  d={arcPath(dx, dy)}
                  fill="none"
                  stroke="#2C8A7D"
                  strokeWidth={1.6}
                  strokeLinecap="round"
                  pathLength={1}
                  style={{
                    strokeDasharray: 1,
                    strokeDashoffset: inView ? 0 : 1,
                    transition: "stroke-dashoffset 1.3s ease-out",
                    transitionDelay: `${0.2 + i * 0.35}s`,
                  }}
                />
              );
            })}

            {/* Destination markers */}
            {DESTINATIONS.map((d, i) => {
              const [dx, dy] = project(d.lon, d.lat);
              return (
                <g key={d.name} style={{ opacity: inView ? 1 : 0, transition: "opacity 0.4s ease-out", transitionDelay: `${0.9 + i * 0.35}s` }}>
                  <circle cx={dx} cy={dy} r={6} fill="none" stroke="#57A79C" strokeWidth={1.5} className="origin-center animate-pulse-ring [transform-box:fill-box]" style={{ transformOrigin: `${dx}px ${dy}px` }} />
                  <circle cx={dx} cy={dy} r={3.2} fill="#57A79C" />
                  <circle cx={dx} cy={dy} r={1.4} fill="#fff" />
                </g>
              );
            })}

            {/* Origin marker (Pakistan) */}
            <g>
              <circle cx={ox} cy={oy} r={7} fill="none" stroke="#F6F4EF" strokeWidth={1.5} className="animate-pulse-ring" style={{ transformOrigin: `${ox}px ${oy}px` }} />
              <circle cx={ox} cy={oy} r={4} fill="#F6F4EF" />
              <circle cx={ox} cy={oy} r={1.8} fill="#0F766E" />
            </g>
          </svg>

          {/* Legend */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm">
            <span className="inline-flex items-center gap-2 text-white/80">
              <span className="h-2.5 w-2.5 rounded-full bg-canvas" /> {ORIGIN.name} — sourcing origin
            </span>
            <span className="inline-flex items-center gap-2 text-white/80">
              <span className="h-2.5 w-2.5 rounded-full bg-teal-300" /> Export destinations
            </span>
          </div>
        </div>

        {/* Destination chips */}
        <Reveal delay={120} className="mt-10 flex flex-wrap justify-center gap-3">
          {[ORIGIN, ...DESTINATIONS].map((m) => (
            <span
              key={m.name}
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white/90"
            >
              {m.name}
            </span>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
