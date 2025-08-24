import React, { useMemo, useState } from 'react';
import { StyleSheet, View, Pressable, Switch } from 'react-native';
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
    { id: '1', name: 'Emma',    age: 28, distance: 0.5, isOnline: true,  image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop' },
    { id: '2', name: 'James',   age: 32, distance: 1.2, isOnline: true,  image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop' },
    { id: '3', name: 'Sophie',  age: 26, distance: 2.1, isOnline: false, image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop' },
    { id: '4', name: 'Michael', age: 30, distance: 3.4, isOnline: true,  image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop' },
];

const locations = [
    { name: 'Manhattan', count: 127, distance: '2.5 km' },
    { name: 'Brooklyn',  count: 89,  distance: '8.2 km' },
    { name: 'Queens',    count: 64,  distance: '12.1 km' },
    { name: 'Bronx',     count: 43,  distance: '15.7 km' },
];

export default function TabThreeScreen() {
    const [isMapEnabled, setIsMapEnabled] = useState(true);
    const onlineCount = useMemo(() => nearbyUsers.filter(u => u.isOnline).length, []);

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
            headerImage={
                <ThemedView style={styles.headerWrap}>
                    {/* Header background image */}
                    <Image
                        source={{
                            uri: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=1200&auto=format&fit=crop',
                        }}
                        contentFit="cover"
                        style={styles.headerPhoto}
                    />
                    {/* Header pills & actions */}
                    <ThemedView style={styles.premiumPill}>
                        <IconSymbol name="star.fill" size={14} color="#fff" />
                        <ThemedText type="defaultSemiBold" style={styles.premiumText}>
                            Map Discovery
                        </ThemedText>
                    </ThemedView>

                    <View style={styles.headerActions}>
                        <Pressable style={styles.headerIconBtn}>
                            <IconSymbol name="line.3.horizontal.decrease.circle" size={18} color="#fff" />
                        </Pressable>
                        <Pressable style={styles.headerIconBtn}>
                            <IconSymbol name="location.circle" size={18} color="#fff" />
                        </Pressable>
                    </View>
                </ThemedView>
            }
        >
            {/* Top info card */}
            <ThemedView style={styles.card}>
                <View style={styles.rowBetween}>
                    <View>
                        <ThemedText type="subtitle" style={styles.titleText}>Map Discovery</ThemedText>
                        <ThemedText style={styles.mutedText}>
                            {onlineCount} people online nearby
                        </ThemedText>
                    </View>

                    <Pressable style={styles.editChip}>
                        <IconSymbol name="chevron.right" size={14} color="#fff" />
                        <ThemedText type="defaultSemiBold" style={styles.editChipText}>Discover</ThemedText>
                    </Pressable>
                </View>
            </ThemedView>

            {/* Location sharing toggle */}
            <ThemedView style={styles.card}>
                <View style={styles.rowBetween}>
                    <View style={styles.toggleLeft}>
                        <View style={[styles.dot, { backgroundColor: '#2dd36f' }]} />
                        <View>
                            <ThemedText type="defaultSemiBold" style={styles.toggleTitle}>Location Sharing</ThemedText>
                            <ThemedText style={styles.mutedText}>Show me on the map to others</ThemedText>
                        </View>
                    </View>
                    <Switch
                        value={isMapEnabled}
                        onValueChange={setIsMapEnabled}
                        trackColor={{ false: '#2b2f36', true: '#2b2f36' }}
                        thumbColor={isMapEnabled ? '#ff37ad' : '#7a7f86'}
                    />
                </View>
            </ThemedView>

            {/* Mock Map */}
            <ThemedView style={styles.card}>
                <View style={styles.mapBox}>
                    {/* soft gradient backdrop with two colored layers */}
                    <View style={[styles.mapLayer, { backgroundColor: '#cfeafe' }]} />
                    <View style={[styles.mapLayer, { backgroundColor: '#d9fbe5', transform: [{ rotate: '12deg' }] }]} />

                    {/* pins */}
                    {nearbyUsers.map((u, idx) => {
                        const left = 20 + (idx * 15);
                        const top = 28 + (idx * 12);
                        return (
                            <View key={u.id} style={[styles.pin, { left: `${left}%`, top: `${top}%` }, u.isOnline && styles.pinRing]}>
                                <Image source={{ uri: u.image }} style={{ width: '100%', height: '100%' }} />
                                {u.isOnline && <View style={styles.onlineDot} />}
                            </View>
                        );
                    })}

                    {/* current user dot */}
                    <View style={styles.centerDot} />
                </View>

                <View style={styles.mapCaption}>
                    <IconSymbol name="mappin.and.ellipse" size={14} color="#9aa0a6" />
                    <ThemedText style={styles.captionText}>
                        New York, NY · Showing {nearbyUsers.length} nearby users
                    </ThemedText>
                </View>
            </ThemedView>

            {/* People Nearby */}
            <ThemedView style={styles.card}>
                <View style={styles.sectionHeader}>
                    <IconSymbol name="person.2.fill" size={16} color="#fff" />
                    <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>People Nearby</ThemedText>
                </View>

                {nearbyUsers.map(u => (
                    <View key={u.id} style={styles.personItem}>
                        <View style={{ position: 'relative' }}>
                            <Image source={{ uri: u.image }} style={styles.avatar} />
                            {u.isOnline && <View style={styles.onlineDotAvatar} />}
                        </View>

                        <View style={{ flex: 1 }}>
                            <ThemedText type="defaultSemiBold">{u.name}, {u.age}</ThemedText>
                            <View style={styles.row}>
                                <IconSymbol name="mappin" size={12} color="#9aa0a6" />
                                <ThemedText style={styles.personMeta}>{u.distance} km away</ThemedText>
                            </View>
                        </View>

                        <View style={[styles.badge, { backgroundColor: u.isOnline ? 'rgba(34,197,94,0.15)' : 'rgba(156,163,175,0.15)' }]}>
                            <ThemedText style={[styles.badgeText, { color: u.isOnline ? '#22c55e' : '#9ca3af' }]}>
                                {u.isOnline ? 'Online' : 'Offline'}
                            </ThemedText>
                        </View>
                    </View>
                ))}
            </ThemedView>

            {/* Popular Areas */}
            <ThemedView style={styles.card}>
                <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>Popular Areas</ThemedText>
                <View style={styles.grid}>
                    {locations.map((loc, i) => (
                        <View key={i} style={styles.gridItem}>
                            <ThemedText type="defaultSemiBold">{loc.name}</ThemedText>
                            <ThemedText type="subtitle" style={{ color: '#ff37ad' }}>{loc.count}</ThemedText>
                            <ThemedText style={styles.mutedText}>{loc.distance}</ThemedText>
                        </View>
                    ))}
                </View>
            </ThemedView>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    headerWrap: { height: 220, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, overflow: 'hidden' },
    headerPhoto: { width: '100%', height: '100%' },

    premiumPill: {
        position: 'absolute', top: 12, left: 12,
        backgroundColor: '#5b6cff', paddingHorizontal: 10, paddingVertical: 6,
        borderRadius: 16, flexDirection: 'row', alignItems: 'center', gap: 6,
    },
    premiumText: { color: '#fff', fontSize: 12 },

    headerActions: { position: 'absolute', top: 12, right: 12, flexDirection: 'row', gap: 8 },
    headerIconBtn: {
        backgroundColor: 'rgba(0,0,0,0.55)', paddingHorizontal: 10, paddingVertical: 8, borderRadius: 16,
    },

    card: { backgroundColor: '#181a20', borderRadius: 20, padding: 16, marginTop: 12, gap: 10 },
    rowBetween: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },

    editChip: { backgroundColor: '#22242a', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10, flexDirection: 'row', alignItems: 'center', gap: 6 },
    editChipText: { color: '#fff', fontSize: 13 },

    titleText: { fontSize: 18, fontWeight: '800' },
    mutedText: { color: '#9aa0a6', fontSize: 12 },

    toggleLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    toggleTitle: { fontSize: 16, color: '#fff' },
    dot: { width: 8, height: 8, borderRadius: 4 },

    mapBox: {
        aspectRatio: 1, borderRadius: 20, overflow: 'hidden',
        backgroundColor: '#e5f2ff',
    },
    mapLayer: {
        position: 'absolute', inset: 0, opacity: 0.6,
    },
    pin: {
        position: 'absolute', width: 48, height: 48, borderRadius: 24,
        borderWidth: 4, borderColor: '#fff', overflow: 'hidden',
    },
    pinRing: { shadowColor: '#22c55e', shadowOpacity: 0.7, shadowRadius: 6, shadowOffset: { width: 0, height: 0 } },
    onlineDot: {
        position: 'absolute', top: -2, right: -2,
        width: 14, height: 14, borderRadius: 7, backgroundColor: '#22c55e',
        borderWidth: 2, borderColor: '#fff',
    },
    centerDot: {
        position: 'absolute', left: '50%', top: '50%',
        width: 12, height: 12, marginLeft: -6, marginTop: -6,
        borderRadius: 6, backgroundColor: '#6c66ff', borderWidth: 4, borderColor: '#fff',
    },

    mapCaption: { marginTop: 10, alignSelf: 'center', flexDirection: 'row', alignItems: 'center' },
    captionText: { marginLeft: 6, fontSize: 12, color: '#9aa0a6' },

    sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
    sectionTitle: { fontSize: 16 },

    personItem: {
        flexDirection: 'row', alignItems: 'center', padding: 12,
        borderRadius: 14, backgroundColor: '#1d1f26', borderWidth: StyleSheet.hairlineWidth, borderColor: '#262a31',
        marginBottom: 10,
    },
    avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#22252b' },
    onlineDotAvatar: {
        position: 'absolute', top: -2, right: -2,
        width: 14, height: 14, borderRadius: 7, backgroundColor: '#22c55e',
        borderWidth: 2, borderColor: '#1d1f26',
    },
    row: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
    personMeta: { color: '#9aa0a6', fontSize: 12, marginLeft: 4 },

    badge: {
        paddingHorizontal: 8, paddingVertical: 4, borderRadius: 999,
    },

    grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 8 },
    gridItem: {
        flexGrow: 1, flexBasis: '48%',
        padding: 12, borderRadius: 14, backgroundColor: '#1d1f26',
        borderWidth: StyleSheet.hairlineWidth, borderColor: '#262a31',
        alignItems: 'center',
    },
});
