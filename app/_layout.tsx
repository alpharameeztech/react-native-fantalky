import "react-native-gesture-handler";
import "react-native-reanimated";
import React from "react";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { Drawer } from "expo-router/drawer";
import { useColorScheme } from "@/hooks/useColorScheme";
import "../global.css";

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({ SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf") });
    if (!loaded) return null;

    return (
        <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
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
                {/* Visible item that always goes to Home tab */}
                <Drawer.Screen
                    name="home"
                    options={{ title: 'Home', drawerLabel: 'Home' }}
                />

                <Drawer.Screen name="messages"  options={{ title: 'Messages', drawerLabel: 'Messages' }} />

                <Drawer.Screen
                    name="settings"
                    options={{ title: 'Settings', drawerLabel: 'Settings' }}
                />

                {/* Keep tabs mounted but not listed in the drawer */}
                <Drawer.Screen
                    name="(tabs)"
                    options={{ drawerItemStyle: { display: 'none' } }}
                />
            </Drawer>

            <StatusBar style="auto" />
        </ThemeProvider>
    );
}
