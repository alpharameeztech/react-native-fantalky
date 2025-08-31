import React, { useMemo, useState } from 'react';
import { View, Pressable, Switch, StyleSheet } from 'react-native';
import { Image } from 'expo-image';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

type NearbyUser = {
    id: string;
    name: string;
    age: number;
    distance: number; // km
    isOnline: boolean;
    image: string;
};

const nearbyUsers: NearbyUser[] = [
    { id: '1', name: 'Emma',    age: 28, distance: 0.5, isOnline: true,  image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&h=200&q=80' },
    { id: '2', name: 'James',   age: 32, distance: 1.2, isOnline: true,  image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80' },
    { id: '3', name: 'Sophie',  age: 26, distance: 2.1, isOnline: false, image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&h=200&q=80' },
    { id: '4', name: 'Michael', age: 30, distance: 3.4, isOnline: true,  image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80' },
];

const locations = [
    { name: 'Manhattan', count: 127, distance: '2.5 km' },
    { name: 'Brooklyn',  count: 89,  distance: '8.2 km' },
    { name: 'Queens',    count: 64,  distance: '12.1 km' },
    { name: 'Bronx',     count: 43,  distance: '15.7 km' },
];

const BLURHASH = 'L6Pj0^i_.AyE_3t7t7R**0o#DgR4';

export default function TabThreeScreen() {
    const [isMapEnabled, setIsMapEnabled] = useState(true);
    const onlineCount = useMemo(() => nearbyUsers.filter(u => u.isOnline).length, []);

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#f3f4f6', dark: '#f3f4f6' }}
            headerImage={
                <ThemedView className="h-56 rounded-b-3xl overflow-hidden bg-slate-200">
                    {/* Banner image — use explicit size */}
                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=80' }}
                        placeholder={BLURHASH}
                        contentFit="cover"
                        cachePolicy="memory-disk"
                        style={{ width: '100%', height: '100%' }}
                    />

                    {/* Header pill */}
                    <ThemedView className="absolute top-3 left-3 bg-violet-600 px-3 py-1 rounded-full flex-row items-center gap-1.5">
                        <IconSymbol name="star.fill" size={14} color="#fff" />
                        <ThemedText type="defaultSemiBold" className="text-white text-xs">
                            Map Discovery
                        </ThemedText>
                    </ThemedView>

                    {/* Header actions */}
                    <View className="absolute top-3 right-3 flex-row gap-2">
                        <Pressable className="bg-white/90 px-2.5 py-2 rounded-xl border border-slate-200">
                            <IconSymbol name="line.3.horizontal.decrease.circle" size={18} color="#0f172a" />
                        </Pressable>
                        <Pressable className="bg-white/90 px-2.5 py-2 rounded-xl border border-slate-200">
                            <IconSymbol name="location.circle" size={18} color="#0f172a" />
                        </Pressable>
                    </View>
                </ThemedView>
            }
        >
            {/* Top info card */}
            <ThemedView className="bg-white rounded-2xl p-4 mt-3 border border-slate-200">
                <View className="flex-row items-center justify-between">
                    <View>
                        <ThemedText type="subtitle" className="text-slate-900 font-extrabold">
                            Map Discovery
                        </ThemedText>
                        <ThemedText className="text-slate-500 text-xs mt-0.5">
                            {onlineCount} people online nearby
                        </ThemedText>
                    </View>

                    <Pressable className="bg-slate-900 px-3 py-2 rounded-lg flex-row items-center gap-1.5">
                        <IconSymbol name="chevron.right" size={14} color="#fff" />
                        <ThemedText type="defaultSemiBold" className="text-white text-xs">Discover</ThemedText>
                    </Pressable>
                </View>
            </ThemedView>

            {/* Location sharing toggle */}
            <ThemedView className="bg-white rounded-2xl p-4 mt-3 border border-slate-200">
                <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center gap-2.5">
                        <View className="w-2 h-2 rounded-full bg-emerald-500" />
                        <View>
                            <ThemedText type="defaultSemiBold" className="text-slate-900 text-base">
                                Location Sharing
                            </ThemedText>
                            <ThemedText className="text-slate-500 text-xs">
                                Show me on the map to others
                            </ThemedText>
                        </View>
                    </View>

                    <Switch
                        value={isMapEnabled}
                        onValueChange={setIsMapEnabled}
                        trackColor={{ false: '#e5e7eb', true: '#e5e7eb' }}
                        thumbColor={isMapEnabled ? '#ff37ad' : '#9ca3af'}
                    />
                </View>
            </ThemedView>

            {/* Mock Map */}
            <ThemedView className="bg-white rounded-2xl p-4 mt-3 border border-slate-200">
                <View className="relative rounded-2xl overflow-hidden" style={{ width: '100%', aspectRatio: 1 }}>
                    {/* soft background layers */}
                    <View className="absolute inset-0 bg-blue-100" />
                    <View className="absolute inset-0 opacity-60" style={{ transform: [{ rotate: '12deg' }] }}>
                        <View className="absolute inset-0 bg-green-100" />
                    </View>

                    {/* pins */}
                    {nearbyUsers.map((u, idx) => {
                        const left = 20 + (idx * 15);
                        const top = 25 + (idx * 12);
                        return (
                            <View
                                key={u.id}
                                className={`absolute w-12 h-12 rounded-full border-4 border-white overflow-hidden ${u.isOnline ? 'ring-2 ring-emerald-400' : ''}`}
                                style={{ left: `${left}%`, top: `${top}%` }}
                            >
                                {/* Avatar image — explicit size inside rounded container */}
                                <Image
                                    source={{ uri: u.image }}
                                    placeholder={BLURHASH}
                                    contentFit="cover"
                                    cachePolicy="memory-disk"
                                    style={{ width: '100%', height: '100%' }}
                                />
                                {u.isOnline && (
                                    <View className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white" />
                                )}
                            </View>
                        );
                    })}

                    {/* current user dot */}
                    <View className="absolute left-1/2 top-1/2 -ml-1.5 -mt-1.5 w-3 h-3 rounded-full bg-indigo-500 border-4 border-white" />
                </View>

                <View className="mt-2 self-center flex-row items-center">
                    <IconSymbol name="mappin.and.ellipse" size={14} color="#64748b" />
                    <ThemedText className="ml-1.5 text-slate-500 text-xs">
                        New York, NY · Showing {nearbyUsers.length} nearby users
                    </ThemedText>
                </View>
            </ThemedView>

            {/* People Nearby */}
            <ThemedView className="bg-white rounded-2xl p-4 mt-3 border border-slate-200">
                <View className="flex-row items-center gap-2 mb-2">
                    <IconSymbol name="person.2.fill" size={16} color="#0f172a" />
                    <ThemedText type="defaultSemiBold" className="text-slate-900">
                        People Nearby
                    </ThemedText>
                </View>

                {nearbyUsers.map(u => (
                    <View key={u.id} className="flex-row items-center p-3 rounded-xl mb-2 bg-white border border-slate-200">
                        <View className="relative">
                            <Image
                                source={{ uri: u.image }}
                                placeholder={BLURHASH}
                                contentFit="cover"
                                cachePolicy="memory-disk"
                                style={{ width: 48, height: 48, borderRadius: 24 }}
                            />
                            {u.isOnline && (
                                <View className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white" />
                            )}
                        </View>

                        <View className="flex-1 ml-3">
                            <ThemedText type="defaultSemiBold" className="text-slate-900">
                                {u.name}, {u.age}
                            </ThemedText>
                            <View className="flex-row items-center mt-0.5">
                                <IconSymbol name="mappin" size={12} color="#64748b" />
                                <ThemedText className="ml-1 text-xs text-slate-500">{u.distance} km away</ThemedText>
                            </View>
                        </View>

                        <View className={`px-2 py-1 rounded-full ${u.isOnline ? 'bg-emerald-50' : 'bg-slate-100'}`}>
                            <ThemedText className={`text-xs ${u.isOnline ? 'text-emerald-700' : 'text-slate-600'}`}>
                                {u.isOnline ? 'Online' : 'Offline'}
                            </ThemedText>
                        </View>
                    </View>
                ))}
            </ThemedView>

            {/* Popular Areas */}
            <ThemedView className="bg-white rounded-2xl p-4 mt-3 mb-4 border border-slate-200">
                <ThemedText type="defaultSemiBold" className="text-slate-900 mb-3">
                    Popular Areas
                </ThemedText>

                <View className="flex-row flex-wrap -mx-1">
                    {locations.map((loc, i) => (
                        <View key={i} className="w-1/2 px-1 mb-2">
                            <View className="items-center p-3 rounded-xl bg-white border border-slate-200">
                                <ThemedText type="defaultSemiBold" className="text-slate-900">{loc.name}</ThemedText>
                                <ThemedText className="text-2xl font-extrabold text-pink-600">{loc.count}</ThemedText>
                                <ThemedText className="text-xs text-slate-500">{loc.distance}</ThemedText>
                            </View>
                        </View>
                    ))}
                </View>
            </ThemedView>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({});
