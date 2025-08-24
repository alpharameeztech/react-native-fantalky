// app/(tabs)/seven.tsx
import React from 'react';
import { StyleSheet, View, Pressable, Dimensions } from 'react-native';
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
    accentAlt: '#5b6cff',
    success: '#22c55e',
    ribbon: '#ff37ad',
    chipBg: 'rgba(255,255,255,0.14)',
};

type Feature = { icon: string; title: string; description: string };
const premiumFeatures: Feature[] = [
    { icon: 'heart.fill',   title: 'Unlimited Likes',    description: 'Like as many profiles as you want' },
    { icon: 'eye.fill',     title: 'See Who Likes You',  description: 'Get instant matches and save time' },
    { icon: 'bolt.fill',    title: 'Boost Your Profile', description: 'Be seen by 10x more people' },
    { icon: 'crown.fill',   title: 'Priority Support',    description: '24/7 premium customer service' },
];

type Plan = {
    name: string;
    price: string;
    period: string;
    description: string;
    features: string[];
    popular?: boolean;
};
const plans: Plan[] = [
    {
        name: 'Premium',
        price: '$19.99',
        period: '/month',
        description: 'Perfect for active daters',
        features: [
            'Unlimited likes',
            'See who likes you',
            '5 Super Likes per day',
            'Rewind feature',
            'Priority support',
        ],
    },
    {
        name: 'Premium Plus',
        price: '$29.99',
        period: '/month',
        description: 'Our most popular plan',
        features: [
            'Everything in Premium',
            'Weekly profile boost',
            'Read receipts',
            'Advanced filters',
            'Incognito mode',
            'Priority matching',
        ],
        popular: true,
    },
    {
        name: 'Premium Gold',
        price: '$39.99',
        period: '/month',
        description: 'For serious daters',
        features: [
            'Everything in Premium Plus',
            'Daily profile boost',
            'Premium badges',
            'Message before matching',
            'See recent activity',
            'VIP profile placement',
        ],
    },
];

type Bundle = { amount: number; price: string; tag?: 'Best Value' | 'Popular' };
const connectsBundles: Bundle[] = [
    { amount: 20,  price: '$4.99' },
    { amount: 50,  price: '$9.99', tag: 'Popular' },
    { amount: 120, price: '$19.99', tag: 'Best Value' },
];

export default function TabSevenScreen() {
    const onChoosePlan = (name: string) => {
        // UI-only: replace with your subscription flow later.
        console.log('Choose plan:', name);
    };

    const onBuyBundle = (bundle: Bundle) => {
        // UI-only: replace with your purchase flow later.
        console.log('Buy connects:', bundle);
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

                    <View style={styles.headerCenter}>
                        <View style={styles.headerIconCircle}>
                            <IconSymbol name="crown.fill" size={28} color="#fff" />
                        </View>
                        <ThemedText type="title" style={styles.headerTitle}>Upgrade to Premium</ThemedText>
                        <ThemedText style={styles.headerSub}>Get more matches and find love faster</ThemedText>
                    </View>
                </ThemedView>
            }
        >
            {/* Features Grid */}
            <ThemedView style={styles.card}>
                <View style={styles.featuresGrid}>
                    {premiumFeatures.map((f, i) => (
                        <View key={i} style={styles.featureItem}>
                            <View style={styles.featureIconCircle}>
                                <IconSymbol name={f.icon} size={18} color="#fff" />
                            </View>
                            <ThemedText type="defaultSemiBold" style={styles.featureTitle}>{f.title}</ThemedText>
                            <ThemedText style={styles.featureDesc}>{f.description}</ThemedText>
                        </View>
                    ))}
                </View>
            </ThemedView>

            {/* Pricing Plans */}
            {plans.map((plan, idx) => (
                <ThemedView key={idx} style={[styles.planCard, plan.popular && styles.planCardPopular]}>
                    {plan.popular && (
                        <View style={styles.ribbon}>
                            <ThemedText type="defaultSemiBold" style={styles.ribbonText}>Most Popular</ThemedText>
                        </View>
                    )}

                    <View style={{ alignItems: 'center', marginBottom: 10 }}>
                        <ThemedText type="defaultSemiBold" style={styles.planName}>{plan.name}</ThemedText>
                        <View style={styles.priceRow}>
                            <ThemedText type="title" style={styles.priceText}>{plan.price}</ThemedText>
                            <ThemedText style={styles.periodText}>{plan.period}</ThemedText>
                        </View>
                        <ThemedText style={styles.planDesc}>{plan.description}</ThemedText>
                    </View>

                    <View style={{ gap: 8, marginBottom: 12 }}>
                        {plan.features.map((ft, i) => (
                            <View key={i} style={styles.planFeatureRow}>
                                <View style={styles.checkCircle}>
                                    <IconSymbol name="checkmark" size={12} color="#fff" />
                                </View>
                                <ThemedText style={styles.planFeatureText}>{ft}</ThemedText>
                            </View>
                        ))}
                    </View>

                    <Pressable
                        onPress={() => onChoosePlan(plan.name)}
                        style={[styles.ctaBtn, plan.popular ? styles.ctaBtnPrimary : styles.ctaBtnSecondary]}
                    >
                        {plan.popular && <IconSymbol name="sparkles" size={16} color="#fff" />}
                        <ThemedText type="defaultSemiBold" style={styles.ctaBtnText}>
                            Choose {plan.name}
                        </ThemedText>
                    </Pressable>
                </ThemedView>
            ))}

            {/* Connects Bundles */}
            <ThemedView style={styles.card}>
                <View style={[styles.rowBetween, { marginBottom: 8 }]}>
                    <ThemedText type="defaultSemiBold" style={{ color: TOKENS.text }}>Buy Connects</ThemedText>
                    <View style={styles.infoChip}>
                        <IconSymbol name="questionmark.circle" size={12} color={TOKENS.text} />
                        <ThemedText style={styles.infoChipText}>Use connects to message first</ThemedText>
                    </View>
                </View>

                <View style={styles.bundleRow}>
                    {connectsBundles.map((b, i) => (
                        <Pressable key={i} onPress={() => onBuyBundle(b)} style={[styles.bundleTile, b.tag && styles.bundleTileTag]}>
                            {b.tag && (
                                <View style={styles.bundleTag}>
                                    <ThemedText style={styles.bundleTagText}>{b.tag}</ThemedText>
                                </View>
                            )}
                            <ThemedText type="subtitle" style={styles.bundleAmount}>{b.amount}</ThemedText>
                            <ThemedText style={styles.bundlePrice}>{b.price}</ThemedText>
                        </Pressable>
                    ))}
                </View>
            </ThemedView>

            {/* Money Back Guarantee */}
            <ThemedView style={[styles.card, { alignItems: 'center' }]}>
                <View style={styles.guaranteeBox}>
                    <ThemedText type="defaultSemiBold" style={{ color: TOKENS.text, marginBottom: 6 }}>
                        30-Day Money Back Guarantee
                    </ThemedText>
                    <ThemedText style={{ color: TOKENS.textMuted, textAlign: 'center' }}>
                        Not satisfied? Get a full refund within 30 days, no questions asked.
                    </ThemedText>
                </View>
            </ThemedView>
        </ParallaxScrollView>
    );
}

const CARD_PAD = 16;
const COL_GAP = 10;
const COLS = 2;
const tileW = (width - TOKENS.pagePad * 2 - COL_GAP * (COLS - 1) - CARD_PAD * 2) / COLS;

const styles = StyleSheet.create({
    // Header
    headerWrap: {
        height: 220,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerPhoto: { position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' },
    headerCenter: { alignItems: 'center', paddingHorizontal: 16 },
    headerIconCircle: {
        width: 64, height: 64, borderRadius: 32,
        backgroundColor: TOKENS.accent, alignItems: 'center', justifyContent: 'center', marginBottom: 10,
    },
    headerTitle: { color: '#fff', fontSize: 22, fontWeight: '800' },
    headerSub: { color: 'rgba(255,255,255,0.9)', marginTop: 4 },

    // Generic card
    card: {
        backgroundColor: TOKENS.cardBg,
        borderRadius: 20,
        padding: CARD_PAD,
        marginTop: 12,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: TOKENS.border,
    },

    // Features
    featuresGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: COL_GAP,
        justifyContent: 'space-between',
    },
    featureItem: {
        width: tileW,
        backgroundColor: TOKENS.cardBgAlt,
        borderRadius: 16,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: TOKENS.border,
        padding: 12,
        alignItems: 'center',
    },
    featureIconCircle: {
        width: 48, height: 48, borderRadius: 24,
        backgroundColor: TOKENS.accentAlt,
        alignItems: 'center', justifyContent: 'center', marginBottom: 8,
    },
    featureTitle: { color: TOKENS.text, textAlign: 'center' },
    featureDesc: { color: TOKENS.textMuted, textAlign: 'center', fontSize: 12, marginTop: 4 },

    // Plan cards
    planCard: {
        backgroundColor: '#ffffff0F',
        borderRadius: 20,
        padding: CARD_PAD,
        marginTop: 12,
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.18)',
    },
    planCardPopular: {
        borderColor: TOKENS.accent,
        shadowColor: TOKENS.accent,
        shadowOpacity: 0.35,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 4 },
    },
    ribbon: {
        position: 'absolute',
        top: -12,
        left: '50%',
        transform: [{ translateX: -60 }],
        backgroundColor: TOKENS.ribbon,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 999,
    },
    ribbonText: { color: '#fff', fontSize: 12 },

    planName: { color: TOKENS.text, fontSize: 18 },
    priceRow: { flexDirection: 'row', alignItems: 'baseline', marginTop: 4 },
    priceText: { color: TOKENS.text, fontSize: 26, fontWeight: '800' },
    periodText: { color: TOKENS.textMuted, marginLeft: 4 },
    planDesc: { color: TOKENS.textMuted, marginTop: 4 },

    planFeatureRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    checkCircle: {
        width: 20, height: 20, borderRadius: 10, backgroundColor: TOKENS.success,
        alignItems: 'center', justifyContent: 'center',
    },
    planFeatureText: { color: TOKENS.text },

    ctaBtn: {
        marginTop: 8,
        borderRadius: 14,
        paddingVertical: 14,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 8,
    },
    ctaBtnPrimary: { backgroundColor: TOKENS.accent },
    ctaBtnSecondary: {
        backgroundColor: TOKENS.cardBgAlt,
        borderWidth: 1, borderColor: TOKENS.border,
    },
    ctaBtnText: { color: '#fff', fontSize: 15 },

    // Connects
    rowBetween: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    infoChip: {
        flexDirection: 'row', alignItems: 'center', gap: 6,
        paddingHorizontal: 10, paddingVertical: 6,
        backgroundColor: TOKENS.chipBg, borderRadius: 999,
    },
    infoChipText: { color: TOKENS.text, fontSize: 12 },
    bundleRow: { flexDirection: 'row', gap: 10, marginTop: 8 },
    bundleTile: {
        flex: 1,
        backgroundColor: TOKENS.cardBgAlt,
        borderRadius: 16,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: TOKENS.border,
        paddingVertical: 14,
        alignItems: 'center',
        position: 'relative',
    },
    bundleTileTag: {
        borderWidth: 2,
        borderColor: TOKENS.accent,
    },
    bundleTag: {
        position: 'absolute',
        top: -10,
        alignSelf: 'center',
        backgroundColor: TOKENS.accent,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 999,
    },
    bundleTagText: { color: '#fff', fontSize: 11, fontWeight: '700' },
    bundleAmount: { color: TOKENS.text },
    bundlePrice: { color: TOKENS.textMuted, marginTop: 4 },

    // Guarantee
    guaranteeBox: {
        width: '100%',
        backgroundColor: TOKENS.cardBgAlt,
        borderRadius: 16,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: TOKENS.border,
        padding: 14,
    },
});
