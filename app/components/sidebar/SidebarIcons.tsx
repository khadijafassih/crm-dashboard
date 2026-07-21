import { MessageSquare } from "lucide-react";

export function HexagonLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function MessageSquareHelp({ className }: { className?: string }) {
  return (
    <div className="relative inline-flex items-center justify-center">
      <MessageSquare className={className} />
      <span className="help-icon-label absolute inset-0 flex items-center justify-center font-bold text-current">
        ?
      </span>
    </div>
  );
}

export function IconWithBox({
  icon: Icon,
  className,
  active,
}: {
  icon: React.ElementType;
  className?: string;
  active?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-center rounded-sm border ${
        active
          ? "border-primary-foreground"
          : "border-muted-foreground group-hover:border-foreground"
      }`}
    >
      <Icon className={className} />
    </div>
  );
}