import type { UserProfile } from "@auth0/nextjs-auth0";
import { useEffect, useState } from "react";
import SettingsService from "@services/settings";

export function useSettings(user: UserProfile | undefined) {
  const [autoSave, setAutoSave] = useState(false);
  const [colorMode, setColorMode] = useState<"dark" | "light">("light");
  const [useGrayscaleIcons, setUseGrayscaleIcons] = useState(false);

  useEffect(() => {
    const restoreSettings = async () => {
      if (!user) return;

      const settings = await new SettingsService(user).get();

      if (settings) {
        setAutoSave(settings.autoSave || false);
        setColorMode(settings.colorMode || "light");
        setUseGrayscaleIcons(settings.useGrayscaleIcons || false);
      }
    };

    restoreSettings();
  }, [user]);

  useEffect(() => {
    const saveSettings = async () => {
      if (!user) return;

      new SettingsService(user).update({
        useGrayscaleIcons,
        autoSave,
        colorMode,
      });
    };

    saveSettings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoSave, colorMode, useGrayscaleIcons]);

  return {
    autoSave,
    setAutoSave,
    colorMode,
    setColorMode,
    useGrayscaleIcons,
    setUseGrayscaleIcons,
  } as const;
}
