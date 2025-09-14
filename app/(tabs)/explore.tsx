// app/(tabs)/eight.tsx
import React, { useMemo, useRef, useState } from 'react';
import {
    View,
    Pressable,
    TextInput,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
} from 'react-native';
import { Image } from 'expo-image';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

const TOKENS = {
    bg: '#ffffff',
    card: '#ffffff',
    cardAlt: '#f9fafb',
    border: '#e5e7eb',
    text: '#0f172a',
    textMuted: '#64748b',
    accent: '#ff37ad',
    inputBg: '#f3f4f6',
    placeholder: '#94a3b8',
    success: '#22c55e',
};

type ChatMsg = {
    id: string;
    text: string;
    sender: 'me' | 'other';
    time: string;
    type: 'text' | 'gift';
};

const MATCH = {
    id: '1',
    name: 'Emma',
    age: 28,
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop',
    isOnline: true,
    lastSeen: 'Active now',
};

const INITIAL_MESSAGES: ChatMsg[] = [
    { id: '1', text: 'Hey! Thanks for the match! 😊', sender: 'other', time: '10:30 AM', type: 'text' },
    { id: '2', text: 'Hi Emma! Great to meet you! Your profile caught my eye', sender: 'me', time: '10:32 AM', type: 'text' },
    { id: '3', text: 'Aww thank you! I love your photos from the hiking trip', sender: 'other', time: '10:35 AM', type: 'text' },
    { id: '4', text: '🌹', sender: 'me', time: '10:36 AM', type: 'gift' },
    { id: '5', text: 'Maybe we could go on a hike together sometime?', sender: 'me', time: '10:38 AM', type: 'text' },
    { id: '6', text: 'Thanks for the rose! 💕 Yes, I love hiking!', sender: 'other', time: '10:40 AM', type: 'text' },
];

export default function TabTwoScreen() {
    const [message, setMessage] = useState('');
    const [msgs, setMsgs] = useState<ChatMsg[]>(INITIAL_MESSAGES);
    const listRef = useRef<FlatList<ChatMsg>>(null);

    const canSend = useMemo(() => message.trim().length > 0, [message]);

    const handleSend = () => {
        if (!canSend) return;
        const newMsg: ChatMsg = {
            id: String(Date.now()),
            text: message.trim(),
            sender: 'me',
            time: 'Now',
            type: 'text',
        };
        setMsgs(prev => [...prev, newMsg]);
        setMessage('');
        requestAnimationFrame(() => listRef.current?.scrollToEnd({ animated: true }));
    };

    const renderItem = ({ item }: { item: ChatMsg }) => {
        const mine = item.sender === 'me';

        if (item.type === 'gift') {
            return (
                <View className="mb-2" style={{ justifyContent: mine ? 'flex-end' : 'flex-start', flexDirection: 'row' }}>
                    <View
                        className="rounded-2xl items-center"
                        style={{
                            maxWidth: '80%',
                            padding: 14,
                            gap: 6,
                            backgroundColor: mine ? TOKENS.accent : TOKENS.card,
                            borderWidth: mine ? 0 : 1,
                            borderColor: TOKENS.border,
                        }}
                    >
                        <IconSymbol name="gift.fill" size={20} color="#fff" />
                        <ThemedText type="defaultSemiBold" style={{ color: '#fff', fontSize: 12 }}>
                            Sent a gift
                        </ThemedText>
                        <ThemedText style={{ color: '#fff', fontSize: 22 }}>{item.text}</ThemedText>
                    </View>
                    <ThemedText
                        style={{ color: TOKENS.textMuted, fontSize: 10, marginTop: 4, textAlign: mine ? 'right' : 'left' }}
                    >
                        {item.time}
                    </ThemedText>
                </View>
            );
        }

        return (
            <View className="mb-2" style={{ justifyContent: mine ? 'flex-end' : 'flex-start', flexDirection: 'row' }}>
                <View
                    className="rounded-2xl"
                    style={{
                        maxWidth: '80%',
                        paddingHorizontal: 14,
                        paddingVertical: 10,
                        backgroundColor: mine ? TOKENS.accent : TOKENS.card,
                        borderTopRightRadius: mine ? 4 : 18,
                        borderTopLeftRadius: mine ? 18 : 4,
                        borderWidth: mine ? 0 : 1,
                        borderColor: TOKENS.border,
                        alignSelf: mine ? 'flex-end' : 'flex-start',
                    }}
                >
                    <ThemedText style={{ color: mine ? '#fff' : TOKENS.text, fontSize: 14 }}>{item.text}</ThemedText>
                </View>
                <ThemedText
                    style={{ color: TOKENS.textMuted, fontSize: 10, marginTop: 4, textAlign: mine ? 'right' : 'left' }}
                >
                    {item.time}
                </ThemedText>
            </View>
        );
    };

    return (
        <SafeAreaView className="flex-1 bg-white" style={{ backgroundColor: TOKENS.bg }}>
            {/* Header */}
            <ThemedView
                className="flex-row items-center justify-between px-3 py-2 border-b"
                style={{ backgroundColor: TOKENS.card, borderColor: TOKENS.border }}
            >
                <View className="flex-row items-center gap-2">
                    <Pressable
                        className="w-9 h-9 rounded-full items-center justify-center border"
                        style={{ backgroundColor: TOKENS.cardAlt, borderColor: TOKENS.border }}
                    >
                        <IconSymbol name="chevron.left" size={18} color={TOKENS.text} />
                    </Pressable>

                    <View className="flex-row items-center gap-2.5">
                        <View style={{ position: 'relative' }}>
                            <Image
                                source={{ uri: MATCH.image }}
                                contentFit="cover"
                                style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#e5e7eb' }}
                            />
                            {MATCH.isOnline && (
                                <View
                                    className="absolute"
                                    style={{
                                        right: -1,
                                        bottom: -1,
                                        width: 12,
                                        height: 12,
                                        borderRadius: 6,
                                        backgroundColor: TOKENS.success,
                                        borderWidth: 2,
                                        borderColor: TOKENS.card,
                                    }}
                                />
                            )}
                        </View>
                        <View>
                            <ThemedText type="defaultSemiBold" style={{ color: TOKENS.text, fontSize: 15 }}>
                                {MATCH.name}
                            </ThemedText>
                            <ThemedText style={{ color: TOKENS.textMuted, fontSize: 11, marginTop: 2 }}>
                                {MATCH.lastSeen}
                            </ThemedText>
                        </View>
                    </View>
                </View>

                <View className="flex-row items-center gap-1.5">
                    <Pressable
                        className="w-9 h-9 rounded-full items-center justify-center border"
                        style={{ backgroundColor: TOKENS.cardAlt, borderColor: TOKENS.border }}
                    >
                        <IconSymbol name="phone.fill" size={18} color={TOKENS.text} />
                    </Pressable>
                    <Pressable
                        className="w-9 h-9 rounded-full items-center justify-center border"
                        style={{ backgroundColor: TOKENS.cardAlt, borderColor: TOKENS.border }}
                    >
                        <IconSymbol name="video.fill" size={18} color={TOKENS.text} />
                    </Pressable>
                    <Pressable
                        className="w-9 h-9 rounded-full items-center justify-center border"
                        style={{ backgroundColor: TOKENS.cardAlt, borderColor: TOKENS.border }}
                    >
                        <IconSymbol name="ellipsis" size={18} color={TOKENS.text} />
                    </Pressable>
                </View>
            </ThemedView>

            {/* Messages */}
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                className="flex-1"
                keyboardVerticalOffset={80}
            >
                <FlatList
                    ref={listRef}
                    data={msgs}
                    keyExtractor={m => m.id}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingHorizontal: 14, paddingTop: 12, paddingBottom: 8 }}
                    onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: false })}
                />

                {/* Quick actions */}
                <ThemedView
                    className="flex-row items-center justify-center gap-3 border-y py-2"
                    style={{ backgroundColor: TOKENS.card, borderColor: TOKENS.border }}
                >
                    <Pressable
                        className="w-11 h-11 rounded-full items-center justify-center border"
                        style={{ backgroundColor: 'rgba(239,68,68,0.12)', borderColor: TOKENS.border }}
                    >
                        <IconSymbol name="heart.fill" size={18} color="#ef4444" />
                    </Pressable>
                    <Pressable
                        className="w-11 h-11 rounded-full items-center justify-center border"
                        style={{ backgroundColor: 'rgba(139,92,246,0.15)', borderColor: TOKENS.border }}
                    >
                        <IconSymbol name="gift.fill" size={18} color="#8b5cf6" />
                    </Pressable>
                </ThemedView>

                {/* Composer */}
                <ThemedView
                    className="flex-row items-center gap-2 px-2 py-2 border-t"
                    style={{ backgroundColor: TOKENS.card, borderColor: TOKENS.border }}
                >
                    <Pressable
                        className="w-10 h-10 rounded-full items-center justify-center border"
                        style={{ backgroundColor: TOKENS.cardAlt, borderColor: TOKENS.border }}
                    >
                        <IconSymbol name="camera.fill" size={16} color={TOKENS.text} />
                    </Pressable>

                    <View
                        className="flex-1 rounded-full border pr-9"
                        style={{ backgroundColor: TOKENS.inputBg, borderColor: TOKENS.border }}
                    >
                        <TextInput
                            value={message}
                            onChangeText={setMessage}
                            placeholder="Type a message..."
                            placeholderTextColor={TOKENS.placeholder}
                            style={{ color: TOKENS.text, paddingHorizontal: 12, paddingVertical: 10, fontSize: 14 }}
                            onSubmitEditing={handleSend}
                            returnKeyType="send"
                        />
                        <Pressable className="absolute right-1 top-1 w-8 h-8 rounded-full items-center justify-center">
                            <IconSymbol name="face.smiling" size={16} color={TOKENS.textMuted} />
                        </Pressable>
                    </View>

                    <Pressable
                        onPress={handleSend}
                        disabled={!canSend}
                        className="w-11 h-11 rounded-full items-center justify-center"
                        style={{ backgroundColor: TOKENS.accent, opacity: canSend ? 1 : 0.5 }}
                    >
                        <IconSymbol name="paperplane.fill" size={16} color="#fff" />
                    </Pressable>
                </ThemedView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
