import { motion } from "framer-motion";

interface NQRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  animated?: boolean;
  className?: string;
}

export function NQRing({ score, size = 180, strokeWidth = 10, label, animated = true, className = "" }: NQRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;
  const center = size / 2;

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <linearGradient id={`nq-gradient-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7C3AED" />
            <stop offset="50%" stopColor="#A78BFA" />
            <stop offset="100%" stopColor="#5B21B6" />
          </linearGradient>
        </defs>
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth={strokeWidth}
          opacity={0.3}
        />
        <motion.circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={`url(#nq-gradient-${size})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={animated ? circumference : circumference - progress}
          initial={animated ? { strokeDashoffset: circumference } : undefined}
          animate={animated ? { strokeDashoffset: circumference - progress } : undefined}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
          transform={`rotate(-90 ${center} ${center})`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className="font-bold text-foreground"
          style={{ fontSize: size * 0.22 }}
          initial={animated ? { opacity: 0, scale: 0.5 } : undefined}
          animate={animated ? { opacity: 1, scale: 1 } : undefined}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          {score}
        </motion.span>
        {label && (
          <motion.span
            className="text-muted-foreground text-xs font-medium mt-0.5"
            initial={animated ? { opacity: 0 } : undefined}
            animate={animated ? { opacity: 1 } : undefined}
            transition={{ delay: 1.2 }}
          >
            {label}
          </motion.span>
        )}
      </div>
    </div>
  );
}
