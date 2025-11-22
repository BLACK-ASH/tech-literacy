"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Toggle } from "@/components/ui/toggle";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme(); // ✅ now we get current theme

  const isDark = theme === "dark";

  return (
    <div>
      <Toggle
        variant="outline"
        pressed={isDark}
        onPressedChange={() => setTheme(isDark ? "light" : "dark")}
        aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
        className="group size-8 rounded-full border-none text-muted-foreground shadow-none
          data-[state=on]:bg-transparent
          data-[state=on]:text-muted-foreground
          data-[state=on]:hover:bg-muted
          data-[state=on]:hover:text-foreground"
      >
        {/* Moon appears in dark mode */}
        <MoonIcon
          size={16}
          className="absolute shrink-0 transition-all scale-0 opacity-0 group-data-[state=on]:scale-100 group-data-[state=on]:opacity-100"
          aria-hidden="true"
        />

        {/* Sun appears in light mode */}
        <SunIcon
          size={16}
          className="shrink-0 transition-all scale-100 opacity-100 group-data-[state=on]:scale-0 group-data-[state=on]:opacity-0"
          aria-hidden="true"
        />
      </Toggle>
    </div>
  );
}
