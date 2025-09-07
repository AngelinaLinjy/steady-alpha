interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function Logo({ width = 600, height = 160, className = '' }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 600 160"
      className={className}
    >
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="Cinzel, Trajan Pro, Times New Roman, serif"
        fontWeight="600"
        fontSize="80"
        fill="#ffbf00"
        letterSpacing="3"
      >
        Steady Alpha
      </text>
    </svg>
  );
}
