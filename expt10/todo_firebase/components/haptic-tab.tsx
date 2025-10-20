import React, { useEffect, useState } from 'react';
import type { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs' with { 'resolution-mode': 'import' };
import * as Haptics from 'expo-haptics';

export function HapticTab(props: BottomTabBarButtonProps) {
  const [PlatformPressable, setPlatformPressable] = useState<React.ComponentType<any> | null>(null);

  useEffect(() => {
    let mounted = true;
    // Dynamically import the ESM-only module at runtime to avoid static require()
    import('@react-navigation/elements')
      .then((mod) => {
        // support both named export and potential default shape
        const Comp =
          (mod as any).PlatformPressable ?? (mod as any).default?.PlatformPressable ?? (mod as any).default ?? null;
        if (mounted && Comp) {
          setPlatformPressable(() => Comp as React.ComponentType<any>);
        }
      })
      .catch(() => {
        // ignore import errors; keep null to render nothing
      });
    return () => {
      mounted = false;
    };
  }, []);

  if (!PlatformPressable) return null;

  const Pressable = PlatformPressable;

  return (
    <Pressable
      {...props}
      onPressIn={(ev: any) => {
        if (process.env.EXPO_OS === 'ios') {
          // Add a soft haptic feedback when pressing down on the tabs.
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        props.onPressIn?.(ev);
      }}
    />
  );
}
