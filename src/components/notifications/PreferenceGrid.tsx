"use client";

import type { SubscriptionPreferences } from "@/lib/notifications/types";
import { preferenceLabels } from "@/lib/notifications/preferences";
import PreferenceToggle from "./PreferenceToggle";

export default function PreferenceGrid({
  value,
  onChange,
}: {
  value: SubscriptionPreferences;
  onChange: (value: SubscriptionPreferences) => void;
}) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {preferenceLabels.map((item) => (
        <PreferenceToggle
          key={item.key}
          title={item.title}
          text={item.text}
          checked={value[item.key]}
          onChange={(checked) =>
            onChange({
              ...value,
              [item.key]: checked,
            })
          }
        />
      ))}
    </div>
  );
}
