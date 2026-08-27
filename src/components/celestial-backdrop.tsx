type StarPoint = { x: number; y: number; size?: number };
type StarLink = [number, number];

const CONSTELLATIONS: Record<string, { stars: StarPoint[]; links: StarLink[] }> = {
  cassiopeia: {
    stars: [
      { x: 4, y: 62, size: 7 }, { x: 25, y: 27 }, { x: 49, y: 57, size: 8 },
      { x: 72, y: 20 }, { x: 96, y: 51, size: 7 },
    ],
    links: [[0, 1], [1, 2], [2, 3], [3, 4]],
  },
  orion: {
    stars: [
      { x: 18, y: 13, size: 8 }, { x: 78, y: 18, size: 7 },
      { x: 31, y: 45 }, { x: 49, y: 43, size: 7 }, { x: 67, y: 41 },
      { x: 79, y: 84, size: 8 }, { x: 19, y: 80, size: 7 },
    ],
    links: [[0, 2], [1, 4], [2, 3], [3, 4], [2, 6], [4, 5], [5, 6]],
  },
  aries: {
    stars: [
      { x: 12, y: 73, size: 5 },
      { x: 18, y: 62, size: 7 },
      { x: 48, y: 45, size: 10 },
      { x: 87, y: 27, size: 6 },
    ],
    links: [[0, 1], [1, 2], [2, 3]],
  },
  lyra: {
    stars: [
      { x: 14, y: 24, size: 4 },
      { x: 42, y: 8, size: 9 },
      { x: 67, y: 39, size: 5 },
      { x: 48, y: 72, size: 7 },
      { x: 22, y: 61, size: 3 },
    ],
    links: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0], [0, 2]],
  },
  cygnus: {
    stars: [
      { x: 7, y: 51, size: 4 },
      { x: 34, y: 48, size: 7 },
      { x: 58, y: 45, size: 10 },
      { x: 91, y: 38, size: 5 },
      { x: 53, y: 10, size: 4 },
      { x: 64, y: 87, size: 8 },
    ],
    links: [[0, 1], [1, 2], [2, 3], [2, 4], [2, 5]],
  },
};

// A seeded layout keeps the sky organic while preventing stars from moving on re-renders.
function createSeededRandom(seed: number) {
  let value = seed;
  return () => {
    value = (value * 1664525 + 1013904223) % 4294967296;
    return value / 4294967296;
  };
}

const random = createSeededRandom(25081998);
const SKY_STARS = Array.from({ length: 64 }, () => ({
  x: random() * 100,
  y: random() * 100,
  size: 1.25 + random() * 3.25,
  delay: random() * -6,
  duration: 3.25 + random() * 4.5,
}));

function Constellation({ name, className }: { name: keyof typeof CONSTELLATIONS; className: string }) {
  const constellation = CONSTELLATIONS[name];
  return (
    <div className={`constellation ${className}`}>
      <span className="constellation-label">{name}</span>
      {constellation.links.map(([fromIndex, toIndex]) => {
        const from = constellation.stars[fromIndex];
        const to = constellation.stars[toIndex];
        const deltaX = to.x - from.x;
        const deltaY = to.y - from.y;
        return (
          <b
            key={`${fromIndex}-${toIndex}`}
            className="constellation-line"
            style={{
              left: `${from.x}%`,
              top: `${from.y}%`,
              width: `${Math.hypot(deltaX, deltaY)}%`,
              transform: `rotate(${Math.atan2(deltaY, deltaX) * 180 / Math.PI}deg)`,
            }}
          />
        );
      })}
      {constellation.stars.map((star, index) => (
        <i
          key={`${star.x}-${star.y}`}
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size ?? 6}px`,
            height: `${star.size ?? 6}px`,
            animationDelay: `${index * -0.7}s`,
            animationDuration: `${3.4 + ((index + name.length) % 5) * 0.65}s`,
          }}
        />
      ))}
    </div>
  );
}

export function CelestialBackdrop() {
  return (
    <div className="celestial-2d" aria-hidden>
      <div className="sky-stars">
        {SKY_STARS.map((star, index) => (
          <span
            key={index}
            className="sky-star"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
            }}
          />
        ))}
      </div>
      <div className="sky-shooting-stars">
        <span className="sky-shooting-star sky-shooting-star-one" />
        <span className="sky-shooting-star sky-shooting-star-two" />
        <span className="sky-shooting-star sky-shooting-star-three" />
      </div>

      <div className="sun-illustration"><span /><span /><span /></div>
      <div className="planet-illustration planet-blue"><span /><span /></div>
      <div className="planet-illustration planet-gold"><span /><span /></div>

      <Constellation name="cassiopeia" className="constellation-cassiopeia" />
      <Constellation name="orion" className="constellation-orion" />
      <Constellation name="aries" className="constellation-aries" />
      <Constellation name="lyra" className="constellation-lyra" />
      <Constellation name="cygnus" className="constellation-cygnus" />

      <div className="rose-illustration">
        <div className="rose-glow" />
        <img
          className="rose-art"
          src="/assets/images/background-rose.png"
          alt=""
          decoding="async"
          draggable={false}
        />
        <div className="rose-planet"><i /><i /><i /></div>
      </div>

    </div>
  );
}
