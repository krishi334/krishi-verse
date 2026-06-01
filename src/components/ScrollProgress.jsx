export function ScrollProgress({ progress }) {
  return (
    <div className="scroll-progress" aria-hidden="true">
      <div className="scroll-progress__track">
        <div className="scroll-progress__fill" style={{ transform: `scaleY(${progress})` }} />
      </div>
    </div>
  );
}
