export function CameraMark({
  className = "",
  size = 44,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      className={`camera-mark ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M9 19h12l5-7h13l5 7h11a4 4 0 0 1 4 4v27a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V23a4 4 0 0 1 4-4Z"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <path
        d="M10 15h9M48 25h5"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <g className="camera-lens">
        <circle
          cx="32"
          cy="36"
          r="13"
          stroke="currentColor"
          strokeWidth="2.2"
        />
        <circle
          cx="32"
          cy="36"
          r="8.5"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <path
          d="m32 28 6 8-6 8-6-8 6-8Z"
          stroke="currentColor"
          strokeWidth="1.2"
        />
      </g>
    </svg>
  );
}
export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <span className="brand-lockup">
      <CameraMark />
      <span className="brand-type">
        AUREL FRAME{!compact && <small>PHOTOGRAPHY & CINEMA</small>}
      </span>
    </span>
  );
}
