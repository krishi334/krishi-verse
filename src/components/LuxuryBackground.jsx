export function LuxuryBackground({ progress = 0 }) {
  const drift = `${progress * 100}%`;

  return (
    <div
      className="luxury-background"
      aria-hidden="true"
      style={{
        "--drift": drift,
      }}
    >
      <div className="mesh mesh-one" />
      <div className="mesh mesh-two" />
      <div className="mesh mesh-three" />
      <div className="grain" />
      <div className="spotlight spotlight-left" />
      <div className="spotlight spotlight-right" />
      <div className="world-vignette" />
    </div>
  );
}
