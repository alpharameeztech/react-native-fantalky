// app/_layout.tsx
import 'react-native-gesture-handler'; // required once before navigators
import 'react-native-reanimated';

import React from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { Drawer } from 'expo-router/drawer';

import { useColorScheme } from '@/hooks/useColorScheme';
import "../global.css"

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });

    if (!loaded) return null;

    return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Drawer
                initialRouteName="(tabs)"
                screenOptions={{
                    headerShown: true,
                    headerStyle: { backgroundColor: '#14161c' },
                    headerTintColor: '#fff',
                    drawerStyle: { backgroundColor: '#14161c' },
                    drawerActiveTintColor: '#ff37ad',
                    drawerInactiveTintColor: '#c7cdd4',
                }}
            >
                {/* Your existing tabs group, now inside the Drawer */}
                <Drawer.Screen
                    name="(tabs)"
                    options={{ title: 'Home', drawerLabel: 'Home' }}
                />

                {/* Keep not-found available but hidden from the Drawer */}
                {/*<Drawer.Screen*/}
                {/*    name="+not-found"*/}
                {/*    options={{ drawerItemStyle: { display: 'none' }, title: 'Not Found' }}*/}
                {/*/>*/}
            </Drawer>

            <StatusBar style="auto" />
        </ThemeProvider>
    );
}
