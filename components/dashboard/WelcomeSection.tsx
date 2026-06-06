import { dashboardConfig } from "@/data/dashboard";
import type { WelcomeActionId } from "@/types/grids";

interface WelcomeSectionProps {
  onAction: (actionId: WelcomeActionId) => void;
}

export function WelcomeSection({ onAction }: WelcomeSectionProps) {
  const { heading, subtitle, actions } = dashboardConfig.welcome;

  return (
    <div className="welcome-section flex items-center justify-between gap-4">
      <div>
        <h1 className="welcome-title">{heading}</h1>
        <p className="section-subtitle mt-1">{subtitle}</p>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        {actions.map((action) => {
          const Icon = action.icon;
          const isPrimary = action.variant === "primary";

          return (
            <button
              key={action.id}
              type="button"
              onClick={() => onAction(action.id)}
              className={[
                "welcome-action-button",
                isPrimary
                  ? "welcome-action-button--primary"
                  : "welcome-action-button--outline",
              ].join(" ")}
            >
              <Icon
                className="welcome-action-button__icon"
                style={{ color: action.iconColor }}
                aria-hidden="true"
              />
              {action.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
