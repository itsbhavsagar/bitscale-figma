import Image from "next/image";
import { Circle, CircleCheck } from "lucide-react";

import { dashboardConfig } from "@/data/dashboard";

export function ProductDemoCard() {
  const { title, subtitle, progress, checklist } = dashboardConfig.demo;

  return (
    <div className="dashboard-card dashboard-card--demo">
      <div className="product-demo-header">
        <span className="product-demo-icon">
          <Image
            src="/file-check.png"
            alt=""
            width={18}
            height={18}
            className="product-demo-icon__image"
            aria-hidden="true"
          />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="product-demo-title">{title}</h3>
          <p className="product-demo-subtitle">{subtitle}</p>
        </div>
        <span className="product-demo-progress-value">{progress}%</span>
      </div>

      <div className="product-demo-progress-track">
        <div
          className="product-demo-progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="product-demo-checklist">
        {checklist.map((item) => (
          <div key={item.id} className="product-demo-checklist-item">
            {item.completed ? (
            <CircleCheck
            className="checklist-icon"
            strokeWidth={1.8}
            fill="#347FA9"
            color="#FFFFFF"
            aria-hidden="true"
          />
            ) : (
              <Circle
                className="checklist-icon checklist-icon--incomplete"
                strokeWidth={1.4}
                aria-hidden="true"
              />
            )}
            <span className="product-demo-checklist-label">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
