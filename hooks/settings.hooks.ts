import type { UserProfile } from "@auth0/nextjs-auth0";
import { useEffect, useState } from "react";
import SettingsService from "../services/SettingsService";

export function useSettings(user: UserProfile | undefined) {
  const [autoSave, setAutoSave] = useState(false);
  const [useGrayscaleIcons, setUseGrayscaleIcons] = useState(false);

  useEffect(() => {
    const restoreSettings = async () => {
      if (!user) return;

      const settings = await new SettingsService(user).get();

      if (settings) {
        setAutoSave(settings.autoSave || false);
        setUseGrayscaleIcons(settings.useGrayscaleIcons || false);
      }
    };

    restoreSettings();
  }, [user]);

  useEffect(() => {
    const saveSettings = async () => {
      if (!user) return;

      new SettingsService(user).create({
        useGrayscaleIcons,
        autoSave,
      });
    };

    saveSettings();
  }, [autoSave, useGrayscaleIcons]);

  return {
    autoSave,
    setAutoSave,
    useGrayscaleIcons,
    setUseGrayscaleIcons,
  } as const;
}
