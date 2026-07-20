import TechnologyBadge from "@/components/TechnologyBadge";

const coreTechnologies = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Flutter",
  "Dart",
  "Python",
  "Flask",
  "Firebase",
  "GitHub",
];

export default function TechnologyShowcase() {
  return (
    <section className="technology-showcase" aria-label="Core technology stack">
      <header className="technology-showcase__header" aria-hidden="true">
        <div className="technology-showcase__title technology-showcase__title--matrix">
          <span className="technology-showcase__keyword">const</span>
          <span> stack = [</span>
        </div>

        <div className="technology-showcase__title technology-showcase__title--cyan">
          <span className="technology-showcase__cyan-title">CORE STACK</span>
          <span className="technology-showcase__cyan-meta">
            {coreTechnologies.length.toString().padStart(2, "0")} modules online
          </span>
        </div>

        <div className="technology-showcase__title technology-showcase__title--purple">
          <span className="technology-showcase__purple-title">Creative Constellation</span>
          <span className="technology-showcase__purple-meta">tools that shape every build</span>
        </div>

        <div className="technology-showcase__title technology-showcase__title--ember">
          <span className="technology-showcase__ember-code">TOOLCHAIN_MANIFEST</span>
          <span className="technology-showcase__ember-meta">BUILD UNIT 01</span>
        </div>

        <div className="technology-showcase__title technology-showcase__title--red">
          <span className="technology-showcase__red-code">CRIMSON_STACK</span>
          <span className="technology-showcase__red-meta">SECURE BUILD MATRIX</span>
        </div>
      </header>

      <div className="technology-showcase__modules" role="list">
        {coreTechnologies.map((technology, index) => (
          <div
            key={technology}
            className={`technology-showcase__module technology-showcase__module--${(index % 5) + 1}`}
            role="listitem"
          >
            <span className="technology-showcase__index" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>

            <TechnologyBadge
              name={technology}
              iconOnly
              className="technology-showcase__badge"
            />

            <span className="technology-showcase__name">{technology}</span>
            <span className="technology-showcase__status" aria-hidden="true" />
          </div>
        ))}
      </div>

      <footer className="technology-showcase__footer" aria-hidden="true">
        <span className="technology-showcase__footer-copy technology-showcase__footer-copy--matrix">
          ];
        </span>
        <span className="technology-showcase__footer-copy technology-showcase__footer-copy--cyan">
          SYSTEM SYNC · 100%
        </span>
        <span className="technology-showcase__footer-copy technology-showcase__footer-copy--purple">
          imagine · design · develop · evolve
        </span>
        <span className="technology-showcase__footer-copy technology-showcase__footer-copy--ember">
          STATUS: READY FOR DEPLOYMENT
        </span>
        <span className="technology-showcase__footer-copy technology-showcase__footer-copy--red">
          SYSTEM STATUS: CRIMSON ONLINE
        </span>
      </footer>
    </section>
  );
}
