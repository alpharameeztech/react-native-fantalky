// app/(tabs)/five.tsx (Settings)
import React, { useState } from 'react';
import { View, Pressable, Switch, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

const TOKENS = {
    pagePad: 24,
    cardBg: '#14161c',
    cardBgAlt: '#181a20',
    border: '#2a2e36',
    text: '#f2f4f8',
    textMuted: '#c7cdd4',
    accent: '#ff37ad',
};

type Item = { icon: string; label: string };
type Group = { title: string; items: Item[] };

const settingsGroups: Group[] = [
    {
        title: 'Account',
        items: [
            { icon: 'person.crop.circle', label: 'Edit Profile' },
            { icon: 'creditcard', label: 'Subscription' },
            { icon: 'heart', label: 'Dating Preferences' },
        ],
    },
    {
        title: 'Privacy & Safety',
        items: [
            { icon: 'shield.fill', label: 'Privacy Settings' },
            { icon: 'mappin.and.ellipse', label: 'Location Settings' },
            { icon: 'bell', label: 'Blocked Users' },
        ],
    },
    {
        title: 'Support',
        items: [
            { icon: 'questionmark.circle', label: 'Help Center' },
            { icon: 'envelope', label: 'Contact Support' },
            { icon: 'hand.raised.fill', label: 'Safety Tips' },
        ],
    },
];

export default function TabFiveScreen() {
    const router = useRouter();
    const [notifications, setNotifications] = useState(true);
    const [locationSharing, setLocationSharing] = useState(true);
    const [onlineStatus, setOnlineStatus] = useState(true);

    const maxDistancePct = 0.5; // demo
    const ageRangePct = 0.75;   // demo

    return (
        <ScrollView
            contentContainerStyle={{ paddingHorizontal: TOKENS.pagePad, paddingBottom: 24 }}
            showsVerticalScrollIndicator={false}
        >
            {/* Profile Summary */}
            <ThemedView
                className="rounded-2xl mt-3 border p-4"
                style={{ backgroundColor: TOKENS.cardBg, borderColor: TOKENS.border }}
            >
                <View className="flex-row items-center">
                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1544006659-f0b21884ce1d?w=160&h=160&fit=crop' }}
                        contentFit="cover"
                        transition={150}
                        style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: '#22252b' }}
                    />
                    <View className="flex-1 ml-3">
                        <ThemedText type="defaultSemiBold" className="text-lg font-extrabold" style={{ color: TOKENS.text }}>
                            Alex, 28
                        </ThemedText>
                        <View className="flex-row items-center mt-1">
                            <IconSymbol name="mappin.and.ellipse" size={14} color={TOKENS.textMuted} />
                            <ThemedText className="ml-1.5 text-[13px]" style={{ color: TOKENS.textMuted }}>
                                New York, NY
                            </ThemedText>
                        </View>

                        {/* View Profile -> link */}
                        <Pressable
                            onPress={() => router.push('/(tabs)/profile')}
                            accessibilityRole="link"
                            accessibilityLabel="View Profile"
                            className="mt-2 self-start flex-row items-center rounded-full px-2.5 py-2 border"
                            style={{ backgroundColor: TOKENS.cardBgAlt, borderColor: TOKENS.border }}
                        >
                            <IconSymbol name="person.text.rectangle" size={14} color={TOKENS.accent} />
                            <ThemedText
                                type="defaultSemiBold"
                                className="ml-1.5 text-xs"
                                style={{ color: TOKENS.accent }}
                            >
                                View Profile
                            </ThemedText>
                        </Pressable>
                    </View>
                </View>
            </ThemedView>

            {/* Quick Toggles */}
            <ThemedView
                className="rounded-2xl mt-3 border p-4"
                style={{ backgroundColor: TOKENS.cardBg, borderColor: TOKENS.border }}
            >
                <ThemedText type="defaultSemiBold" className="mb-1.5 text-[15px]" style={{ color: TOKENS.text }}>
                    Quick Settings
                </ThemedText>

                <View className="py-3 flex-row items-center justify-between">
                    <View className="flex-row items-center" style={{ columnGap: 10 }}>
                        <IconSymbol name="bell" size={18} color={TOKENS.text} />
                        <View>
                            <ThemedText type="defaultSemiBold" className="text-[15px]" style={{ color: TOKENS.text }}>
                                Push Notifications
                            </ThemedText>
                            <ThemedText className="text-[13px]" style={{ color: TOKENS.textMuted }}>
                                Get notified of new matches
                            </ThemedText>
                        </View>
                    </View>
                    <Switch
                        value={notifications}
                        onValueChange={setNotifications}
                        trackColor={{ false: '#2b2f36', true: '#2b2f36' }}
                        thumbColor={notifications ? TOKENS.accent : '#7a7f86'}
                    />
                </View>

                <View className="py-3 flex-row items-center justify-between">
                    <View className="flex-row items-center" style={{ columnGap: 10 }}>
                        <IconSymbol name="mappin.and.ellipse" size={18} color={TOKENS.text} />
                        <View>
                            <ThemedText type="defaultSemiBold" className="text-[15px]" style={{ color: TOKENS.text }}>
                                Location Sharing
                            </ThemedText>
                            <ThemedText className="text-[13px]" style={{ color: TOKENS.textMuted }}>
                                Show me on the map
                            </ThemedText>
                        </View>
                    </View>
                    <Switch
                        value={locationSharing}
                        onValueChange={setLocationSharing}
                        trackColor={{ false: '#2b2f36', true: '#2b2f36' }}
                        thumbColor={locationSharing ? TOKENS.accent : '#7a7f86'}
                    />
                </View>

                <View className="py-3 flex-row items-center justify-between">
                    <View className="flex-row items-center" style={{ columnGap: 10 }}>
                        <IconSymbol name="person.crop.circle.badge.checkmark" size={18} color={TOKENS.text} />
                        <View>
                            <ThemedText type="defaultSemiBold" className="text-[15px]" style={{ color: TOKENS.text }}>
                                Online Status
                            </ThemedText>
                            <ThemedText className="text-[13px]" style={{ color: TOKENS.textMuted }}>
                                Show when I&apos;m active
                            </ThemedText>
                        </View>
                    </View>
                    <Switch
                        value={onlineStatus}
                        onValueChange={setOnlineStatus}
                        trackColor={{ false: '#2b2f36', true: '#2b2f36' }}
                        thumbColor={onlineStatus ? TOKENS.accent : '#7a7f86'}
                    />
                </View>
            </ThemedView>

            {/* Settings Groups */}
            {settingsGroups.map((group, gi) => (
                <ThemedView
                    key={gi}
                    className="rounded-2xl mt-3 border p-4"
                    style={{ backgroundColor: TOKENS.cardBg, borderColor: TOKENS.border }}
                >
                    <ThemedText type="defaultSemiBold" className="mb-1.5 text-[15px]" style={{ color: TOKENS.text }}>
                        {group.title}
                    </ThemedText>

                    {group.items.map((item, ii) => {
                        const isLast = ii === group.items.length - 1;
                        return (
                            <Pressable
                                key={ii}
                                className={`py-3 flex-row items-center justify-between ${!isLast ? 'border-b' : ''}`}
                                style={!isLast ? { borderColor: TOKENS.border } : undefined}
                            >
                                <View className="flex-row items-center" style={{ columnGap: 12 }}>
                                    <View
                                        className="items-center justify-center rounded-lg"
                                        style={{ width: 36, height: 36, backgroundColor: '#22252b' }}
                                    >
                                        <IconSymbol name={item.icon} size={18} color="#fff" />
                                    </View>
                                    <ThemedText type="defaultSemiBold" style={{ color: TOKENS.text }}>
                                        {item.label}
                                    </ThemedText>
                                </View>
                                <IconSymbol name="chevron.right" size={18} color={TOKENS.textMuted} />
                            </Pressable>
                        );
                    })}
                </ThemedView>
            ))}

            {/* Discovery Settings (static bars) */}
            <ThemedView
                className="rounded-2xl mt-3 border p-4"
                style={{ backgroundColor: TOKENS.cardBg, borderColor: TOKENS.border }}
            >
                <ThemedText type="defaultSemiBold" className="mb-1.5 text-[15px]" style={{ color: TOKENS.text }}>
                    Discovery Settings
                </ThemedText>

                <View className="mt-2">
                    <View className="flex-row items-center justify-between">
                        <ThemedText className="text-[13px]" style={{ color: TOKENS.textMuted }}>
                            Maximum Distance
                        </ThemedText>
                        <ThemedText type="defaultSemiBold" style={{ color: TOKENS.accent }}>
                            25 km
                        </ThemedText>
                    </View>
                    <View
                        className="w-full h-[10px] rounded-full overflow-hidden mt-1.5 border"
                        style={{ backgroundColor: '#232730', borderColor: TOKENS.border }}
                    >
                        <View style={{ width: `${maxDistancePct * 100}%`, height: '100%', backgroundColor: TOKENS.accent }} />
                    </View>
                </View>

                <View className="mt-3">
                    <View className="flex-row items-center justify-between">
                        <ThemedText className="text-[13px]" style={{ color: TOKENS.textMuted }}>
                            Age Range
                        </ThemedText>
                        <ThemedText type="defaultSemiBold" style={{ color: TOKENS.accent }}>
                            22 - 35
                        </ThemedText>
                    </View>
                    <View
                        className="w-full h-[10px] rounded-full overflow-hidden mt-1.5 border"
                        style={{ backgroundColor: '#232730', borderColor: TOKENS.border }}
                    >
                        <View style={{ width: `${ageRangePct * 100}%`, height: '100%', backgroundColor: TOKENS.accent }} />
                    </View>
                </View>
            </ThemedView>

            {/* Logout */}
            <ThemedView
                className="rounded-2xl mt-3 border p-4"
                style={{ backgroundColor: TOKENS.cardBg, borderColor: TOKENS.border }}
            >
                <Pressable
                    className="flex-row items-center justify-center gap-2 py-3 rounded-xl border"
                    style={{ backgroundColor: '#1d1f26', borderColor: TOKENS.border }}
                >
                    <IconSymbol name="rectangle.portrait.and.arrow.right" size={18} color="#ff3b30" />
                    <ThemedText type="defaultSemiBold" className="text-[15px]" style={{ color: '#ff3b30' }}>
                        Sign Out
                    </ThemedText>
                </Pressable>
            </ThemedView>
        </ScrollView>
    );
}
