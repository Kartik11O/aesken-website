"use client";

import CountUp from "@/components/react-bits/CountUp/CountUp";

function parseStatValue(value: string) {
  const match = value.match(/^([+−-]?)(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return { prefix: "", to: 0, suffix: value, decimals: 0 };

  const prefix = match[1] === "−" ? "-" : match[1];
  const to = Number(match[2]);
  const suffix = match[3];
  const decimals = match[2].includes(".") ? match[2].split(".")[1].length : 0;

  return { prefix, to, suffix, decimals };
}

export function WebdesignStatValue({
  value,
  className,
  duration = 1.6,
}: {
  value: string;
  className?: string;
  duration?: number;
}) {
  const parsed = parseStatValue(value);

  if (Number.isNaN(parsed.to)) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span className={className}>
      {parsed.prefix}
      <CountUp to={parsed.to} duration={duration} />
      {parsed.suffix}
    </span>
  );
}
