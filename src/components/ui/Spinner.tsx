import farmrouteDark from "@/assets/farmroute_dark.png";

interface SpinnerProps {
  size?: number;
  label?: string;
}

export function Spinner({ size = 24, label = "Loading" }: SpinnerProps) {
  return (
    <div role="status" className="flex items-center justify-center">
      <img
        src={farmrouteDark}
        alt={label}
        className="animate-spin"
        style={{ width: size, height: size }}
      />
      <span className="sr-only">{label}</span>
    </div>
  );
}