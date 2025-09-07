import React, { useState, useRef } from "react";
import {
    Pressable,
    View,
    StyleSheet,
    LayoutChangeEvent,
    TextInput,
    useColorScheme,
} from "react-native";
import { Image } from "expo-image";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";

const BLURHASH = "L6Pj0^i_.AyE_3t7t7R**0o#DgR4";

const profile = {
    name: "Alex",
    age: 28,
    location: "New York, NY",
    bio:
        "Adventure seeker, coffee lover, and dog parent. Looking for genuine connections and shared experiences.",
    occupation: "Software Engineer",
    images: [
        "https://images.unsplash.com/photo-1544006659-f0b21884ce1d?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?auto=format&fit=crop&w=800&q=80",
    ],
    interests: ["Photography", "Hiking", "Coffee", "Travel", "Music", "Cooking"],
    stats: { matches: 124, likes: 89, superLikes: 12 },
};

const COLS = 3;
const ROW_GAP = 8;

export default function TabFourScreen() {
    const [gridW, setGridW] = useState(0);
    const [isEditing, setIsEditing] = useState(false);
    const colorScheme = useColorScheme();

    // Keep last saved values for Close
    const savedFormRef = useRef({
        name: profile.name,
        age: String(profile.age),
        location: profile.location,
        bio: profile.bio,
        occupation: profile.occupation,
    });

    const [form, setForm] = useState(savedFormRef.current);

    const onGridLayout = (e: LayoutChangeEvent) => {
        setGridW(Math.round(e.nativeEvent.layout.width));
    };

    const tileW = gridW > 0 ? Math.floor((gridW - (COLS - 1) * ROW_GAP) / COLS) : 0;
    const tileH = Math.round(tileW * 1.33);

    const handleSave = () => {
        console.log("Save clicked with data:", form);
        savedFormRef.current = form;
        setIsEditing(false);
    };

    const handleClose = () => {
        console.log("Close clicked");
        setForm(savedFormRef.current); // discard edits
        setIsEditing(false);
    };

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: "#f3f4f6", dark: "#0b1220" }}
            headerImage={
                <ThemedView className="h-56 rounded-b-3xl overflow-hidden bg-slate-200 dark:bg-slate-800">
                    <Image
                        source={{
                            uri:
                                "https://images.unsplash.com/photo-1520975930498-0f8d7a6a1533?auto=format&fit=crop&w=1600&q=80",
                        }}
                        placeholder={BLURHASH}
                        contentFit="cover"
                        priority="high"
                        cachePolicy="disk"
                        transition={0}
                        style={StyleSheet.absoluteFillObject}
                    />
                    <View className="absolute inset-0 bg-black/15" />

                    <ThemedView className="absolute top-3 left-3 bg-indigo-600 px-3 py-1.5 rounded-full flex-row items-center gap-1.5">
                        <IconSymbol name="person.crop.circle.fill" size={16} color="#fff" />
                        <ThemedText type="defaultSemiBold" className="text-white text-xs">
                            My Profile
                        </ThemedText>
                    </ThemedView>

                    <View className="absolute top-3 right-3 flex-row gap-2">
                        <Pressable className="bg-black/40 px-3 py-2 rounded-xl">
                            <IconSymbol name="gearshape.fill" size={18} color="#fff" />
                        </Pressable>
                        <Pressable className="bg-black/40 px-3 py-2 rounded-xl">
                            <IconSymbol name="camera.fill" size={18} color="#fff" />
                        </Pressable>
                    </View>
                </ThemedView>
            }
        >
            {/* Photo grid */}
            <ThemedView className="bg-white dark:bg-[#14161c] rounded-2xl p-3 mt-3 border border-slate-200 dark:border-white/10 mx-6">
                <View
                    onLayout={onGridLayout}
                    style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}
                >
                    {profile.images.map((uri, i) => (
                        <View
                            key={i}
                            className="rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900"
                            style={{ width: tileW || 0, height: tileH || 0, marginBottom: ROW_GAP }}
                        >
                            <Image
                                source={{ uri }}
                                placeholder={BLURHASH}
                                contentFit="cover"
                                cachePolicy="disk"
                                transition={0}
                                style={StyleSheet.absoluteFillObject}
                            />
                            {i === 0 && (
                                <View className="absolute top-1.5 left-1.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900" />
                            )}
                        </View>
                    ))}
                </View>
            </ThemedView>

            {/* Info card */}
            <ThemedView className="bg-white dark:bg-[#14161c] rounded-2xl p-4 mt-3 border border-slate-200 dark:border-white/10 mx-6">
                <View className="flex-row items-center justify-between">
                    <View className="flex-1 pr-3">
                        {!isEditing ? (
                            <>
                                <ThemedText type="title" className="text-slate-900 dark:text-slate-100">
                                    {form.name}, {form.age}
                                </ThemedText>
                                <View className="flex-row items-center mt-1">
                                    <IconSymbol name="mappin.and.ellipse" size={14} color="#94a3b8" />
                                    <ThemedText className="ml-1.5 text-sm text-slate-500 dark:text-slate-400">
                                        {form.location}
                                    </ThemedText>
                                </View>
                            </>
                        ) : (
                            <>
                                <View className="flex-row gap-2">
                                    <TextInput
                                        value={form.name}
                                        onChangeText={(t) => setForm((s) => ({ ...s, name: t }))}
                                        placeholder="Name"
                                        className="flex-1 px-3 py-2 rounded-lg border border-slate-300 dark:border-white/20 text-slate-900 dark:text-slate-100"
                                    />
                                    <TextInput
                                        value={form.age}
                                        onChangeText={(t) => setForm((s) => ({ ...s, age: t }))}
                                        placeholder="Age"
                                        keyboardType="number-pad"
                                        className="w-20 px-3 py-2 rounded-lg border border-slate-300 dark:border-white/20 text-slate-900 dark:text-slate-100"
                                    />
                                </View>
                                <TextInput
                                    value={form.location}
                                    onChangeText={(t) => setForm((s) => ({ ...s, location: t }))}
                                    placeholder="Location"
                                    className="mt-2 px-3 py-2 rounded-lg border border-slate-300 dark:border-white/20 text-slate-900 dark:text-slate-100"
                                />
                            </>
                        )}
                    </View>

                    {/* Only show Edit when NOT editing (header Save removed) */}
                    {!isEditing && (
                        <Pressable
                            onPress={() => setIsEditing(true)}
                            accessibilityRole="button"
                            accessibilityLabel="Edit profile"
                            android_ripple={{
                                color:
                                    colorScheme === "dark"
                                        ? "rgba(255,255,255,0.2)"
                                        : "rgba(255,255,255,0.15)",
                                borderless: false,
                            }}
                            style={({ pressed }) => [{ opacity: pressed ? 0.9 : 1 }]}
                            className="bg-gray-100 text-white dark:bg-white/10 border border-slate-200 dark:border-white/20 px-3 py-2 rounded-lg flex-row items-center gap-1.5"
                        >
                            <IconSymbol name="pencil" size={14} color="#000" />
                            <ThemedText type="defaultSemiBold" className="text-slate-900 dark:text-white text-xs">
                                Edit
                            </ThemedText>
                        </Pressable>
                    )}
                </View>

                {!isEditing ? (
                    <>
                        <ThemedText className="text-slate-700 dark:text-slate-300 mt-3 leading-5">
                            {form.bio}
                        </ThemedText>

                        <ThemedText
                            type="defaultSemiBold"
                            className="text-slate-900 dark:text-slate-100 mt-3"
                        >
                            {form.occupation}
                        </ThemedText>
                    </>
                ) : (
                    <>
                        <TextInput
                            value={form.bio}
                            onChangeText={(t) => setForm((s) => ({ ...s, bio: t }))}
                            placeholder="Bio"
                            multiline
                            className="mt-3 px-3 py-2 rounded-lg border border-slate-300 dark:border-white/20 text-slate-900 dark:text-slate-100"
                        />
                        <TextInput
                            value={form.occupation}
                            onChangeText={(t) => setForm((s) => ({ ...s, occupation: t }))}
                            placeholder="Occupation"
                            className="mt-3 px-3 py-2 rounded-lg border border-slate-300 dark:border-white/20 text-slate-900 dark:text-slate-100"
                        />
                    </>
                )}

                <ThemedText
                    type="defaultSemiBold"
                    className="text-slate-900 dark:text-slate-100 mt-4 mb-2"
                >
                    Interests
                </ThemedText>
                <View className="flex-row flex-wrap" style={{ gap: 8 }}>
                    {profile.interests.map((tag, idx) => (
                        <View
                            key={idx}
                            className="px-3 py-1.5 rounded-full border bg-pink-50 border-pink-200 dark:bg-pink-950/40 dark:border-pink-500/30"
                        >
                            <ThemedText className="text-pink-700 dark:text-pink-300 text-xs">
                                {tag}
                            </ThemedText>
                        </View>
                    ))}
                </View>

                {/* Single Save/Close row below interests when editing */}
                {isEditing && (
                    <View className="flex-row gap-2 mt-4">
                        <Pressable
                            onPress={handleSave}
                            className="flex-1 bg-emerald-600 dark:bg-emerald-500 rounded-lg py-3 items-center"
                        >
                            <View className="flex-row items-center gap-1.5">
                                <IconSymbol name="checkmark.circle.fill" size={16} color="#fff" />
                                <ThemedText type="defaultSemiBold" className="text-white">
                                    Save
                                </ThemedText>
                            </View>
                        </Pressable>

                        <Pressable
                            onPress={handleClose}
                            className="flex-1 bg-slate-100 dark:bg-white/10 border border-slate-300 dark:border-white/20 rounded-lg py-3 items-center"
                        >
                            <View className="flex-row items-center gap-1.5">
                                <IconSymbol name="xmark.circle.fill" size={16} color="#64748b" />
                                <ThemedText type="defaultSemiBold" className="text-slate-600 dark:text-slate-300">
                                    Close
                                </ThemedText>
                            </View>
                        </Pressable>
                    </View>
                )}
            </ThemedView>

            {/* Stats */}
            <View className="flex-row gap-2 mx-6 mt-3">
                <ThemedView className="flex-1 bg-white dark:bg-[#14161c] rounded-xl items-center py-3 border border-slate-200 dark:border-white/10">
                    <IconSymbol name="heart.fill" size={18} color="#ef4444" />
                    <ThemedText type="subtitle" className="text-pink-600 dark:text-pink-400 mt-1">
                        {profile.stats.matches}
                    </ThemedText>
                    <ThemedText className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Matches
                    </ThemedText>
                </ThemedView>

                <ThemedView className="flex-1 bg-white dark:bg-[#14161c] rounded-xl items-center py-3 border border-slate-200 dark:border-white/10">
                    <IconSymbol name="message.fill" size={18} color="#3b82f6" />
                    <ThemedText type="subtitle" className="text-pink-600 dark:text-pink-400 mt-1">
                        {profile.stats.likes}
                    </ThemedText>
                    <ThemedText className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Likes
                    </ThemedText>
                </ThemedView>

                <ThemedView className="flex-1 bg-white dark:bg-[#14161c] rounded-xl items-center py-3 border border-slate-200 dark:border-white/10">
                    <IconSymbol name="star.fill" size={18} color="#f59e0b" />
                    <ThemedText type="subtitle" className="text-pink-600 dark:text-pink-400 mt-1">
                        {profile.stats.superLikes}
                    </ThemedText>
                    <ThemedText className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Super Likes
                    </ThemedText>
                </ThemedView>
            </View>

            {/* Actions */}
            <ThemedView className="bg-white dark:bg-[#14161c] rounded-2xl p-4 mt-3 border border-slate-200 dark:border-white/10 mx-6 mb-6">
                <Pressable className="bg-pink-600 dark:bg-pink-500 rounded-xl py-3 flex-row items-center justify-center gap-2">
                    <IconSymbol name="camera.fill" size={16} color="#fff" />
                    <ThemedText type="defaultSemiBold" className="text-white">
                        Manage Photos
                    </ThemedText>
                </Pressable>

                <Pressable className="mt-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/15 rounded-xl py-3 flex-row items-center justify-center gap-2">
                    <IconSymbol name="gearshape.fill" size={16} color="#fb4593" />
                    <ThemedText type="defaultSemiBold" className="text-pink-600 dark:text-pink-400">
                        Account Settings
                    </ThemedText>
                </Pressable>
            </ThemedView>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    // reserved for RN-only styles if needed
});
