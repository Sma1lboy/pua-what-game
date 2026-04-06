import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from 'remotion';

export const Logo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // --- Animation springs & interpolations ---
  const bubbleSpring = spring({
    frame,
    fps,
    config: { damping: 10, stiffness: 60 },
  });

  const shieldSpring = spring({
    frame: frame - 8,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  const textReveal = interpolate(frame, [15, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const subtitleReveal = interpolate(frame, [22, 38], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Subtle floating animation after intro
  const floatY = frame > 35 ? Math.sin((frame - 35) * 0.06) * 3 : 0;

  // Glow pulse
  const glowPulse =
    frame > 30 ? 0.4 + Math.sin((frame - 30) * 0.08) * 0.15 : 0;

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(145deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily:
          '"PingFang SC", "Microsoft YaHei", Inter, -apple-system, sans-serif',
      }}
    >
      {/* Background decorative circles */}
      <div
        style={{
          position: 'absolute',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(149,236,105,0.08) 0%, transparent 70%)',
          top: '15%',
          left: '10%',
          transform: `scale(${bubbleSpring})`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 200,
          height: 200,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(244,114,182,0.08) 0%, transparent 70%)',
          bottom: '20%',
          right: '15%',
          transform: `scale(${bubbleSpring})`,
        }}
      />

      {/* Main container */}
      <div
        style={{
          transform: `scale(${bubbleSpring}) translateY(${floatY}px)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 28,
        }}
      >
        {/* Icon group: two chat bubbles + shield */}
        <div style={{ position: 'relative', width: 220, height: 180 }}>
          <svg
            width="220"
            height="180"
            viewBox="0 0 220 180"
            fill="none"
            style={{ position: 'absolute', top: 0, left: 0 }}
          >
            <defs>
              {/* Green bubble gradient (WeChat / "good" side) */}
              <linearGradient
                id="greenGrad"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#95EC69" />
                <stop offset="100%" stopColor="#6BD84A" />
              </linearGradient>

              {/* Pink-red gradient (manipulator / PUA side) */}
              <linearGradient
                id="pinkGrad"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#f472b6" />
                <stop offset="100%" stopColor="#e11d48" />
              </linearGradient>

              {/* Shield gradient */}
              <linearGradient
                id="shieldGrad"
                x1="50%"
                y1="0%"
                x2="50%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#FCD34D" />
                <stop offset="100%" stopColor="#F59E0B" />
              </linearGradient>

              {/* Glow filter */}
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* PUA bubble (back, pink-red) – slightly offset right & up */}
            <g
              style={{
                opacity: interpolate(frame, [3, 12], [0, 0.85], {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                }),
                transform: `translateX(${interpolate(frame, [3, 12], [20, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}px)`,
              }}
            >
              <path
                d="M85 18h110c10 0 18 8 18 18v68c0 10-8 18-18 18h-60l-22 22v-22H85c-10 0-18-8-18-18V36c0-10 8-18 18-18z"
                fill="url(#pinkGrad)"
                opacity="0.9"
              />
              {/* Manipulative text symbols inside */}
              <text
                x="153"
                y="82"
                textAnchor="middle"
                fontFamily="Inter, -apple-system, sans-serif"
                fontSize="36"
                fontWeight="800"
                fill="rgba(255,255,255,0.95)"
              >
                ♡?
              </text>
            </g>

            {/* User bubble (front, green) – slightly offset left & down */}
            <g
              style={{
                opacity: interpolate(frame, [0, 8], [0, 1], {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                }),
                transform: `translateX(${interpolate(frame, [0, 8], [-20, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}px)`,
              }}
            >
              <path
                d="M25 40h110c10 0 18 8 18 18v68c0 10-8 18-18 18H95l-22 22v-22H25c-10 0-18-8-18-18V58c0-10 8-18 18-18z"
                fill="url(#greenGrad)"
              />
              {/* Alert/detect symbol */}
              <text
                x="88"
                y="105"
                textAnchor="middle"
                fontFamily="Inter, -apple-system, sans-serif"
                fontSize="40"
                fontWeight="800"
                fill="rgba(255,255,255,0.95)"
              >
                ?!
              </text>
            </g>
          </svg>

          {/* Shield badge overlay */}
          <div
            style={{
              position: 'absolute',
              bottom: 6,
              right: 16,
              transform: `scale(${Math.max(0, shieldSpring)})`,
              filter: `drop-shadow(0 0 ${8 + glowPulse * 12}px rgba(245,158,11,${glowPulse}))`,
            }}
          >
            <svg width="52" height="60" viewBox="0 0 52 60" fill="none">
              <path
                d="M26 4L4 14v18c0 14 10 22 22 26 12-4 22-12 22-26V14L26 4z"
                fill="url(#shieldGrad)"
                stroke="#fff"
                strokeWidth="2.5"
              />
              {/* Checkmark in shield */}
              <path
                d="M16 30l7 7 13-14"
                stroke="#fff"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                style={{
                  strokeDasharray: 40,
                  strokeDashoffset: interpolate(frame, [18, 32], [40, 0], {
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp',
                  }),
                }}
              />
            </svg>
          </div>
        </div>

        {/* Title: "PUA" with accent styling */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 6,
            opacity: textReveal,
            transform: `translateY(${interpolate(frame, [15, 30], [12, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            })}px)`,
          }}
        >
          <div
            style={{
              fontSize: 48,
              fontWeight: 900,
              letterSpacing: '0.08em',
              background: 'linear-gradient(135deg, #95EC69 0%, #6BD84A 40%, #FCD34D 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: 1,
            }}
          >
            PUA
          </div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 600,
              color: 'rgba(255,255,255,0.85)',
              letterSpacing: '0.12em',
              opacity: subtitleReveal,
              transform: `translateY(${interpolate(frame, [22, 38], [6, 0], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              })}px)`,
            }}
          >
            话术识别
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
