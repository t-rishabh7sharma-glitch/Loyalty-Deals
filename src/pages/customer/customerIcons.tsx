import { Coffee, Headphones, Shirt, Utensils } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const MAP: Record<string, LucideIcon> = {
  coffee: Coffee,
  headphones: Headphones,
  shirt: Shirt,
  utensils: Utensils,
};

export function CustomerDealIcon({ name, className }: { name?: string; className?: string }) {
  const Icon = (name && MAP[name]) || Coffee;
  return <Icon className={className} />;
}
