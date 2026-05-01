interface Props {
  className?: string;
  variant?: "dark" | "light";
}

const EYLogo = ({ className = "h-10", variant = "dark" }: Props) => {
  const ink = variant === "dark" ? "#2E2E38" : "#FFFFFF";
  return (
    <svg viewBox="0 0 120 60" className={className} xmlns="http://www.w3.org/2000/svg" aria-label="EY logo">
      <rect x="0" y="0" width="120" height="60" fill="#FFE600" />
      <text
        x="60"
        y="42"
        textAnchor="middle"
        fontFamily="Inter, Arial, sans-serif"
        fontWeight="900"
        fontSize="32"
        fill={ink}
        letterSpacing="-1"
      >
        EY
      </text>
    </svg>
  );
};

export default EYLogo;
