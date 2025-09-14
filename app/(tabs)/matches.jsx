// app/(tabs)/six.tsx
import React, { useMemo } from 'react';
import { View, Pressable, ScrollView } from 'react-native';
import { Image } from 'expo-image';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

const TOKENS = {
    pagePad: 24,
    cardBg: '#ffffff',
    cardBgAlt: '#f9fafb',
    border: '#e5e7eb',
    text: '#0f172a',
    textMuted: '#64748b',
    accent: '#ff37ad',
    badgeBg: '#e11d48',
    badgeText: '#ffffff',
};

type Match = {
    id: string;
    name: string;
    age: number;
    location: string;
    lastMessage: string;
    lastMessageTime: string;
    image: string;
    isOnline: boolean;
    unreadCount: number;
};

const MOCK_MATCHES: Match[] = [
    {
        id: '1',
        name: 'Emma',
        age: 28,
        location: 'New York, NY',
        lastMessage: 'Hey! Thanks for the match ✨',
        lastMessageTime: '2m',
        image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop',
        isOnline: true,
        unreadCount: 2,
    },
    {
        id: '2',
        name: 'Sophie',
        age: 26,
        location: 'Manhattan, NY',
        lastMessage: 'I love your travel photos!',
        lastMessageTime: '1h',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
        isOnline: false,
        unreadCount: 1,
    },
    {
        id: '3',
        name: 'Maya',
        age: 30,
        location: 'Brooklyn, NY',
        lastMessage: 'Coffee this weekend?',
        lastMessageTime: '3h',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop',
        isOnline: true,
        unreadCount: 0,
    },
    {
        id: '4',
        name: 'Aria',
        age: 27,
        location: 'Queens, NY',
        lastMessage: 'Nice to meet you!',
        lastMessageTime: '1d',
        image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop',
        isOnline: false,
        unreadCount: 0,
    },
];

export default function TabSixScreen() {
    const matches = MOCK_MATCHES;
    const unreadThreads = useMemo(
        () => matches.filter(m => m.unreadCount > 0).length,
        [matches]
    );

    const MatchCard = ({ item }: { item: Match }) => (
        <Pressable
            key={item.id}
            className="w-full self-stretch rounded-2xl p-3 mt-3 flex-row items-center border"
            style={{ backgroundColor: TOKENS.cardBg, borderColor: TOKENS.border }}
        >
            {/* Avatar */}
            <View style={{ position: 'relative' }}>
                <Image
                    source={{ uri: item.image }}
                    contentFit="cover"
                    style={{ width: 52, height: 52, borderRadius: 26, backgroundColor: '#e5e7eb' }}
                />
                {item.isOnline && (
                    <View
                        className="absolute"
                        style={{
                            right: -2,
                            top: -2,
                            width: 14,
                            height: 14,
                            borderRadius: 7,
                            backgroundColor: '#22c55e',
                            borderWidth: 2,
                            borderColor: TOKENS.cardBg,
                        }}
                    />
                )}
            </View>

            {/* Message meta */}
            <View className="flex-1 ml-3">
                <View className="flex-row items-center justify-between">
                    <ThemedText type="defaultSemiBold" style={{ color: TOKENS.text, fontSize: 16 }}>
                        {item.name}, {item.age}
                    </ThemedText>
                    <ThemedText style={{ color: TOKENS.textMuted, fontSize: 12 }}>
                        {item.lastMessageTime}
                    </ThemedText>
                </View>

                <View className="flex-row items-center mt-0.5">
                    <IconSymbol name="mappin.and.ellipse" size={12} color={TOKENS.textMuted} />
                    <ThemedText style={{ color: TOKENS.textMuted, fontSize: 12, marginLeft: 4 }}>
                        {item.location}
                    </ThemedText>
                </View>

                <View className="flex-row items-center justify-between">
                    <ThemedText
                        numberOfLines={1}
                        style={{ color: TOKENS.text, fontSize: 14, marginTop: 6, flex: 1, marginRight: 8 }}
                    >
                        {item.lastMessage}
                    </ThemedText>

                    {item.unreadCount > 0 ? (
                        <View
                            className="items-center justify-center"
                            style={{
                                minWidth: 22,
                                height: 22,
                                borderRadius: 11,
                                backgroundColor: TOKENS.badgeBg,
                                paddingHorizontal: 6,
                            }}
                        >
                            <ThemedText style={{ color: TOKENS.badgeText, fontSize: 12 }}>
                                {item.unreadCount}
                            </ThemedText>
                        </View>
                    ) : (
                        <IconSymbol name="chevron.right" size={16} color={TOKENS.textMuted} />
                    )}
                </View>
            </View>
        </Pressable>
    );

    return (
        <View className="flex-1 bg-white">
            <ScrollView
                contentContainerStyle={{ paddingHorizontal: TOKENS.pagePad, paddingTop: 12, paddingBottom: 140 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Top stats */}
                <View className="pb-1">
                    <ThemedText style={{ color: TOKENS.textMuted, fontSize: 12 }}>
                        {matches.length} messages • {unreadThreads} unread
                    </ThemedText>
                </View>

                {/* Message list */}
                <View className="w-full">
                    {matches.map(m => (
                        <MatchCard key={m.id} item={m} />
                    ))}
                </View>
            </ScrollView>

            {/* Premium CTA (fixed) */}
            <View style={{ position: 'absolute', left: TOKENS.pagePad, right: TOKENS.pagePad, bottom: 90 }}>
                <ThemedView
                    className="rounded-2xl flex-row items-center border"
                    style={{ backgroundColor: TOKENS.cardBgAlt, padding: 12, gap: 12, borderColor: TOKENS.border }}
                >
                    <View
                        className="items-center justify-center"
                        style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: TOKENS.accent }}
                    >
                        <IconSymbol name="sparkles" size={22} color="#fff" />
                    </View>
                    <View className="flex-1">
                        <ThemedText type="defaultSemiBold" style={{ color: TOKENS.text }}>
                            See Who Likes You
                        </ThemedText>
                        <ThemedText style={{ color: TOKENS.textMuted, fontSize: 12 }}>
                            Get instant matches with Premium
                        </ThemedText>
                    </View>
                    <Pressable className="rounded-lg" style={{ backgroundColor: TOKENS.accent, paddingHorizontal: 12, paddingVertical: 8 }}>
                        <ThemedText type="defaultSemiBold" className="text-white text-[13px]">
                            Upgrade
                        </ThemedText>
                    </Pressable>
                </ThemedView>
            </View>
        </View>
    );
}
