import React from "react";
import { cn } from "./utils";

interface AccentCardProps {
  accentColor?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function AccentCard({ accentColor = "#2563eb", icon, children, className }: AccentCardProps) {
  return (
    <div
      className={cn(
        "flex items-center bg-white rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl focus-within:shadow-xl p-0",
        className
      )}
      style={{ minHeight: 80 }}
    >
      <div
        className="flex items-center justify-center rounded-l-xl"
        style={{
          background: accentColor,
          width: 56,
          minHeight: 80,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {icon}
      </div>
      <div className="flex-1 p-5 md:p-6">
        {children}
      </div>
    </div>
  );
}
