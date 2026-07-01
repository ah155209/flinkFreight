import Counter from "@/components/motion/Counter";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { cn } from "@/lib/utils";

type Stat = { value: string; label: string };

/**
 * StatGrid — reusable animated statistics grid. `variant` switches between the
 * translucent style used on dark hero backgrounds and a light card style.
 */
export default function StatGrid({
  stats,
  variant = "light",
  className,
}: {
  stats: Stat[];
  variant?: "light" | "glass";
  className?: string;
}) {
  return (
    <Stagger className={cn("grid grid-cols-2 gap-4", className)}>
      {stats.map((s) => (
        <StaggerItem key={s.label}>
          <div
            className={cn(
              "rounded-xl p-6",
              variant === "glass"
                ? "border border-white/10 bg-white/5 backdrop-blur"
                : "border border-border bg-secondary/50 text-center"
            )}
          >
            <p
              className={cn(
                "text-3xl font-extrabold md:text-4xl",
                variant === "glass" ? "text-accent" : "text-primary"
              )}
            >
              <Counter value={s.value} />
            </p>
            <p
              className={cn(
                "mt-1 text-sm",
                variant === "glass" ? "text-slate-300" : "text-muted-foreground"
              )}
            >
              {s.label}
            </p>
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
