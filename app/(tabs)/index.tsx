// app/(tabs)/discover.tsx (or your current path)
import React, { useState } from "react";
import { SafeAreaView, View, ScrollView, Pressable, Text } from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Sparkles, Filter, RotateCcw } from "lucide-react-native";

import { SwipeCard } from "@/components/discover/SwipeCard";

type Profile = {
    id: string;
    name: string;
    age: number;
    location: string;
    bio: string;
    occupation: string;
    images: string[];
    distance: number;
    verified: boolean;
};

const mockProfiles: Profile[] = [
    {
        id: "1",
        name: "Emma",
        age: 28,
        location: "New York, NY",
        bio: "Love hiking, coffee, and deep conversations. Looking for someone who shares my passion for adventure and growth.",
        occupation: "Marketing Manager",
        images: [
            "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=900&q=80",
        ],
        distance: 2,
        verified: true,
    },
    {
        id: "2",
        name: "James",
        age: 32,
        location: "Brooklyn, NY",
        bio: "Photographer who loves capturing life's beautiful moments. Seeking genuine connections and shared adventures.",
        occupation: "Photographer",
        images: [
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
        ],
        distance: 5,
        verified: false,
    },
    {
        id: "3",
        name: "Sophie",
        age: 26,
        location: "Manhattan, NY",
        bio: "Yoga instructor and wellness enthusiast. Looking for someone who values mindfulness and healthy living.",
        occupation: "Yoga Instructor",
        images: [
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop",
        ],
        distance: 3,
        verified: true,
    },
];

/** Small RN buttons styled with Tailwind (NativeWind) */
function IconButton({
                        onPress,
                        disabled,
                        children,
                    }: {
    onPress?: () => void;
    disabled?: boolean;
    children: React.ReactNode;
}) {
    return (
        <Pressable
            onPress={onPress}
            disabled={disabled}
            className={`w-11 h-11 rounded-full items-center justify-center bg-white border border-slate-200 shadow-sm ${
                disabled ? "opacity-40" : "opacity-100"
            }`}
        >
            {children}
        </Pressable>
    );
}

function PrimaryButton({
                           title,
                           onPress,
                           className = "",
                       }: {
    title: string;
    onPress?: () => void;
    className?: string;
}) {
    return (
        <Pressable
            onPress={onPress}
            className={`px-5 py-3 rounded-xl items-center bg-[#ff37ad] ${className}`}
        >
            <Text className="text-white font-semibold">{title}</Text>
        </Pressable>
    );
}

export default function DiscoverScreen() {
    const router = useRouter();
    const [profiles, setProfiles] = useState<Profile[]>(mockProfiles);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleSwipe = (direction: "left" | "right", profileId: string) => {
        setTimeout(() => setCurrentIndex((prev) => prev + 1), 300);
    };

    const handleRewind = () => {
        if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
    };

    const currentProfile = profiles[currentIndex];

    return (
        <SafeAreaView className="flex-1 bg-white">
            <StatusBar style="dark" />

            <ScrollView
                className="flex-1 bg-white"
                contentContainerStyle={{ paddingBottom: 180 }}
            >
                {/* Header */}
                <View className="px-6 pt-4 pb-4">
                    <View className="flex-row items-center justify-between mx-auto w-full max-w-md">
                        <IconButton onPress={() => router.push("/map")}>
                            <Filter size={20} color="#0f172a" />
                        </IconButton>

                        <View className="items-center">
                            <Text className="text-2xl font-bold text-slate-900">Discover</Text>
                            <Text className="text-sm text-slate-500">
                                {profiles.length - currentIndex} profiles nearby
                            </Text>
                        </View>

                        <IconButton onPress={handleRewind} disabled={currentIndex === 0}>
                            <RotateCcw size={20} color="#0f172a" />
                        </IconButton>
                    </View>
                </View>

                {/* Swipe Cards Container */}
                <View className="px-6 items-center">
                    {currentIndex < profiles.length ? (
                        <View className="relative items-center">
                            {/* Preview under the active card */}
                            {currentIndex + 1 < profiles.length && (
                                <View
                                    pointerEvents="none"
                                    className="absolute inset-0 items-center justify-start pt-4 opacity-50"
                                    style={{ zIndex: 0 }}
                                >
                                    <SwipeCard profile={profiles[currentIndex + 1]} onSwipe={() => {}} />
                                </View>
                            )}

                            {/* Active card on top */}
                            <SwipeCard
                                key={currentProfile.id}
                                profile={currentProfile}
                                onSwipe={handleSwipe}
                            />
                        </View>
                    ) : (
                        <View className="items-center py-20">
                            <Sparkles size={64} color="#ff37ad" className="mb-6" />
                            <Text className="text-2xl font-bold text-slate-900 mb-2">
                                You're all caught up!
                            </Text>
                            <Text className="text-slate-600 mb-6">
                                Check back later for more amazing profiles
                            </Text>
                            <PrimaryButton
                                title="Start Over"
                                onPress={() => {
                                    setCurrentIndex(0);
                                    setProfiles([...mockProfiles]);
                                }}
                                className="w-40"
                            />
                        </View>
                    )}
                </View>
            </ScrollView>

            {/* Premium Suggestion (overlay above the tab bar) */}
            <View className="absolute bottom-28 left-6 right-6 z-40">
                <View className="mx-auto w-full max-w-md bg-white rounded-2xl p-4 border border-slate-200 shadow">
                    <View className="flex-row items-center space-x-3">
                        <View
                            className="w-12 h-12 rounded-full items-center justify-center"
                            style={{ backgroundColor: "#8b5cf6" }}
                        >
                            <Sparkles size={24} color="#fff" />
                        </View>
                        <View className="flex-1">
                            <Text className="text-slate-900 font-semibold">Get More Matches</Text>
                            <Text className="text-sm text-slate-600">
                                Upgrade to Premium for unlimited likes
                            </Text>
                        </View>
                        <PrimaryButton
                            title="Upgrade"
                            onPress={() => router.push("/premium")}
                            className="px-4 py-2"
                        />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}
