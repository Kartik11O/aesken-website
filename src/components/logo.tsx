export function Logo({ className = "", variant = "dark" }: { className?: string; variant?: "dark" | "light" }) {
  const stroke = variant === "light" ? "#ffffff" : "#161618";
  const textColor = variant === "light" ? "text-white" : "text-[#161618]";

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg
        viewBox="0 0 34 26"
        className="h-[26px] w-[34px] shrink-0"
        aria-hidden
        fill="none"
      >
        <path
          d="M17 2C10 2 4 8 4 15c0 4 2 7 5 9"
          stroke={stroke}
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M17 2c7 0 13 6 13 13 0 4-2 7-5 9"
          stroke={stroke}
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <circle cx="26" cy="4" r="2.2" fill={stroke} />
        <path
          d="M12 8l5 4-5 4"
          stroke={stroke}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className={`font-display text-[28px] font-semibold leading-none tracking-tight ${textColor}`}>
        Aesken
      </span>
    </div>
  );
}
