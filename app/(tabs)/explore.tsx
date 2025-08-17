import React, { useState } from 'react';
import { StyleSheet, View, Pressable, Switch } from 'react-native';
import { Image } from 'expo-image';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function TabTwoScreen() {
    const [available, setAvailable] = useState(true);
    const [online, setOnline] = useState(false);

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
            headerImage={
                <ThemedView style={styles.headerWrap}>
                    <Image
                        source={{
                            uri:
                                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop',
                        }}
                        contentFit="cover"
                        style={styles.headerPhoto}
                    />
                    <ThemedView style={styles.premiumPill}>
                        <IconSymbol name="star.fill" size={14} color="#fff" />
                        <ThemedText type="defaultSemiBold" style={styles.premiumText}>
                            Premium
                        </ThemedText>
                    </ThemedView>

                    <Pressable style={styles.editPhotosBtn}>
                        <IconSymbol name="camera.fill" size={16} color="#fff" />
                        <ThemedText type="defaultSemiBold" style={styles.editPhotosText}>
                            Edit Photos
                        </ThemedText>
                    </Pressable>
                </ThemedView>
            }
        >
            {/* Card body */}
            <ThemedView style={styles.card}>
                <View style={styles.rowBetween}>
                    <ThemedText type="title" style={styles.name}>Alex, 28</ThemedText>
                    <Pressable style={styles.editChip}>
                        <IconSymbol name="pencil" size={14} color="#fff" />
                        <ThemedText type="defaultSemiBold" style={styles.editChipText}>Edit</ThemedText>
                    </Pressable>
                </View>

                <View style={styles.locRow}>
                    <IconSymbol name="mappin.and.ellipse" size={16} color="#9aa0a6" />
                    <ThemedText style={styles.locText}>San Francisco, CA</ThemedText>
                </View>

                <ThemedText style={styles.bio}>
                    Adventure seeker, coffee lover, and part-time photographer. Always
                    looking for new experiences and meaningful connections! ☕📷
                </ThemedText>

                <View style={styles.statsRow}>
                    <View style={styles.stat}>
                        <ThemedText type="subtitle" style={styles.statValue}>124</ThemedText>
                        <ThemedText style={styles.statLabel}>Likes</ThemedText>
                    </View>
                    <View style={styles.stat}>
                        <ThemedText type="subtitle" style={styles.statValue}>23</ThemedText>
                        <ThemedText style={styles.statLabel}>Matches</ThemedText>
                    </View>
                    <View style={styles.stat}>
                        <ThemedText type="subtitle" style={styles.statValue}>6</ThemedText>
                        <ThemedText style={styles.statLabel}>Photos</ThemedText>
                    </View>
                    <View style={styles.stat}>
                        <ThemedText type="subtitle" style={styles.statValue}>4.8</ThemedText>
                        <ThemedText style={styles.statLabel}>Rating</ThemedText>
                    </View>
                </View>

                <View style={styles.divider} />

                {/* Toggles */}
                <View style={styles.toggleRow}>
                    <View style={styles.toggleLeft}>
                        <View style={[styles.dot, { backgroundColor: '#2dd36f' }]} />
                        <ThemedText type="defaultSemiBold" style={styles.toggleTitle}>Available for meetups</ThemedText>
                    </View>
                    <Switch
                        value={available}
                        onValueChange={setAvailable}
                        trackColor={{ false: '#2b2f36', true: '#2b2f36' }}
                        thumbColor={available ? '#ff37ad' : '#7a7f86'}
                    />
                </View>

                <View style={styles.toggleRow}>
                    <View style={styles.toggleLeft}>
                        <View style={[styles.dot, { backgroundColor: '#ff5c93' }]} />
                        <ThemedText type="defaultSemiBold" style={styles.toggleTitle}>Show as online</ThemedText>
                    </View>
                    <Switch
                        value={online}
                        onValueChange={setOnline}
                        trackColor={{ false: '#2b2f36', true: '#2b2f36' }}
                        thumbColor={online ? '#ff37ad' : '#7a7f86'}
                    />
                </View>
            </ThemedView>

            {/* Settings list */}
            <ThemedView style={styles.list}>
                <Pressable style={styles.item}>
                    <View style={styles.itemLeft}>
                        <View style={styles.itemIcon}><IconSymbol name="bell" size={18} color="#fff" /></View>
                        <View>
                            <ThemedText type="defaultSemiBold" style={styles.itemTitle}>Notifications</ThemedText>
                            <ThemedText style={styles.itemSub}>Manage your alerts</ThemedText>
                        </View>
                    </View>
                    <IconSymbol name="chevron.right" size={18} color="#9aa0a6" />
                </Pressable>

                <Pressable style={styles.item}>
                    <View style={styles.itemLeft}>
                        <View style={styles.itemIcon}><IconSymbol name="shield.fill" size={18} color="#fff" /></View>
                        <View>
                            <ThemedText type="defaultSemiBold" style={styles.itemTitle}>Privacy & Safety</ThemedText>
                            <ThemedText style={styles.itemSub}>Control your visibility</ThemedText>
                        </View>
                    </View>
                    <IconSymbol name="chevron.right" size={18} color="#9aa0a6" />
                </Pressable>

                {/* NEW: Dating Preferences */}
                <Pressable style={styles.item}>
                    <View style={styles.itemLeft}>
                        <View style={styles.itemIcon}><IconSymbol name="heart" size={18} color="#fff" /></View>
                        <View>
                            <ThemedText type="defaultSemiBold" style={styles.itemTitle}>Dating Preferences</ThemedText>
                            <ThemedText style={styles.itemSub}>Set your criteria</ThemedText>
                        </View>
                    </View>
                    <IconSymbol name="chevron.right" size={18} color="#9aa0a6" />
                </Pressable>

                {/* NEW: Subscription & Billing */}
                <Pressable style={styles.item}>
                    <View style={styles.itemLeft}>
                        <View style={styles.itemIcon}><IconSymbol name="creditcard" size={18} color="#fff" /></View>
                        <View>
                            <ThemedText type="defaultSemiBold" style={styles.itemTitle}>Subscription & Billing</ThemedText>
                            <ThemedText style={styles.itemSub}>Manage your plan</ThemedText>
                        </View>
                    </View>
                    <IconSymbol name="chevron.right" size={18} color="#9aa0a6" />
                </Pressable>
            </ThemedView>

            {/* NEW: Sign Out block */}
            <ThemedView style={[styles.list, styles.signOutBlock]}>
                <Pressable style={styles.itemNoBorder}>
                    <View style={styles.itemLeft}>
                        <View style={[styles.itemIcon, { backgroundColor: 'rgba(255,59,48,0.12)' }]}>
                            <IconSymbol name="rectangle.portrait.and.arrow.right" size={18} color="#ff3b30" />
                        </View>
                        <View>
                            <ThemedText type="defaultSemiBold" style={styles.signOutTitle}>Sign Out</ThemedText>
                            <ThemedText style={styles.signOutSub}>Log out of your account</ThemedText>
                        </View>
                    </View>
                    <IconSymbol name="chevron.right" size={18} color="#9aa0a6" />
                </Pressable>
            </ThemedView>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    headerWrap: { height: 300, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, overflow: 'hidden' },
    headerPhoto: { width: '100%', height: '100%' },

    premiumPill: {
        position: 'absolute', top: 12, left: 12,
        backgroundColor: '#5b6cff', paddingHorizontal: 10, paddingVertical: 6,
        borderRadius: 16, flexDirection: 'row', alignItems: 'center', gap: 6,
    },
    premiumText: { color: '#fff', fontSize: 12 },

    editPhotosBtn: {
        position: 'absolute', top: 12, right: 12,
        backgroundColor: 'rgba(0,0,0,0.55)', paddingHorizontal: 12, paddingVertical: 8,
        borderRadius: 16, flexDirection: 'row', alignItems: 'center', gap: 6,
    },
    editPhotosText: { color: '#fff', fontSize: 13 },

    card: { backgroundColor: '#181a20', borderRadius: 20, padding: 16, marginTop: 12, gap: 10 },
    rowBetween: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    name: { fontSize: 26, fontWeight: '800' },

    editChip: { backgroundColor: '#22242a', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10, flexDirection: 'row', alignItems: 'center', gap: 6 },
    editChipText: { color: '#fff', fontSize: 13 },

    locRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    locText: { color: '#9aa0a6', fontSize: 15, fontWeight: '600' },
    bio: { lineHeight: 20, color: '#d3d6db', marginTop: 4 },

    statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
    stat: { alignItems: 'center', flex: 1 },
    statValue: { color: '#ff37ad', fontWeight: '800' },
    statLabel: { color: '#9aa0a6', fontSize: 12, marginTop: 2 },

    divider: { height: 1, backgroundColor: '#272a31', marginVertical: 8 },

    toggleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10 },
    toggleLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    toggleTitle: { fontSize: 16, color: '#fff' },
    dot: { width: 8, height: 8, borderRadius: 4 },

    list: { backgroundColor: '#181a20', borderRadius: 16, marginTop: 12, paddingHorizontal: 12 },
    signOutBlock: { marginTop: 16 },
    item: {
        paddingVertical: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#262a31',
    },
    itemNoBorder: {
        paddingVertical: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    },
    itemLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    itemIcon: { width: 36, height: 36, borderRadius: 10, backgroundColor: '#22252b', alignItems: 'center', justifyContent: 'center' },
    itemTitle: { fontSize: 16 },
    itemSub: { color: '#9aa0a6', fontSize: 13, marginTop: 2 },

    signOutTitle: { fontSize: 16, color: '#ff3b30' },
    signOutSub: { color: '#ff7b70', fontSize: 13, marginTop: 2 },
});
