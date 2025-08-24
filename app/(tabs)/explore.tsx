// app/(tabs)/eight.tsx
import React, { useMemo, useRef, useState } from 'react';
import {
    StyleSheet,
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
    bg: '#0f1217',
    card: '#14161c',
    cardAlt: '#181a20',
    border: '#2a2e36',
    text: '#f2f4f8',
    textMuted: '#c7cdd4',
    accent: '#ff37ad',
    inputBg: '#1b1e25',
    placeholder: '#9aa3ad',
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
    image:
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop',
    isOnline: true,
    lastSeen: 'Active now',
};

const INITIAL_MESSAGES: ChatMsg[] = [
    { id: '1', text: 'Hey! Thanks for the match! 😊', sender: 'other', time: '10:30 AM', type: 'text' },
    { id: '2', text: 'Hi Emma! Great to meet you! Your profile caught my eye', sender: 'me', time: '10:32 AM', type: 'text' },
    { id: '3', text: 'Aww thank you! I love your photos from the hiking trip', sender: 'other', time: '10:35 AM', type: 'text' },
    { id: '4', text: '🌹', sender: 'me', time: '10:36 AM', type: 'gift' },
    { id: '5', text: 'That hiking spot is one of my favorites! Do you enjoy outdoor activities too?', sender: 'me', time: '10:38 AM', type: 'text' },
    { id: '6', text: 'Oh my gosh, thank you for the rose! 💕 And yes, I love hiking and being outdoors!', sender: 'other', time: '10:40 AM', type: 'text' },
    { id: '7', text: 'Maybe we could go on a hike together sometime? I know some amazing trails around the city', sender: 'other', time: '10:42 AM', type: 'text' },
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
        const bubbleStyle = [
            styles.bubble,
            mine ? styles.bubbleMine : styles.bubbleOther,
            mine ? { alignSelf: 'flex-end' } : { alignSelf: 'flex-start' },
        ];

        if (item.type === 'gift') {
            return (
                <View style={[styles.row, { justifyContent: mine ? 'flex-end' : 'flex-start' }]}>
                    <View style={[styles.giftBubble, mine ? styles.giftMine : styles.giftOther]}>
                        <IconSymbol name="gift.fill" size={20} color="#fff" />
                        <ThemedText type="defaultSemiBold" style={styles.giftLabel}>Sent a gift</ThemedText>
                        <ThemedText style={styles.giftEmoji}>{item.text}</ThemedText>
                    </View>
                    <ThemedText style={[styles.time, mine ? { textAlign: 'right' } : { textAlign: 'left' }]}>
                        {item.time}
                    </ThemedText>
                </View>
            );
        }

        return (
            <View style={[styles.row, { justifyContent: mine ? 'flex-end' : 'flex-start' }]}>
                <View style={bubbleStyle}>
                    <ThemedText style={styles.msgText}>{item.text}</ThemedText>
                </View>
                <ThemedText style={[styles.time, mine ? { textAlign: 'right' } : { textAlign: 'left' }]}>
                    {item.time}
                </ThemedText>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.safe}>
            {/* Header */}
            <ThemedView style={styles.header}>
                <View style={styles.headerLeft}>
                    <Pressable style={styles.iconBtn}>
                        <IconSymbol name="chevron.left" size={18} color={TOKENS.text} />
                    </Pressable>

                    <View style={styles.matchWrap}>
                        <View style={{ position: 'relative' }}>
                            <Image source={{ uri: MATCH.image }} style={styles.avatar} contentFit="cover" />
                            {MATCH.isOnline && <View style={styles.onlineDot} />}
                        </View>
                        <View>
                            <ThemedText type="defaultSemiBold" style={styles.matchName}>
                                {MATCH.name}
                            </ThemedText>
                            <ThemedText style={styles.matchSeen}>{MATCH.lastSeen}</ThemedText>
                        </View>
                    </View>
                </View>

                <View style={styles.headerRight}>
                    <Pressable style={styles.iconBtn}><IconSymbol name="phone.fill" size={18} color={TOKENS.text} /></Pressable>
                    <Pressable style={styles.iconBtn}><IconSymbol name="video.fill" size={18} color={TOKENS.text} /></Pressable>
                    <Pressable style={styles.iconBtn}><IconSymbol name="ellipsis" size={18} color={TOKENS.text} /></Pressable>
                </View>
            </ThemedView>

            {/* Messages */}
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={{ flex: 1 }}
                keyboardVerticalOffset={80}
            >
                <FlatList
                    ref={listRef}
                    data={msgs}
                    keyExtractor={m => m.id}
                    renderItem={renderItem}
                    contentContainerStyle={styles.listContent}
                    onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: false })}
                />

                {/* Quick actions */}
                <ThemedView style={styles.quickActions}>
                    <Pressable style={[styles.quickBtn, { backgroundColor: 'rgba(239,68,68,0.12)' }]}>
                        <IconSymbol name="heart.fill" size={18} color="#ef4444" />
                    </Pressable>
                    <Pressable style={[styles.quickBtn, { backgroundColor: 'rgba(139,92,246,0.15)' }]}>
                        <IconSymbol name="gift.fill" size={18} color="#8b5cf6" />
                    </Pressable>
                </ThemedView>

                {/* Composer */}
                <ThemedView style={styles.composerWrap}>
                    <Pressable style={styles.compIcon}><IconSymbol name="camera.fill" size={16} color={TOKENS.text} /></Pressable>

                    <View style={styles.inputWrap}>
                        <TextInput
                            value={message}
                            onChangeText={setMessage}
                            placeholder="Type a message..."
                            placeholderTextColor={TOKENS.placeholder}
                            style={styles.input}
                            onSubmitEditing={handleSend}
                            returnKeyType="send"
                        />
                        <Pressable style={styles.emojiBtn}>
                            <IconSymbol name="face.smiling" size={16} color={TOKENS.textMuted} />
                        </Pressable>
                    </View>

                    <Pressable style={styles.compIcon}><IconSymbol name="mic.fill" size={16} color={TOKENS.text} /></Pressable>

                    <Pressable
                        onPress={handleSend}
                        disabled={!canSend}
                        style={[styles.sendBtn, !canSend && { opacity: 0.5 }]}
                    >
                        <IconSymbol name="paperplane.fill" size={16} color="#fff" />
                    </Pressable>
                </ThemedView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: TOKENS.bg },

    // Header
    header: {
        backgroundColor: TOKENS.card,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: TOKENS.border,
        paddingHorizontal: 12,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    headerRight: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    iconBtn: {
        width: 36, height: 36, borderRadius: 18,
        alignItems: 'center', justifyContent: 'center',
        backgroundColor: TOKENS.cardAlt, borderWidth: StyleSheet.hairlineWidth, borderColor: TOKENS.border,
    },
    matchWrap: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#22252b' },
    onlineDot: {
        position: 'absolute', right: -1, bottom: -1, width: 12, height: 12, borderRadius: 6,
        backgroundColor: TOKENS.success, borderWidth: 2, borderColor: TOKENS.card,
    },
    matchName: { color: TOKENS.text, fontSize: 15 },
    matchSeen: { color: TOKENS.textMuted, fontSize: 11, marginTop: 2 },

    // List
    listContent: { paddingHorizontal: 14, paddingTop: 12, paddingBottom: 8 },
    row: { marginBottom: 8 },
    bubble: {
        maxWidth: '80%',
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 18,
    },
    bubbleMine: { backgroundColor: TOKENS.accent, borderTopRightRadius: 4 },
    bubbleOther: { backgroundColor: TOKENS.card, borderWidth: StyleSheet.hairlineWidth, borderColor: TOKENS.border, borderTopLeftRadius: 4 },
    msgText: { color: '#fff', fontSize: 14 },

    time: { color: TOKENS.textMuted, fontSize: 10, marginTop: 4 },

    // Gift bubble
    giftBubble: {
        maxWidth: '80%',
        padding: 14,
        borderRadius: 18,
        alignItems: 'center',
        gap: 6,
    },
    giftMine: { backgroundColor: TOKENS.accent },
    giftOther: { backgroundColor: TOKENS.card, borderWidth: StyleSheet.hairlineWidth, borderColor: TOKENS.border },
    giftLabel: { color: '#fff', fontSize: 12 },
    giftEmoji: { color: '#fff', fontSize: 22, marginTop: 2 },

    // Quick actions
    quickActions: {
        paddingVertical: 8,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: TOKENS.border,
        backgroundColor: TOKENS.card,
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 12,
    },
    quickBtn: {
        width: 44, height: 44, borderRadius: 22,
        alignItems: 'center', justifyContent: 'center',
        borderWidth: StyleSheet.hairlineWidth, borderColor: TOKENS.border,
    },

    // Composer
    composerWrap: {
        backgroundColor: TOKENS.card,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: TOKENS.border,
        paddingHorizontal: 10,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    compIcon: {
        width: 40, height: 40, borderRadius: 20,
        backgroundColor: TOKENS.cardAlt, borderWidth: StyleSheet.hairlineWidth, borderColor: TOKENS.border,
        alignItems: 'center', justifyContent: 'center',
    },
    inputWrap: {
        flex: 1,
        position: 'relative',
        backgroundColor: TOKENS.inputBg,
        borderRadius: 22,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: TOKENS.border,
        paddingRight: 36,
    },
    input: {
        color: TOKENS.text,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 14,
    },
    emojiBtn: {
        position: 'absolute',
        right: 4,
        top: 4,
        width: 32, height: 32, borderRadius: 16,
        alignItems: 'center', justifyContent: 'center',
    },
    sendBtn: {
        backgroundColor: TOKENS.accent,
        width: 44, height: 44, borderRadius: 22,
        alignItems: 'center', justifyContent: 'center',
    },
});
