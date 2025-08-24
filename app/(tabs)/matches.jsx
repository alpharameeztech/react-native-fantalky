// app/(tabs)/six.tsx
import React, { useMemo, useState } from 'react';
import { StyleSheet, View, Pressable, TextInput, FlatList, Dimensions } from 'react-native';
import { Image } from 'expo-image';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

const { width } = Dimensions.get('window');

const TOKENS = {
    pagePad: 24,
    cardBg: '#14161c',
    cardBgAlt: '#181a20',
    border: '#2a2e36',
    text: '#f2f4f8',
    textMuted: '#c7cdd4',
    accent: '#ff37ad',
    danger: '#ff3b30',
    badgeBg: '#e11d48',
    badgeText: '#fff',
    inputBg: '#1b1e25',
    placeholder: '#9aa3ad',
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
    const [searchQuery, setSearchQuery] = useState('');
    const matches = MOCK_MATCHES;

    const filtered = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();
        if (!q) return matches;
        return matches.filter(
            m =>
                m.name.toLowerCase().includes(q) ||
                m.location.toLowerCase().includes(q)
        );
    }, [searchQuery, matches]);

    const unreadCount = useMemo(
        () => filtered.filter(m => m.unreadCount > 0).length,
        [filtered]
    );

    const renderItem = ({ item }: { item: Match }) => (
        <Pressable style={styles.matchCard}>
            <View style={{ position: 'relative' }}>
                <Image source={{ uri: item.image }} style={styles.avatar} contentFit="cover" />
                {item.isOnline && <View style={styles.onlineDot} />}
            </View>

            <View style={{ flex: 1, marginLeft: 10 }}>
                <View style={styles.rowBetween}>
                    <ThemedText type="defaultSemiBold" style={styles.nameText}>
                        {item.name}, {item.age}
                    </ThemedText>

                    <ThemedText style={styles.timeText}>{item.lastMessageTime}</ThemedText>
                </View>

                <View style={styles.locRow}>
                    <IconSymbol name="mappin.and.ellipse" size={12} color={TOKENS.textMuted} />
                    <ThemedText style={styles.locText}>{item.location}</ThemedText>
                </View>

                <View style={styles.rowBetween}>
                    <ThemedText numberOfLines={1} style={styles.lastMsg}>
                        {item.lastMessage}
                    </ThemedText>

                    {item.unreadCount > 0 ? (
                        <View style={styles.badge}>
                            <ThemedText style={styles.badgeLabel}>{item.unreadCount}</ThemedText>
                        </View>
                    ) : (
                        <IconSymbol name="chevron.right" size={16} color={TOKENS.textMuted} />
                    )}
                </View>
            </View>
        </Pressable>
    );

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
            headerImage={
                <ThemedView style={styles.headerWrap}>
                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1516383607781-913a19294fd1?q=80&w=1600&auto=format&fit=crop' }}
                        style={styles.headerPhoto}
                        contentFit="cover"
                    />

                    <ThemedView style={styles.headerPill}>
                        <IconSymbol name="bubble.left.and.bubble.right.fill" size={16} color="#fff" />
                        <ThemedText type="defaultSemiBold" style={styles.headerPillText}>
                            Your Matches
                        </ThemedText>
                    </ThemedView>

                    {/* Search */}
                    <ThemedView style={styles.searchWrap}>
                        <IconSymbol name="magnifyingglass" size={16} color={TOKENS.textMuted} />
                        <TextInput
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            placeholder="Search matches..."
                            placeholderTextColor={TOKENS.placeholder}
                            style={styles.searchInput}
                        />
                    </ThemedView>
                </ThemedView>
            }
        >
            {/* Stats */}
            <View style={styles.statsWrap}>
                <ThemedText style={styles.statsText}>
                    {filtered.length} matches • {unreadCount} unread
                </ThemedText>
            </View>

            {/* Matches list */}
            <FlatList
                data={filtered}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                contentContainerStyle={{ paddingHorizontal: TOKENS.pagePad, paddingBottom: 140 }}
                ListEmptyComponent={
                    <ThemedView style={styles.emptyWrap}>
                        <View style={styles.emptyCircle}>
                            <IconSymbol name="sparkles" size={28} color="#fff" />
                        </View>
                        <ThemedText type="defaultSemiBold" style={styles.emptyTitle}>
                            {searchQuery ? 'No matches found' : 'No matches yet'}
                        </ThemedText>
                        <ThemedText style={styles.emptySub}>
                            {searchQuery ? 'Try adjusting your search' : 'Start swiping to find your perfect match!'}
                        </ThemedText>
                        {!searchQuery && (
                            <Pressable style={styles.discoverBtn}>
                                <IconSymbol name="compass.fill" size={16} color="#fff" />
                                <ThemedText type="defaultSemiBold" style={styles.discoverBtnText}>
                                    Start Discovering
                                </ThemedText>
                            </Pressable>
                        )}
                    </ThemedView>
                }
            />

            {/* Premium CTA (fixed) */}
            <View style={styles.premiumWrap}>
                <ThemedView style={styles.premiumCard}>
                    <View style={styles.premiumIconCircle}>
                        <IconSymbol name="sparkles" size={22} color="#fff" />
                    </View>
                    <View style={{ flex: 1 }}>
                        <ThemedText type="defaultSemiBold" style={styles.premiumTitle}>
                            See Who Likes You
                        </ThemedText>
                        <ThemedText style={styles.premiumSub}>
                            Get instant matches with Premium
                        </ThemedText>
                    </View>
                    <Pressable style={styles.upgradeBtn}>
                        <ThemedText type="defaultSemiBold" style={styles.upgradeBtnText}>
                            Upgrade
                        </ThemedText>
                    </Pressable>
                </ThemedView>
            </View>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    // Header with image and search
    headerWrap: {
        height: 220,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        overflow: 'hidden',
        justifyContent: 'flex-end',
        paddingBottom: 12,
    },
    headerPhoto: { width: '100%', height: '100%', position: 'absolute', left: 0, top: 0 },
    headerPill: {
        alignSelf: 'flex-start',
        marginLeft: TOKENS.pagePad,
        backgroundColor: '#5b6cff',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    headerPillText: { color: '#fff', fontSize: 12 },
    searchWrap: {
        marginTop: 10,
        marginHorizontal: TOKENS.pagePad,
        backgroundColor: TOKENS.inputBg,
        borderRadius: 14,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: TOKENS.border,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    searchInput: {
        flex: 1,
        color: TOKENS.text,
        fontSize: 14,
        paddingVertical: 2,
    },

    // Stats
    statsWrap: { paddingHorizontal: TOKENS.pagePad, paddingTop: 12, paddingBottom: 6 },
    statsText: { color: TOKENS.textMuted, fontSize: 12 },

    // Match card
    matchCard: {
        backgroundColor: TOKENS.cardBg,
        borderRadius: 16,
        padding: 12,
        marginTop: 10,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: TOKENS.border,
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: { width: 52, height: 52, borderRadius: 26, backgroundColor: '#22252b' },
    onlineDot: {
        position: 'absolute',
        right: -2,
        top: -2,
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: '#22c55e',
        borderWidth: 2,
        borderColor: TOKENS.cardBg,
    },
    nameText: { color: TOKENS.text, fontSize: 15 },
    timeText: { color: TOKENS.textMuted, fontSize: 12 },
    locRow: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
    locText: { color: TOKENS.textMuted, fontSize: 12, marginLeft: 4 },
    lastMsg: { color: TOKENS.text, opacity: 0.9, fontSize: 13, marginTop: 6, flex: 1, marginRight: 8 },

    badge: {
        minWidth: 22,
        height: 22,
        borderRadius: 11,
        backgroundColor: TOKENS.badgeBg,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 6,
    },
    badgeLabel: { color: TOKENS.badgeText, fontSize: 12 },

    rowBetween: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },

    // Empty state
    emptyWrap: {
        marginTop: 28,
        paddingHorizontal: TOKENS.pagePad,
        alignItems: 'center',
    },
    emptyCircle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: TOKENS.accent,
        opacity: 0.85,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    emptyTitle: { color: TOKENS.text, fontSize: 18, marginBottom: 6 },
    emptySub: { color: TOKENS.textMuted, textAlign: 'center', marginBottom: 14 },
    discoverBtn: {
        backgroundColor: TOKENS.accent,
        paddingHorizontal: 14,
        paddingVertical: 12,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    discoverBtnText: { color: '#fff', fontSize: 14 },

    // Premium CTA
    premiumWrap: {
        position: 'absolute',
        left: TOKENS.pagePad,
        right: TOKENS.pagePad,
        bottom: 90,
    },
    premiumCard: {
        backgroundColor: TOKENS.cardBgAlt,
        borderRadius: 18,
        padding: 12,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: TOKENS.border,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    premiumIconCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: TOKENS.accent,
        alignItems: 'center',
        justifyContent: 'center',
    },
    premiumTitle: { color: TOKENS.text },
    premiumSub: { color: TOKENS.textMuted, fontSize: 12 },
    upgradeBtn: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor: TOKENS.accent,
        borderRadius: 10,
    },
    upgradeBtnText: { color: '#fff', fontSize: 13 },
});
