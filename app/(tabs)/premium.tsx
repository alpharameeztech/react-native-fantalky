// app/(tabs)/seven.tsx
import React from 'react';
import { View, Pressable, ScrollView, Dimensions } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const { width } = Dimensions.get('window');

type Feature = { icon: string; title: string; description: string };
const premiumFeatures: Feature[] = [
    { icon: 'heart.fill', title: 'Unlimited Likes', description: 'Like as many profiles as you want' },
    { icon: 'eye.fill', title: 'See Who Likes You', description: 'Get instant matches and save time' },
    { icon: 'bolt.fill', title: 'Boost Your Profile', description: 'Be seen by 10x more people' },
    { icon: 'crown.fill', title: 'Priority Support', description: '24/7 premium customer service' },
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
        features: ['Unlimited likes', 'See who likes you', '5 Super Likes per day', 'Rewind feature', 'Priority support'],
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
    { amount: 20, price: '$4.99' },
    { amount: 50, price: '$9.99', tag: 'Popular' },
    { amount: 120, price: '$19.99', tag: 'Best Value' },
];

// 2-col feature tiles (keep calc)
const PAGE_PAD = 24;
const CARD_PAD = 16;
const COL_GAP = 10;
const COLS = 2;
const tileW = (width - PAGE_PAD * 2 - COL_GAP * (COLS - 1) - CARD_PAD * 2) / COLS;

export default function TabSevenScreen() {
    const onChoosePlan = (name: string) => console.log('Choose plan:', name);
    const onBuyBundle = (bundle: Bundle) => console.log('Buy connects:', bundle);

    return (
        <ScrollView
            contentContainerStyle={{ paddingHorizontal: PAGE_PAD, paddingBottom: 24 }}
            showsVerticalScrollIndicator={false}
        >
            {/* Hero */}
            <ThemedView className="rounded-2xl mt-3 border p-5 items-center bg-white dark:bg-[#14161c] border-slate-200 dark:border-white/10">
                <View className="items-center justify-center rounded-full mb-2 w-16 h-16 bg-pink-600">
                    <IconSymbol name="crown.fill" size={28} color="#fff" />
                </View>
                <ThemedText type="title" className="text-center text-slate-900 dark:text-white">
                    Upgrade to Premium
                </ThemedText>
                <ThemedText className="text-center mt-1 text-slate-600 dark:text-slate-400">
                    Get more matches and find love faster
                </ThemedText>
            </ThemedView>

            {/* Features Grid */}
            <ThemedView className="rounded-2xl mt-3 border p-4 bg-white dark:bg-[#14161c] border-slate-200 dark:border-white/10">
                <View className="flex-row flex-wrap justify-between" style={{ rowGap: COL_GAP }}>
                    {premiumFeatures.map((f, i) => (
                        <View
                            key={i}
                            className="rounded-xl border items-center p-3 bg-slate-50 dark:bg-[#181a20] border-slate-200 dark:border-white/10"
                            style={{ width: tileW }}
                        >
                            <View className="items-center justify-center rounded-full mb-2 w-12 h-12 bg-indigo-600">
                                <IconSymbol name={f.icon} size={18} color="#fff" />
                            </View>
                            <ThemedText type="defaultSemiBold" className="text-center text-slate-900 dark:text-white">
                                {f.title}
                            </ThemedText>
                            <ThemedText className="text-center text-xs mt-1 text-slate-600 dark:text-slate-400">
                                {f.description}
                            </ThemedText>
                        </View>
                    ))}
                </View>
            </ThemedView>

            {/* Pricing Plans */}
            {plans.map((plan, idx) => (
                <ThemedView
                    key={idx}
                    className={`rounded-2xl mt-3 p-4 border bg-white dark:bg-[#14161c] ${
                        plan.popular ? 'border-pink-500' : 'border-slate-200 dark:border-white/10'
                    }`}
                >
                    {plan.popular && (
                        <View
                            className="absolute rounded-full px-3 py-1 bg-pink-500"
                            style={{ top: -12, left: '50%', transform: [{ translateX: -60 }] }}
                        >
                            <ThemedText className="text-white text-[12px] font-semibold">Most Popular</ThemedText>
                        </View>
                    )}

                    <View className="items-center mb-2.5">
                        <ThemedText type="defaultSemiBold" className="text-lg text-slate-900 dark:text-white">
                            {plan.name}
                        </ThemedText>
                        <View className="flex-row items-baseline mt-1">
                            <ThemedText type="title" className="text-2xl font-extrabold text-slate-900 dark:text-white">
                                {plan.price}
                            </ThemedText>
                            <ThemedText className="ml-1 text-slate-600 dark:text-slate-400">{plan.period}</ThemedText>
                        </View>
                        <ThemedText className="mt-1 text-center text-slate-600 dark:text-slate-400">
                            {plan.description}
                        </ThemedText>
                    </View>

                    <View style={{ rowGap: 8 }}>
                        {plan.features.map((ft, i) => (
                            <View key={i} className="flex-row items-center" style={{ columnGap: 8 }}>
                                <View className="items-center justify-center rounded-full w-5 h-5 bg-emerald-500">
                                    <IconSymbol name="checkmark" size={12} color="#fff" />
                                </View>
                                <ThemedText className="text-slate-700 dark:text-slate-200">{ft}</ThemedText>
                            </View>
                        ))}
                    </View>

                    <Pressable
                        onPress={() => onChoosePlan(plan.name)}
                        className={`mt-2 rounded-xl py-3 flex-row items-center justify-center ${
                            plan.popular
                                ? 'bg-pink-600'
                                : 'bg-slate-100 dark:bg-[#181a20] border border-slate-200 dark:border-white/10'
                        }`}
                    >
                        {plan.popular && <IconSymbol name="sparkles" size={16} color="#fff" />}
                        <ThemedText type="defaultSemiBold" className="ml-1.5 text-[15px] text-white dark:text-white">
                            Choose {plan.name}
                        </ThemedText>
                    </Pressable>
                </ThemedView>
            ))}

            {/* Connects Bundles */}
            <ThemedView className="rounded-2xl mt-3 border p-4 bg-white dark:bg-[#14161c] border-slate-200 dark:border-white/10">
                <View className="flex-row items-center justify-between mb-2">
                    <ThemedText type="defaultSemiBold" className="text-slate-900 dark:text-white">
                        Buy Connects
                    </ThemedText>
                    <View className="flex-row items-center rounded-full px-2.5 py-1.5 bg-slate-100 dark:bg-white/10">
                        <IconSymbol name="questionmark.circle" size={12} color="#0f172a" />
                        <ThemedText className="ml-1 text-[12px] text-slate-700 dark:text-slate-200">
                            Use connects to message first
                        </ThemedText>
                    </View>
                </View>

                <View className="flex-row" style={{ columnGap: 10 }}>
                    {connectsBundles.map((b, i) => (
                        <Pressable
                            key={i}
                            onPress={() => onBuyBundle(b)}
                            className={`flex-1 rounded-xl items-center py-3 border relative bg-slate-50 dark:bg-[#181a20] ${
                                b.tag ? 'border-pink-500' : 'border-slate-200 dark:border-white/10'
                            }`}
                        >
                            {b.tag && (
                                <View className="absolute rounded-full px-2.5 py-1 bg-pink-500" style={{ top: -10 }}>
                                    <ThemedText className="text-white text-[11px] font-bold">{b.tag}</ThemedText>
                                </View>
                            )}
                            <ThemedText type="subtitle" className="text-slate-900 dark:text-white">
                                {b.amount}
                            </ThemedText>
                            <ThemedText className="mt-1 text-slate-600 dark:text-slate-400">{b.price}</ThemedText>
                        </Pressable>
                    ))}
                </View>
            </ThemedView>

            {/* Money Back Guarantee */}
            <ThemedView className="rounded-2xl mt-3 border p-4 items-center bg-white dark:bg-[#14161c] border-slate-200 dark:border-white/10">
                <View className="w-full rounded-xl border p-3 bg-slate-50 dark:bg-[#181a20] border-slate-200 dark:border-white/10">
                    <ThemedText type="defaultSemiBold" className="mb-1.5 text-center text-slate-900 dark:text-white">
                        30-Day Money Back Guarantee
                    </ThemedText>
                    <ThemedText className="text-center text-slate-600 dark:text-slate-400">
                        Not satisfied? Get a full refund within 30 days, no questions asked.
                    </ThemedText>
                </View>
            </ThemedView>
        </ScrollView>
    );
}
