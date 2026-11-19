import {
  AndroidBlockableApp,
  configureAndroid,
  getBlockedApps,
  getInstalledApps,
  getPermissionStatus,
  openOverlaySettings,
  openUsageStatsSettings,
  setBlockedApps,
  startMonitoring,
} from 'expo-app-blocker';
import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { PermissionsAndroid, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';



export default function BlockDis() {
  const insets = useSafeAreaInsets();
  const [apps, setApps] = useState<AndroidBlockableApp[]>([]);

  useEffect(() => {
    (async () => {
      const result = await getInstalledApps();
      setApps(result);
      configureAndroid({
        overlayTitle: 'KIMI YOWAI MON',
        overlayText: 'GET OUT.',
        overlayBackgroundColor: '#2F2723',
        overlayTitleColor: '#9C95DC',
        overlayTextColor: '#F0EBD8',
        overlayTitleFontSize: 28,
        overlayTextFontSize: 16,
        overlayTitleBold: true,
        overlayShowSpinner: true,
        overlaySpinnerColor: '#9C95DC',
        overlaySpinnerSize: 50,
        overlayPadding: 0,
      });
      startMonitoring();

    })();
  }, []);

  const [blockedApps, setBlockedAppsState] = useState<string[]>([]);
  useEffect(() => {
    setBlockedAppsState(getBlockedApps());
  }, []);
  console.log('Blocked apps:', blockedApps);

  return (
    <ScrollView
      style={[styles.container]}
      contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}
    >
      <Stack.Screen options={{headerStyle: { backgroundColor: '#2F2723' },headerTintColor: '#9C95DC',headerTitleStyle: styles.title, title: 'DateTech' }}/>
      <Stack.Screen options={{ headerBackVisible: false }} />   

      <View style={styles.grid}>
        {apps.map((app) => (
          <View style={styles.row} key={app.packageName}>
            <Text style={styles.text} numberOfLines={1}>
              {app.name}
            </Text>
            <Switch
              trackColor={{ false: '#A0887E', true: '#D64550' }}
              thumbColor="#D64550"
              value={blockedApps.includes(app.packageName)}
              onValueChange={() => toggleBlockApp(app.packageName)}
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
  async function toggleBlockApp(packageName: string): Promise<void> {
    console.log('Toggling block for app:', packageName);
    const hasPermissions = await checkPermissions();

    if (hasPermissions) {
      console.log('All persmission permited. Continuing to toggle block for app:', packageName);
      if (blockedApps.includes(packageName)) {
        console.log('Unblocking app:', packageName);
        const updateBlockedApps = blockedApps.filter(app => app !== packageName);
        setBlockedAppsState(updateBlockedApps);
        setBlockedApps(updateBlockedApps);
        console.log('Updated blocked apps:', updateBlockedApps);
      } else {
        console.log('Blocking app:', packageName);
        const updateBlockedApps = [...blockedApps, packageName];
        setBlockedAppsState(updateBlockedApps);
        setBlockedApps(updateBlockedApps);
        console.log('Updated blocked apps:', updateBlockedApps);
      }
    } else {
      const status = await getPermissionStatus();
      if (!status.allGranted && status.details.platform === 'android') {
        if (!status.details.overlay) {
          console.log('Overlay permission missing');
          openOverlaySettings();
        }

        if (!status.details.usageStats) {
          console.log('Usage stats permission missing');
          openUsageStatsSettings();
        }
        if (!status.details.notifications) {
          console.log('Notification permission missing');
          PermissionsAndroid.request('android.permission.POST_NOTIFICATIONS');
        }
      }
    }
  }
}

async function checkPermissions(): Promise<boolean> {
  console.log('Checking permissions...');
  const status = await getPermissionStatus();
  console.log('Permission status:', status);
  if (status.allGranted) {
    console.log('All permissions granted');
    return true;
  }
  return false;
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#2F2723', flex: 1, padding: 16 },
  text: { color: '#F0EBD8', fontSize: 16, flexShrink: 1, marginBottom: 16 },
  grid: { gap: 8 },
  row: {
    alignItems: 'center',
    borderColor: '#9C95DC',
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  title: {
    color: '#9C95DC',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});
