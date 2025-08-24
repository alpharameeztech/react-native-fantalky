import React, { useState } from 'react';
import { StyleSheet, View, Pressable, Switch, Dimensions } from 'react-native';
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
    accentSoftBg: 'rgba(255,55,173,0.16)',
    accentSoftBorder: 'rgba(255,55,173,0.28)',
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
    const [notifications, setNotifications] = useState(true);
    const [locationSharing, setLocationSharing] = useState(true);
    const [onlineStatus, setOnlineStatus] = useState(true);

    // static demo values for progress bars
    const maxDistancePct = 0.5; // 50% (e.g., 25 km)
    const ageRangePct = 0.75;   // 75% (e.g., 22–35)

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
            headerImage={
                <ThemedView style={styles.headerWrap}>
                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1516542076529-1ea3854896e1?q=80&w=1600&auto=format&fit=crop' }}
                        contentFit="cover"
                        style={styles.headerPhoto}
                    />

                    {/* Title pill */}
                    <ThemedView style={styles.headerPill}>
                        <IconSymbol name="gearshape.fill" size={16} color="#fff" />
                        <ThemedText type="defaultSemiBold" style={styles.headerPillText}>
                            Settings
                        </ThemedText>
                    </ThemedView>

                    {/* Back icon (UI only) */}
                    <View style={styles.headerActions}>
                        <Pressable style={styles.headerIconBtn}>
                            <IconSymbol name="chevron.left" size={18} color="#fff" />
                        </Pressable>
                    </View>
                </ThemedView>
            }
        >
            {/* Profile Summary */}
            <ThemedView style={[styles.card, { padding: 16 }]}>
                <View style={styles.profileRow}>
                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1544006659-f0b21884ce1d?w=160&h=160&fit=crop' }}
                        style={styles.avatar}
                        contentFit="cover"
                        transition={150}
                    />
                    <View style={{ flex: 1, marginLeft: 12 }}>
                        <ThemedText type="defaultSemiBold" style={styles.titleText}>Alex, 28</ThemedText>
                        <View style={styles.locRow}>
                            <IconSymbol name="mappin.and.ellipse" size={14} color={TOKENS.textMuted} />
                            <ThemedText style={styles.muted}>New York, NY</ThemedText>
                        </View>
                        <Pressable style={styles.viewProfileBtn}>
                            <IconSymbol name="person.text.rectangle" size={14} color={TOKENS.accent} />
                            <ThemedText type="defaultSemiBold" style={styles.viewProfileText}>View Profile</ThemedText>
                        </Pressable>
                    </View>
                </View>
            </ThemedView>

            {/* Quick Toggles */}
            <ThemedView style={styles.card}>
                <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>Quick Settings</ThemedText>

                <View style={styles.toggleRow}>
                    <View style={styles.toggleLeft}>
                        <IconSymbol name="bell" size={18} color={TOKENS.text} />
                        <View>
                            <ThemedText type="defaultSemiBold" style={styles.toggleTitle}>Push Notifications</ThemedText>
                            <ThemedText style={styles.muted}>Get notified of new matches</ThemedText>
                        </View>
                    </View>
                    <Switch
                        value={notifications}
                        onValueChange={setNotifications}
                        trackColor={{ false: '#2b2f36', true: '#2b2f36' }}
                        thumbColor={notifications ? TOKENS.accent : '#7a7f86'}
                    />
                </View>

                <View style={styles.toggleRow}>
                    <View style={styles.toggleLeft}>
                        <IconSymbol name="mappin.and.ellipse" size={18} color={TOKENS.text} />
                        <View>
                            <ThemedText type="defaultSemiBold" style={styles.toggleTitle}>Location Sharing</ThemedText>
                            <ThemedText style={styles.muted}>Show me on the map</ThemedText>
                        </View>
                    </View>
                    <Switch
                        value={locationSharing}
                        onValueChange={setLocationSharing}
                        trackColor={{ false: '#2b2f36', true: '#2b2f36' }}
                        thumbColor={locationSharing ? TOKENS.accent : '#7a7f86'}
                    />
                </View>

                <View style={styles.toggleRow}>
                    <View style={styles.toggleLeft}>
                        <IconSymbol name="person.crop.circle.badge.checkmark" size={18} color={TOKENS.text} />
                        <View>
                            <ThemedText type="defaultSemiBold" style={styles.toggleTitle}>Online Status</ThemedText>
                            <ThemedText style={styles.muted}>Show when I&apos;m active</ThemedText>
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
                <ThemedView key={gi} style={styles.card}>
                    <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>{group.title}</ThemedText>

                    {group.items.map((item, ii) => (
                        <Pressable key={ii} style={[styles.item, ii < group.items.length - 1 && styles.itemDivider]}>
                            <View style={styles.itemLeft}>
                                <View style={styles.itemIcon}>
                                    <IconSymbol name={item.icon} size={18} color="#fff" />
                                </View>
                                <ThemedText type="defaultSemiBold" style={styles.itemText}>{item.label}</ThemedText>
                            </View>
                            <IconSymbol name="chevron.right" size={18} color={TOKENS.textMuted} />
                        </Pressable>
                    ))}
                </ThemedView>
            ))}

            {/* Discovery Settings (static bars, UI-only) */}
            <ThemedView style={styles.card}>
                <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>Discovery Settings</ThemedText>

                <View style={{ marginTop: 8 }}>
                    <View style={styles.rowBetween}>
                        <ThemedText style={styles.mutedStrong}>Maximum Distance</ThemedText>
                        <ThemedText type="defaultSemiBold" style={{ color: TOKENS.accent }}>25 km</ThemedText>
                    </View>
                    <View style={styles.progressTrack}>
                        <View style={[styles.progressFill, { width: `${maxDistancePct * 100}%` }]} />
                    </View>
                </View>

                <View style={{ marginTop: 12 }}>
                    <View style={styles.rowBetween}>
                        <ThemedText style={styles.mutedStrong}>Age Range</ThemedText>
                        <ThemedText type="defaultSemiBold" style={{ color: TOKENS.accent }}>22 - 35</ThemedText>
                    </View>
                    <View style={styles.progressTrack}>
                        <View style={[styles.progressFill, { width: `${ageRangePct * 100}%` }]} />
                    </View>
                </View>
            </ThemedView>

            {/* Logout */}
            <ThemedView style={styles.card}>
                <Pressable style={styles.logoutBtn}>
                    <IconSymbol name="rectangle.portrait.and.arrow.right" size={18} color="#ff3b30" />
                    <ThemedText type="defaultSemiBold" style={styles.logoutText}>Sign Out</ThemedText>
                </Pressable>
            </ThemedView>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    // Header
    headerWrap: {
        height: 180,
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
    headerActions: { position: 'absolute', top: 12, right: 12, flexDirection: 'row', gap: 8 },
    headerIconBtn: {
        backgroundColor: 'rgba(0,0,0,0.55)',
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 16,
    },

    // Cards
    card: {
        backgroundColor: TOKENS.cardBg,
        borderRadius: 20,
        padding: 16,
        marginTop: 12,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: TOKENS.border,
    },

    // Profile summary
    profileRow: { flexDirection: 'row', alignItems: 'center' },
    avatar: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#22252b',
    },
    titleText: { color: TOKENS.text, fontSize: 18, fontWeight: '800' },
    locRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
    muted: { color: TOKENS.textMuted, fontSize: 13, marginLeft: 6 },
    mutedStrong: { color: TOKENS.textMuted, fontSize: 13 },

    viewProfileBtn: {
        marginTop: 8,
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 999,
        backgroundColor: TOKENS.cardBgAlt,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: TOKENS.border,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    viewProfileText: { color: TOKENS.accent, fontSize: 12 },

    // Toggles
    sectionTitle: { color: TOKENS.text, fontSize: 15, marginBottom: 6 },
    toggleRow: {
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    toggleLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    toggleTitle: { color: TOKENS.text, fontSize: 15 },

    // Settings items
    item: {
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    itemDivider: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: TOKENS.border,
    },
    itemLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    itemIcon: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: '#22252b',
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemText: { color: TOKENS.text },

    // Progress bars (static, UI-only)
    progressTrack: {
        width: '100%',
        height: 10,
        borderRadius: 999,
        backgroundColor: '#232730',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: TOKENS.border,
        overflow: 'hidden',
        marginTop: 6,
    },
    progressFill: {
        height: '100%',
        backgroundColor: TOKENS.accent,
        borderTopRightRadius: 999,
        borderBottomRightRadius: 999,
    },

    // Logout
    logoutBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        paddingVertical: 12,
        backgroundColor: '#1d1f26',
        borderRadius: 14,
        borderWidth: 1,
        borderColor: TOKENS.border,
    },
    logoutText: { color: '#ff3b30', fontSize: 15 },
});
