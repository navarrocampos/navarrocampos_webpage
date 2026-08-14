interface NCLogoProps {
  variant: 'light' | 'dark';
  className?: string;
}

/**
 * NCLogo — SVG inline, no external image request.
 * variant="light" → white background (navbar)
 * variant="dark"  → dark background (footer)
 */
export function NCLogo({ variant, className }: NCLogoProps) {
  const isLight = variant === 'light';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="77 139 346 224"
      className={className}
      aria-hidden="true"
    >
      <rect x="0" y="0" width="1000" height="1000" fill={isLight ? '#FFFFFF' : '#0D2A4A'} />
      <path
        d="M 158 159 L 96 159 L 96 299 L 158 299"
        fill="none"
        stroke={isLight ? '#1A7ABF' : '#5BC4FF'}
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 342 159 L 404 159 L 404 299 L 342 299"
        fill="none"
        stroke={isLight ? '#1A7ABF' : '#5BC4FF'}
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text
        x="250" y="276"
        textAnchor="middle"
        fontFamily="Arial Black, Arial, sans-serif"
        fontSize="128"
        fontWeight="800"
        fill={isLight ? '#0D2A4A' : '#FFFFFF'}
        letterSpacing="-2"
      >
        NC
      </text>
      <text
        x="250" y="353"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontSize="34"
        fontWeight="600"
        fill={isLight ? '#3A5A78' : '#9AAABF'}
        letterSpacing="10"
      >
        SERVICES
      </text>
    </svg>
  );
}
