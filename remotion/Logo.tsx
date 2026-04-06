import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

export const Logo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Bubble scales in with spring
  const bubbleScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 80 },
  });

  // "?!" fades in and slides up
  const textOpacity = interpolate(frame, [10, 25], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const textY = interpolate(frame, [10, 25], [12, 0], {
    extrapolateRight: 'clamp',
  });

  // Subtle pulse on the bubble after landing
  const pulse = frame > 30
    ? 1 + Math.sin((frame - 30) * 0.08) * 0.015
    : 1;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          transform: `scale(${bubbleScale * pulse})`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 32,
        }}
      >
        {/* Chat bubble */}
        <svg width="240" height="200" viewBox="0 0 240 200" fill="none">
          <path
            d="M20 20h200c11 0 20 9 20 20v100c0 11-9 20-20 20H120l-40 36v-36H20c-11 0-20-9-20-20V40c0-11 9-20 20-20z"
            stroke="#fff"
            strokeWidth="8"
            fill="none"
            strokeLinejoin="round"
          />
          <text
            x="120"
            y="110"
            textAnchor="middle"
            fontFamily="Inter, -apple-system, sans-serif"
            fontSize="72"
            fontWeight="800"
            fill="#fff"
            style={{
              opacity: textOpacity,
              transform: `translateY(${textY}px)`,
            }}
          >
            ?!
          </text>
        </svg>

        {/* Title text */}
        <div
          style={{
            color: '#fff',
            fontFamily: 'Inter, -apple-system, sans-serif',
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: '-0.02em',
            opacity: interpolate(frame, [20, 35], [0, 1], {
              extrapolateRight: 'clamp',
            }),
            transform: `translateY(${interpolate(frame, [20, 35], [8, 0], {
              extrapolateRight: 'clamp',
            })}px)`,
          }}
        >
          PUA话术识别
        </div>
      </div>
    </AbsoluteFill>
  );
};
