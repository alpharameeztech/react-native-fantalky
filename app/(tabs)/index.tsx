// app/(tabs)/index.tsx — Home/Discover screen matching the Profile screen style (frontend-only, no helpers)
import React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { Image } from 'expo-image';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function HomeScreen() {
    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#000000', dark: '#000000' }}
            headerImage={
                <ThemedView style={styles.headerWrap}>
                    <Image
                        source={{
                            uri:
                                'https://images.unsplash.com/photo-1516383074327-6b1b3b2c5a43?q=80&w=1600&auto=format&fit=crop',
                        }}
                        contentFit="cover"
                        style={styles.headerPhoto}
                    />
                    {/* Left pill */}
                    <ThemedView style={styles.pillLeft}>
                        <IconSymbol name="mappin.and.ellipse" size={14} color="#fff" />
                        <ThemedText type="defaultSemiBold" style={styles.pillText}>
                            Nearby
                        </ThemedText>
                    </ThemedView>
                    {/* Right pill */}
                    <Pressable style={styles.pillRight}>
                        <IconSymbol name="slider.horizontal.3" size={14} color="#fff" />
                        <ThemedText type="defaultSemiBold" style={styles.pillText}>
                            Filters
                        </ThemedText>
                    </Pressable>
                </ThemedView>
            }
        >
            {/* Search */}
            <ThemedView style={styles.searchBar}>
                <IconSymbol name="magnifyingglass" size={16} color="#bfc2c7" />
                <ThemedText style={styles.searchPlaceholder}>Search by name or interests…</ThemedText>
            </ThemedView>

            {/* Chips */}
            <View style={styles.chipsRow}>
                <Pressable style={[styles.chip, styles.chipPrimary]}>
                    <IconSymbol name="mappin.and.ellipse" size={14} color="#fff" />
                    <ThemedText type="defaultSemiBold" style={styles.chipText}>Within 5 km</ThemedText>
                </Pressable>
                <Pressable style={styles.chip}>
                    <ThemedText type="defaultSemiBold" style={styles.chipText}>Online now</ThemedText>
                </Pressable>
                <Pressable style={styles.chip}>
                    <ThemedText type="defaultSemiBold" style={styles.chipText}>Creators</ThemedText>
                </Pressable>
                <Pressable style={styles.chip}>
                    <ThemedText type="defaultSemiBold" style={styles.chipText}>Available</ThemedText>
                </Pressable>
            </View>

            {/* Featured card */}
            <ThemedView style={styles.card}>
                {/* Corner avatar */}
                <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=200&auto=format&fit=crop' }}
                    style={styles.cornerAvatar}
                />

                {/* Top labels over photo */}
                <View style={styles.cardTopRow}>
                    <ThemedText type="defaultSemiBold" style={styles.cardNameTop}>Emma</ThemedText>
                    <View style={styles.badgesRow}>
                        <View style={[styles.badge, { backgroundColor: '#20c997' }]}>
                            <ThemedText style={styles.badgeText}>Online</ThemedText>
                        </View>
                        <View style={[styles.badge, { backgroundColor: '#ff5c93' }]}>
                            <ThemedText style={styles.badgeText}>Available</ThemedText>
                        </View>
                        <View style={[styles.badge, { backgroundColor: '#3aa7ff' }]}>
                            <IconSymbol name="star.fill" size={12} color="#fff" />
                            <ThemedText style={[styles.badgeText, { marginLeft: 4 }]}>Creator</ThemedText>
                        </View>
                    </View>
                    <View style={styles.photoCount}>
                        <IconSymbol name="camera.fill" size={14} color="#fff" />
                        <ThemedText style={styles.photoCountText}>1</ThemedText>
                    </View>
                </View>

                {/* Big photo area */}
                <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop' }}
                    contentFit="cover"
                    style={styles.heroPhoto}
                />

                {/* Actions */}
                <View style={styles.actionsRow}>
                    <View style={styles.actionCircleGhost}>
                        <ThemedText style={styles.actionGhostX}>×</ThemedText>
                    </View>
                    <View style={styles.actionCirclePrimary}>
                        <IconSymbol name="heart.fill" size={22} color="#fff" />
                    </View>
                </View>

                {/* Info */}
                <View style={styles.infoWrap}>
                    <View style={styles.titleRow}>
                        <ThemedText type="title" style={styles.title}>Emma, 25</ThemedText>
                        <View style={styles.rating}>
                            <IconSymbol name="star.fill" size={16} color="#ffc83d" />
                            <ThemedText style={styles.ratingText}>4.8</ThemedText>
                        </View>
                    </View>

                    <View style={styles.metaRow}>
                        <IconSymbol name="mappin.and.ellipse" size={16} color="#a9aeb6" />
                        <ThemedText style={styles.metaText}>Downtown • 2.1 km away</ThemedText>
                    </View>

                    <ThemedText style={styles.bio}>
                        Content creator, love traveling and photography. Always up for new adventures! 📷✨
                    </ThemedText>
                </View>
            </ThemedView>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    /* Header */
    headerWrap: { height: 260, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, overflow: 'hidden' },
    headerPhoto: { width: '100%', height: '100%' },
    pillLeft: {
        position: 'absolute', top: 12, left: 12,
        backgroundColor: '#5b6cff', paddingHorizontal: 10, paddingVertical: 6,
        borderRadius: 16, flexDirection: 'row', alignItems: 'center', gap: 6,
    },
    pillRight: {
        position: 'absolute', top: 12, right: 12,
        backgroundColor: 'rgba(0,0,0,0.55)', paddingHorizontal: 12, paddingVertical: 8,
        borderRadius: 16, flexDirection: 'row', alignItems: 'center', gap: 6,
    },
    pillText: { color: '#fff', fontSize: 12 },

    /* Search */
    searchBar: {
        height: 48,
        borderRadius: 24,
        backgroundColor: 'rgba(255,255,255,0.06)',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingHorizontal: 14,
        marginTop: 12,
    },
    searchPlaceholder: { color: '#d7dae0', fontSize: 16, opacity: 0.9 },

    /* Chips */
    chipsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 12 },
    chip: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.14)',
        backgroundColor: 'rgba(255,255,255,0.08)',
    },
    chipPrimary: { backgroundColor: 'rgba(255,255,255,0.12)', borderColor: 'transparent', flexDirection: 'row', gap: 6 },
    chipText: { color: '#fff', fontSize: 13 },

    /* Card */
    card: {
        backgroundColor: '#181a20',
        borderRadius: 20,
        overflow: 'hidden',
        marginTop: 12,
        paddingBottom: 16,
        elevation: 6,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 8 },
    },
    cornerAvatar: {
        position: 'absolute',
        top: -14,
        left: -14,
        width: 36,
        height: 36,
        borderRadius: 18,
        borderWidth: 2,
        borderColor: '#181a20',
        zIndex: 2,
    },
    cardTopRow: {
        position: 'absolute',
        left: 14,
        right: 14,
        top: 10,
        zIndex: 3,
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardNameTop: {
        color: '#fff',
        fontWeight: '800',
        fontSize: 18,
        marginRight: 8,
        textShadowColor: 'rgba(0,0,0,0.35)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
    badgesRow: { flexDirection: 'row', gap: 8, alignItems: 'center' },
    badge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 14 },
    badgeText: { color: '#fff', fontWeight: '700', fontSize: 12 },

    photoCount: {
        marginLeft: 'auto',
        backgroundColor: 'rgba(0,0,0,0.55)',
        borderRadius: 16,
        paddingHorizontal: 8,
        paddingVertical: 6,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    photoCountText: { color: '#fff', fontWeight: '700', fontSize: 12 },

    heroPhoto: { width: '100%', height: 420 },

    /* Actions */
    actionsRow: {
        position: 'absolute',
        bottom: 118,
        left: 0,
        right: 0,
        zIndex: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 22,
    },
    actionCircleGhost: {
        width: 64, height: 64, borderRadius: 32,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderWidth: 1, borderColor: 'rgba(255,255,255,0.35)',
        alignItems: 'center', justifyContent: 'center',
    },
    actionGhostX: { color: '#fff', fontSize: 24, fontWeight: '800' },
    actionCirclePrimary: {
        width: 72, height: 72, borderRadius: 36,
        backgroundColor: '#ff37ad',
        alignItems: 'center', justifyContent: 'center',
        elevation: 10, shadowColor: '#000', shadowOpacity: 0.35, shadowRadius: 16, shadowOffset: { width: 0, height: 10 },
    },

    /* Info */
    infoWrap: { paddingHorizontal: 18, paddingTop: 18 },
    titleRow: { flexDirection: 'row', alignItems: 'center' },
    title: { flex: 1, color: '#fff', fontSize: 26, fontWeight: '900' },
    rating: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    ratingText: { color: '#ffd24d', fontWeight: '800', fontSize: 16 },

    metaRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8 },
    metaText: { color: '#a9aeb6', fontSize: 15, fontWeight: '600' },

    bio: { color: '#d1d4da', marginTop: 12, lineHeight: 20, fontSize: 15 },
});
