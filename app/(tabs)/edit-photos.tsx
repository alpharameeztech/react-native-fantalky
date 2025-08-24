// app/(tabs)/nine.tsx
import React, { useMemo, useState } from 'react';
import { StyleSheet, View, Pressable, Dimensions } from 'react-native';
import { Image } from 'expo-image';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

const { width } = Dimensions.get('window');
const PAGE_PAD = 24;
const GAP = 12;
const TILE_W = (width - PAGE_PAD * 2 - GAP) / 2;
const TILE_H = TILE_W * (4 / 3);

const TOKENS = {
    card: '#14161c',
    cardAlt: '#181a20',
    border: '#2a2e36',
    text: '#f2f4f8',
    textMuted: '#c7cdd4',
    accent: '#ff37ad',
    success: '#22c55e',
    danger: '#ff3b30',
};

type Photo = { id: string; url: string; isMain: boolean };

export default function TabNineScreen() {
    const [photos, setPhotos] = useState<Photo[]>([
        { id: '1', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1200&fit=crop', isMain: true },
        { id: '2', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=1200&fit=crop', isMain: false },
        { id: '3', url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=1200&fit=crop', isMain: false },
        { id: '4', url: '', isMain: false },
        { id: '5', url: '', isMain: false },
        { id: '6', url: '', isMain: false },
    ]);

    const filled = useMemo(() => photos.filter(p => !!p.url), [photos]);

    const handleSetMainPhoto = (photoId: string) => {
        setPhotos(prev => prev.map(p => ({ ...p, isMain: p.id === photoId && p.url !== '' })));
    };

    const handleRemovePhoto = (photoId: string) => {
        setPhotos(prev => {
            const next = prev.map(p => (p.id === photoId ? { ...p, url: '', isMain: false } : p));
            if (!next.some(p => p.isMain) && next.some(p => p.url)) {
                const first = next.find(p => p.url);
                if (first) first.isMain = true;
            }
            return [...next];
        });
    };

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
            headerImage={
                <ThemedView style={styles.headerWrap}>
                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1520975930498-0f8d7a6a1533?q=80&w=1600&auto=format&fit=crop' }}
                        contentFit="cover"
                        style={styles.headerPhoto}
                    />
                    <ThemedView style={styles.headerPill}>
                        <IconSymbol name="camera.fill" size={16} color="#fff" />
                        <ThemedText type="defaultSemiBold" style={styles.headerPillText}>
                            Manage Photos
                        </ThemedText>
                    </ThemedView>

                    <View style={styles.headerActions}>
                        <Pressable style={styles.headerIconBtn}>
                            <IconSymbol name="chevron.left" size={18} color="#fff" />
                        </Pressable>
                        <Pressable style={styles.headerIconBtn}>
                            <IconSymbol name="pencil" size={18} color="#fff" />
                        </Pressable>
                    </View>
                </ThemedView>
            }
        >
            {/* Tips */}
            <ThemedView style={styles.card}>
                <View style={styles.cardTitleRow}>
                    <IconSymbol name="star.fill" size={16} color="#f59e0b" />
                    <ThemedText type="defaultSemiBold" style={styles.cardTitle}>Photo Tips</ThemedText>
                </View>
                <View style={{ gap: 6 }}>
                    <ThemedText style={styles.tipText}>• Use high-quality, recent photos</ThemedText>
                    <ThemedText style={styles.tipText}>• Show your face clearly in the first photo</ThemedText>
                    <ThemedText style={styles.tipText}>• Include full-body shots and varied settings</ThemedText>
                    <ThemedText style={styles.tipText}>• Smile and look at the camera</ThemedText>
                </View>
            </ThemedView>

            {/* Grid */}
            <ThemedView style={[styles.card, { padding: 12 }]}>
                <View style={styles.grid}>
                    {photos.map((photo, index) => (
                        <View key={photo.id} style={[styles.tile, { width: TILE_W, height: TILE_H }]}>
                            <View style={styles.tileInner}>
                                {photo.url ? (
                                    <>
                                        <Image
                                            source={{ uri: photo.url }}
                                            style={StyleSheet.absoluteFillObject}
                                            contentFit="cover"
                                            transition={150}
                                        />

                                        {photo.isMain && (
                                            <View style={styles.mainBadge}>
                                                <ThemedText style={styles.mainBadgeText}>Main</ThemedText>
                                            </View>
                                        )}

                                        <View style={styles.tileActions}>
                                            {!photo.isMain && (
                                                <Pressable onPress={() => handleSetMainPhoto(photo.id)} style={styles.circleBtn}>
                                                    <IconSymbol name="star.fill" size={14} color="#f59e0b" />
                                                </Pressable>
                                            )}
                                            <Pressable onPress={() => handleRemovePhoto(photo.id)} style={styles.circleBtn}>
                                                <IconSymbol name="xmark" size={14} color={TOKENS.danger} />
                                            </Pressable>
                                        </View>

                                        <View style={styles.indexBadge}>
                                            <ThemedText style={styles.indexText}>{index + 1}</ThemedText>
                                        </View>
                                    </>
                                ) : (
                                    <View style={styles.emptyWrap}>
                                        <IconSymbol name="plus" size={26} color={TOKENS.textMuted} />
                                        <ThemedText type="defaultSemiBold" style={styles.emptyText}>Add Photo</ThemedText>
                                    </View>
                                )}
                            </View>
                        </View>
                    ))}
                </View>
            </ThemedView>

            {/* Actions */}
            <ThemedView style={[styles.card, { gap: 10 }]}>
                <Pressable style={styles.primaryBtn}>
                    <IconSymbol name="camera.fill" size={16} color="#fff" />
                    <ThemedText type="defaultSemiBold" style={styles.primaryBtnText}>Take New Photo</ThemedText>
                </Pressable>

                <Pressable style={styles.secondaryBtn}>
                    <IconSymbol name="plus" size={16} color={TOKENS.accent} />
                    <ThemedText type="defaultSemiBold" style={styles.secondaryBtnText}>Choose from Gallery</ThemedText>
                </Pressable>
            </ThemedView>

            {/* Guidelines */}
            <ThemedView style={styles.card}>
                <ThemedText type="defaultSemiBold" style={{ color: TOKENS.text, marginBottom: 8 }}>
                    Photo Guidelines
                </ThemedText>

                <View style={{ gap: 10 }}>
                    <View style={styles.ruleRow}>
                        <View style={[styles.dot, { backgroundColor: TOKENS.success }]} />
                        <View>
                            <ThemedText type="defaultSemiBold" style={{ color: TOKENS.text }}>Do</ThemedText>
                            <ThemedText style={styles.tipText}>Use recent, clear photos of yourself</ThemedText>
                        </View>
                    </View>

                    <View style={styles.ruleRow}>
                        <View style={[styles.dot, { backgroundColor: TOKENS.danger }]} />
                        <View>
                            <ThemedText type="defaultSemiBold" style={{ color: TOKENS.text }}>Don’t</ThemedText>
                            <ThemedText style={styles.tipText}>Use group photos as your main image</ThemedText>
                        </View>
                    </View>

                    <View style={styles.ruleRow}>
                        <View style={[styles.dot, { backgroundColor: TOKENS.success }]} />
                        <View>
                            <ThemedText type="defaultSemiBold" style={{ color: TOKENS.text }}>Do</ThemedText>
                            <ThemedText style={styles.tipText}>Show your personality and interests</ThemedText>
                        </View>
                    </View>

                    <View style={styles.ruleRow}>
                        <View style={[styles.dot, { backgroundColor: TOKENS.danger }]} />
                        <View>
                            <ThemedText type="defaultSemiBold" style={{ color: TOKENS.text }}>Don’t</ThemedText>
                            <ThemedText style={styles.tipText}>Use heavily filtered or misleading photos</ThemedText>
                        </View>
                    </View>
                </View>
            </ThemedView>

            {/* Footer summary */}
            <ThemedView style={[styles.card, { alignItems: 'center' }]}>
                <ThemedText style={{ color: TOKENS.textMuted }}>
                    {filled.length}/6 photos added · Pick your best as <ThemedText style={{ color: TOKENS.text }}>Main</ThemedText>
                </ThemedText>
            </ThemedView>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    // Header
    headerWrap: {
        height: 200,
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
        backgroundColor: TOKENS.card,
        borderRadius: 20,
        padding: 16,
        marginTop: 12,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: TOKENS.border,
    },
    cardTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
    cardTitle: { color: TOKENS.text },
    tipText: { color: TOKENS.textMuted },

    // Grid
    grid: { flexDirection: 'row', flexWrap: 'wrap', gap: GAP, justifyContent: 'space-between' },
    tile: { borderRadius: 16, overflow: 'hidden', backgroundColor: TOKENS.cardAlt, borderWidth: StyleSheet.hairlineWidth, borderColor: TOKENS.border },
    tileInner: { flex: 1 },
    emptyWrap: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    emptyText: { color: TOKENS.textMuted, marginTop: 6, fontSize: 12 },

    mainBadge: {
        position: 'absolute',
        top: 8,
        left: 8,
        backgroundColor: TOKENS.accent,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 999,
    },
    mainBadgeText: { color: '#fff', fontSize: 11, fontWeight: '700' },

    tileActions: { position: 'absolute', top: 8, right: 8, flexDirection: 'row', gap: 6 },
    circleBtn: {
        width: 30, height: 30, borderRadius: 15,
        backgroundColor: '#ffffffE6',
        alignItems: 'center', justifyContent: 'center',
    },
    indexBadge: {
        position: 'absolute',
        left: 8,
        bottom: 8,
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: 'rgba(0,0,0,0.55)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    indexText: { color: '#fff', fontSize: 12, fontWeight: '700' },

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
        backgroundColor: TOKENS.cardAlt,
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

    // Guidelines
    ruleRow: { flexDirection: 'row', gap: 10, alignItems: 'flex-start' },
    dot: { width: 8, height: 8, borderRadius: 4, marginTop: 6 },
});
