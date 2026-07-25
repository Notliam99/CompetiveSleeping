import type { ComponentType, ReactNode } from "react";

type PageHeaderProps = {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
  actions?: ReactNode;
};

export default function PageHeader({
  icon: Icon,
  title,
  description,
  actions,
}: PageHeaderProps) {
  return (
    <header className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <h1 className="mb-1 flex items-center gap-2 text-2xl font-bold text-zinc-900 dark:text-white">
          <Icon className="text-2xl text-violet-600 dark:text-violet-400" />
          <span>{title}</span>
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {description}
        </p>
      </div>
      {actions ? <div className="flex shrink-0 gap-2">{actions}</div> : null}
    </header>
  );
}
