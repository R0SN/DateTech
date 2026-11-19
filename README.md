# DateTech

DateTech is a mobile app that can block other apps. It lets you view installed apps, choose which ones to block, and start monitoring them. When a blocked app is opened, DateTech displays a blocking screen with an option to return to the app manager.

## Features

- View installed apps that can be blocked
- Toggle blocking for individual apps
- Persist the list of blocked package names
- Request the Android permissions required for app blocking
- Display a custom blocking overlay
- Use Expo Router for file-based navigation

## Tech stack

- [Expo](https://expo.dev/) SDK 58
- [React Native](https://reactnative.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- [`expo-app-blocker`](https://www.npmjs.com/package/expo-app-blocker)

## Project structure

```text
src/app/
├── _layout.tsx   # Root Expo Router layout
├── index.tsx     # App manager screen
└── blocked.tsx   # Blocked-app screen
```

Use the preview profile when you need an installable Android APK for internal testing.

DateTech uses native functionality from `expo-app-blocker`, so the app-blocking feature is not available in Expo Go. Use a development build or a locally generated native app.

