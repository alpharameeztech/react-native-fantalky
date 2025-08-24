// app/(tabs)/four.tsx
import React from 'react';
import { StyleSheet, View, Pressable, Dimensions } from 'react-native';
import { Image } from 'expo-image';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

const { width } = Dimensions.get('window');

// simple tokens for consistent contrast on dark UI
const TOKENS = {
    cardBg: '#14161c',
    cardBgAlt: '#181a20',
    border: '#2a2e36',
    text: '#f2f4f8',
    textMuted: '#c7cdd4',
    accent: '#ff37ad',
    accentSoftBg: 'rgba(255,55,173,0.16)',
    accentSoftBorder: 'rgba(255,55,173,0.28)',
    chipText: '#ff9bd1',
};

const dummyProfile = {
    name: 'Alex',
    age: 28,
    location: 'New York, NY',
    bio:
        'Adventure seeker, coffee lover, and dog parent. Looking for genuine connections and shared experiences.',
    occupation: 'Software Engineer',
    // dummy images only, no backend calls
    images: [
        'https://images.unsplash.com/photo-1544006659-f0b21884ce1d?w=800&h=1200&fit=crop',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&h=1200&fit=crop',
        'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=800&h=1200&fit=crop',
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=1200&fit=crop',
        'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=800&h=1200&fit=crop',
        'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=800&h=1200&fit=crop',
    ],
    interests: ['Photography', 'Hiking', 'Coffee', 'Travel', 'Music', 'Cooking'],
    stats: { matches: 124, likes: 89, superLikes: 12 },
};

const GRID_COLS = 3;
const GAP = 8;
const H_MARGIN = 24;
const TILE_W = (width - H_MARGIN * 2 - GAP * (GRID_COLS - 1)) / GRID_COLS;

export default function TabFourScreen() {
    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
            headerImage={
                <ThemedView style={styles.headerWrap}>
                    <Image
                        source={{
                            uri: 'https://images.unsplash.com/photo-1520975930498-0f8d7a6a1533?q=80&w=1600&auto=format&fit=crop',
                        }}
                        contentFit="cover"
                        style={styles.headerPhoto}
                    />

                    {/* Title pill */}
                    <ThemedView style={styles.headerPill}>
                        <IconSymbol name="person.crop.circle.fill" size={16} color="#fff" />
                        <ThemedText type="defaultSemiBold" style={styles.headerPillText}>
                            My Profile
                        </ThemedText>
                    </ThemedView>

                    {/* Actions */}
                    <View style={styles.headerActions}>
                        <Pressable style={styles.headerIconBtn}>
                            <IconSymbol name="gearshape.fill" size={18} color="#fff" />
                        </Pressable>
                        <Pressable style={styles.headerIconBtn}>
                            <IconSymbol name="camera.fill" size={18} color="#fff" />
                        </Pressable>
                    </View>
                </ThemedView>
            }
        >
            {/* Images grid */}
            <ThemedView style={[styles.card, { padding: 12 }]}>
                <View style={styles.gridRow}>
                    {dummyProfile.images.map((uri, i) => (
                        <View
                            key={i}
                            style={[styles.tile, { width: TILE_W, height: TILE_W * 1.33 }]}
                        >
                            <Image
                                source={{ uri }}
                                style={styles.tileImg}
                                contentFit="cover"
                                transition={150}
                            />
                            {i === 0 && (
                                <View style={styles.onlineDotWrap}>
                                    <View style={styles.onlineDot} />
                                </View>
                            )}
                        </View>
                    ))}
                </View>
            </ThemedView>

            {/* Info card */}
            <ThemedView style={styles.card}>
                <View style={styles.rowBetween}>
                    <View style={{ flex: 1, paddingRight: 12 }}>
                        <ThemedText type="title" style={styles.title}>
                            {dummyProfile.name}, {dummyProfile.age}
                        </ThemedText>
                        <View style={styles.locRow}>
                            <IconSymbol name="mappin.and.ellipse" size={14} color={TOKENS.textMuted} />
                            <ThemedText style={styles.muted}>{dummyProfile.location}</ThemedText>
                        </View>
                    </View>

                    <Pressable style={styles.iconChip}>
                        <IconSymbol name="pencil" size={14} color="#fff" />
                        <ThemedText type="defaultSemiBold" style={styles.iconChipText}>
                            Edit
                        </ThemedText>
                    </Pressable>
                </View>

                <ThemedText style={styles.bio}>{dummyProfile.bio}</ThemedText>
                <ThemedText type="defaultSemiBold" style={styles.occupation}>
                    {dummyProfile.occupation}
                </ThemedText>

                {/* Interests */}
                <ThemedText type="defaultSemiBold" style={styles.sectionHeading}>
                    Interests
                </ThemedText>
                <View style={styles.chipsWrap}>
                    {dummyProfile.interests.map((tag, idx) => (
                        <View key={idx} style={styles.chip}>
                            <ThemedText type="defaultSemiBold" style={styles.chipText}>
                                {tag}
                            </ThemedText>
                        </View>
                    ))}
                </View>
            </ThemedView>

            {/* Stats */}
            <View style={styles.statsRow}>
                <ThemedView style={styles.statCard}>
                    <IconSymbol name="heart.fill" size={18} color="#ef4444" />
                    <ThemedText type="subtitle" style={styles.statValue}>
                        {dummyProfile.stats.matches}
                    </ThemedText>
                    <ThemedText style={styles.statLabel}>Matches</ThemedText>
                </ThemedView>

                <ThemedView style={styles.statCard}>
                    <IconSymbol name="message.fill" size={18} color="#3b82f6" />
                    <ThemedText type="subtitle" style={styles.statValue}>
                        {dummyProfile.stats.likes}
                    </ThemedText>
                    <ThemedText style={styles.statLabel}>Likes</ThemedText>
                </ThemedView>

                <ThemedView style={styles.statCard}>
                    <IconSymbol name="star.fill" size={18} color="#f59e0b" />
                    <ThemedText type="subtitle" style={styles.statValue}>
                        {dummyProfile.stats.superLikes}
                    </ThemedText>
                    <ThemedText style={styles.statLabel}>Super Likes</ThemedText>
                </ThemedView>
            </View>

            {/* Actions */}
            <ThemedView style={[styles.card, { gap: 10 }]}>
                <Pressable style={styles.primaryBtn}>
                    <IconSymbol name="camera.fill" size={16} color="#fff" />
                    <ThemedText type="defaultSemiBold" style={styles.primaryBtnText}>
                        Manage Photos
                    </ThemedText>
                </Pressable>

                <Pressable style={styles.secondaryBtn}>
                    <IconSymbol name="gearshape.fill" size={16} color={TOKENS.accent} />
                    <ThemedText type="defaultSemiBold" style={styles.secondaryBtnText}>
                        Account Settings
                    </ThemedText>
                </Pressable>
            </ThemedView>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    // Header
    headerWrap: {
        height: 220,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        overflow: 'hidden',
    },
    headerPhoto: { width: '100%', height: '100%' },
    headerPill: {
        position: 'absolute',
        top: 12,
        left: 12,
        backgroundColor: '#5b6cff',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    headerPillText: { color: '#fff', fontSize: 12 },
    headerActions: {
        position: 'absolute',
        top: 12,
        right: 12,
        flexDirection: 'row',
        gap: 8,
    },
    headerIconBtn: {
        backgroundColor: 'rgba(0,0,0,0.55)',
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 16,
    },

    // Cards and common
    card: {
        backgroundColor: TOKENS.cardBg,
        borderRadius: 20,
        padding: 16,
        marginTop: 12,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: TOKENS.border,
    },
    rowBetween: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    title: { fontSize: 24, fontWeight: '800', color: TOKENS.text },
    muted: { color: TOKENS.textMuted, fontSize: 13, marginLeft: 6 },

    bio: { color: TOKENS.text, opacity: 0.96, lineHeight: 20, marginTop: 8 },
    occupation: { color: TOKENS.text, marginTop: 10 },
    sectionHeading: { marginTop: 14, color: TOKENS.text },

    // Location row
    locRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },

    // Edit chip
    iconChip: {
        backgroundColor: TOKENS.cardBgAlt,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: TOKENS.border,
    },
    iconChipText: { color: '#fff', fontSize: 13 },

    // Grid
    gridRow: { flexDirection: 'row', flexWrap: 'wrap', gap: GAP, justifyContent: 'space-between' },
    tile: { borderRadius: 16, overflow: 'hidden', backgroundColor: '#22252b' },
    tileImg: { width: '100%', height: '100%' },
    onlineDotWrap: { position: 'absolute', top: 6, left: 6 },
    onlineDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#22c55e',
        borderWidth: 2,
        borderColor: '#fff',
    },

    // Interests chips
    chipsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 10 },
    chip: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 999,
        backgroundColor: TOKENS.accentSoftBg,
        borderWidth: 1,
        borderColor: TOKENS.accentSoftBorder,
    },
    chipText: { color: TOKENS.chipText, fontSize: 12 },

    // Stats
    statsRow: { flexDirection: 'row', gap: 10, paddingHorizontal: H_MARGIN, marginTop: 12 },
    statCard: {
        flex: 1,
        backgroundColor: TOKENS.cardBg,
        borderRadius: 16,
        paddingVertical: 12,
        alignItems: 'center',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: TOKENS.border,
    },
    statValue: { color: TOKENS.accent, marginTop: 4 },
    statLabel: { color: TOKENS.textMuted, fontSize: 12, marginTop: 2 },

    // Buttons
    primaryBtn: {
        backgroundColor: TOKENS.accent,
        borderRadius: 14,
        paddingVertical: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    primaryBtnText: { color: '#fff', fontSize: 15 },
    secondaryBtn: {
        backgroundColor: TOKENS.cardBgAlt,
        borderRadius: 14,
        paddingVertical: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        borderWidth: 1,
        borderColor: TOKENS.border,
    },
    secondaryBtnText: { color: TOKENS.accent, fontSize: 15 },
});
