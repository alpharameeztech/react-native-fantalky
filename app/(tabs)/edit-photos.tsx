// app/(tabs)/nine.tsx
import React, { useMemo, useState } from 'react';
import { StyleSheet, View, Pressable, Dimensions, Alert } from 'react-native';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import * as Device from 'expo-device';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

const { width } = Dimensions.get('window');
const PAGE_PAD = 24;
const GAP = 12;
const TILE_W = (width - PAGE_PAD * 2 - GAP) / 2;
const TILE_H = TILE_W * (4 / 3);
const MAX_PHOTOS = 6;

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

// derive a readable id/name from the URL for logging
const getImageIdFromUri = (uri: string, index: number) => {
    try {
        const path = uri.split('?')[0];
        const name = path.substring(path.lastIndexOf('/') + 1);
        return name || `image-${index + 1}`;
    } catch {
        return `image-${index + 1}`;
    }
};

export default function TabNineScreen() {
    const [photos, setPhotos] = useState<Photo[]>([
        { id: '1', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1200&fit=crop', isMain: true },
        { id: '2', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=1200&fit=crop', isMain: false },
        { id: '3', url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=1200&fit=crop', isMain: false },
    ]);

    const filled = useMemo(() => photos.filter(p => !!p.url), [photos]);
    const canAddMore = filled.length < MAX_PHOTOS;

    const handleSetMainPhoto = (photoId: string) => {
        setPhotos(prev => prev.map(p => ({ ...p, isMain: p.id === photoId && p.url !== '' })));
    };

    const handleDeletePhoto = (photo: Photo, index: number) => {
        const readableId = getImageIdFromUri(photo.url, index);
        console.log('DELETE_IMAGE:', { id: readableId, url: photo.url, index });

        setPhotos(prev => {
            const next = prev.map(p => (p.id === photo.id ? { ...p, url: '', isMain: false } : p));
            // Ensure we keep one "main" if any photos remain
            if (!next.some(p => p.isMain) && next.some(p => p.url)) {
                const first = next.find(p => p.url);
                if (first) first.isMain = true;
            }
            return [...next];
        });
    };

    // ---- Add / upload flow (upload is stubbed/logged) ----
    const processPhotoOnBackend = async (localUri: string) => {
        console.log('UPLOAD_TO_BACKEND_START', { localUri });
        // TODO: replace with your real API call; return remote URL from server
        console.log('UPLOAD_TO_BACKEND_SUCCESS', { remoteUrl: localUri });
        return localUri;
    };

    const addUriToGrid = (uri: string) => {
        setPhotos(prev => {
            const currentCount = prev.filter(p => p.url).length;
            if (currentCount >= MAX_PHOTOS) return prev;

            const hasMain = prev.some(p => p.isMain && p.url);
            const firstBlankIdx = prev.findIndex(p => !p.url);

            if (firstBlankIdx !== -1) {
                const next = [...prev];
                next[firstBlankIdx] = { ...next[firstBlankIdx], url: uri, isMain: !hasMain };
                console.log('ADD_TO_GRID_FILL_SLOT', next[firstBlankIdx]);
                return next;
            }

            const newPhoto: Photo = { id: String(Date.now()), url: uri, isMain: !hasMain };
            console.log('ADD_TO_GRID_APPEND', newPhoto);
            return [...prev, newPhoto];
        });
    };

    // Gallery picker (unchanged behavior for Add Photo tile)
    const handlePickFromGallery = async () => {
        try {
            if (!canAddMore) return;

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ['images'], // ✅ new API uses string literals
                allowsEditing: true,
                aspect: [3, 4],
                quality: 0.9,
                selectionLimit: 1,
            });
            console.log('GALLERY_RESULT', result);

            if (!result.canceled && result.assets?.[0]?.uri) {
                const localUri = result.assets[0].uri;
                const uploaded = await processPhotoOnBackend(localUri);
                addUriToGrid(uploaded);
            }
        } catch (e) {
            console.warn('handlePickFromGallery error', e);
            Alert.alert('Error', 'Could not pick a photo.');
        }
    };

    // Take a picture then upload then show it
    const handleAddFromCamera = async () => {
        try {
            if (!canAddMore) return;

            // Simulator-safe fallback
            if (!Device.isDevice) {
                Alert.alert('Camera not available in simulator', 'Opening gallery instead.');
                return handlePickFromGallery();
            }

            const cam = await ImagePicker.requestCameraPermissionsAsync();
            if (!cam.granted) {
                Alert.alert('Permission needed', 'Camera permission is required to take a photo.');
                return;
            }

            const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ['images'], // ✅ string literal
                allowsEditing: true,
                aspect: [3, 4],
                quality: 0.9,
            });
            console.log('CAMERA_RESULT', result);

            if (!result.canceled && result.assets?.[0]?.uri) {
                const localUri = result.assets[0].uri;
                const uploaded = await processPhotoOnBackend(localUri);
                addUriToGrid(uploaded);
            }
        } catch (e) {
            console.warn('handleAddFromCamera error', e);
            Alert.alert('Error', 'Could not capture photo.');
        }
    };
    // ------------------------------------------------------

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
            headerImage={
                <ThemedView className="h-[200px] rounded-b-2xl overflow-hidden">
                    {/* header image */}
                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1520975930498-0f8d7a6a1533?q=80&w=1600&auto=format&fit=crop' }}
                        contentFit="cover"
                        className="w-full h-full"
                    />

                    {/* header pill */}
                    <ThemedView
                        className="absolute top-3 left-3 rounded-full flex-row items-center px-2.5 py-1.5"
                        style={{ backgroundColor: '#5b6cff' }}
                    >
                        <IconSymbol name="camera.fill" size={16} color="#fff" />
                        <ThemedText type="defaultSemiBold" className="text-white text-xs ml-1.5">
                            Manage Photos
                        </ThemedText>
                    </ThemedView>

                    {/* header actions */}
                    <View className="absolute top-3 right-3 flex-row space-x-2">
                        <Pressable className="rounded-2xl px-2.5 py-2" style={{ backgroundColor: 'rgba(0,0,0,0.55)' }}>
                            <IconSymbol name="chevron.left" size={18} color="#fff" />
                        </Pressable>
                        <Pressable className="rounded-2xl px-2.5 py-2" style={{ backgroundColor: 'rgba(0,0,0,0.55)' }}>
                            <IconSymbol name="pencil" size={18} color="#fff" />
                        </Pressable>
                    </View>
                </ThemedView>
            }
        >
            {/* Tips */}
            <ThemedView
                className="rounded-2xl p-4 mt-3 border"
                style={{ backgroundColor: TOKENS.card, borderColor: TOKENS.border }}
            >
                <View className="flex-row items-center gap-2 mb-2">
                    <IconSymbol name="star.fill" size={16} color="#f59e0b" />
                    <ThemedText type="defaultSemiBold" style={{ color: TOKENS.text }}>
                        Photo Tips
                    </ThemedText>
                </View>
                <View className="gap-1.5">
                    <ThemedText style={{ color: TOKENS.textMuted }}>• Use high-quality, recent photos</ThemedText>
                    <ThemedText style={{ color: TOKENS.textMuted }}>• Show your face clearly in the first photo</ThemedText>
                    <ThemedText style={{ color: TOKENS.textMuted }}>• Include full-body shots and varied settings</ThemedText>
                    <ThemedText style={{ color: TOKENS.textMuted }}>• Smile and look at the camera</ThemedText>
                </View>
            </ThemedView>

            {/* Grid */}
            <ThemedView
                className="rounded-2xl mt-3 border p-3"
                style={{ backgroundColor: TOKENS.card, borderColor: TOKENS.border }}
            >
                <View className="flex-row flex-wrap justify-between" style={{ rowGap: GAP }}>
                    {/* Only filled photos */}
                    {filled.map((photo, index) => (
                        <View
                            key={photo.id}
                            className="rounded-xl overflow-hidden border"
                            style={{ width: TILE_W, height: TILE_H, backgroundColor: TOKENS.cardAlt, borderColor: TOKENS.border }}
                        >
                            <View className="flex-1">
                                <>
                                    {/* tile image */}
                                    <Image
                                        source={{ uri: photo.url }}
                                        style={StyleSheet.absoluteFillObject}
                                        contentFit="cover"
                                        transition={150}
                                    />

                                    {/* Main badge */}
                                    {photo.isMain && (
                                        <View className="absolute top-2 left-2 rounded-full px-2 py-1" style={{ backgroundColor: TOKENS.accent }}>
                                            <ThemedText className="text-white text-[11px] font-bold">Main</ThemedText>
                                        </View>
                                    )}

                                    {/* tile actions */}
                                    <View className="absolute top-2 right-2 flex-row" style={{ columnGap: 6 }}>
                                        {!photo.isMain && (
                                            <Pressable
                                                onPress={() => handleSetMainPhoto(photo.id)}
                                                className="items-center justify-center rounded-full"
                                                style={{ width: 30, height: 30, backgroundColor: '#ffffffE6' }}
                                            >
                                                <IconSymbol name="star.fill" size={14} color="#f59e0b" />
                                            </Pressable>
                                        )}
                                        <Pressable
                                            onPress={() => handleDeletePhoto(photo, index)}
                                            className="items-center justify-center rounded-full"
                                            style={{ width: 30, height: 30, backgroundColor: '#ffffffE6' }}
                                        >
                                            <IconSymbol name="xmark" size={14} color={TOKENS.danger} />
                                        </Pressable>
                                    </View>

                                    {/* index badge */}
                                    <View
                                        className="absolute left-2 bottom-2 w-6 h-6 rounded-full items-center justify-center"
                                        style={{ backgroundColor: 'rgba(0,0,0,0.55)' }}
                                    >
                                        <ThemedText className="text-white text-xs font-bold">{index + 1}</ThemedText>
                                    </View>
                                </>
                            </View>
                        </View>
                    ))}

                    {/* ✅ Single "Add Photo" tile at end -> opens Gallery (unchanged) */}
                    {canAddMore && (
                        <Pressable
                            key="add-photo"
                            onPress={handlePickFromGallery}
                            className="rounded-xl overflow-hidden border items-center justify-center"
                            style={{ width: TILE_W, height: TILE_H, backgroundColor: TOKENS.cardAlt, borderColor: TOKENS.border }}
                        >
                            <View className="flex-1 items-center justify-center">
                                <IconSymbol name="plus" size={26} color={TOKENS.textMuted} />
                                <ThemedText type="defaultSemiBold" className="mt-1.5 text-xs" style={{ color: TOKENS.textMuted }}>
                                    Add Photo
                                </ThemedText>
                            </View>
                        </Pressable>
                    )}
                </View>
            </ThemedView>

            {/* Actions */}
            <ThemedView
                className="rounded-2xl p-4 mt-3 border"
                style={{ backgroundColor: TOKENS.card, borderColor: TOKENS.border }}
            >
                <Pressable
                    onPress={handleAddFromCamera}
                    className="rounded-xl py-3.5 flex-row items-center justify-center mb-2.5"
                    style={{ backgroundColor: TOKENS.accent }}
                >
                    <IconSymbol name="camera.fill" size={16} color="#fff" />
                    <ThemedText type="defaultSemiBold" className="ml-2 text-[15px]" style={{ color: '#fff' }}>
                        Take New Photo
                    </ThemedText>
                </Pressable>

                <Pressable
                    onPress={handlePickFromGallery}
                    className="rounded-xl py-3.5 flex-row items-center justify-center border"
                    style={{ backgroundColor: TOKENS.cardAlt, borderColor: TOKENS.border }}
                >
                    <IconSymbol name="plus" size={16} color={TOKENS.accent} />
                    <ThemedText type="defaultSemiBold" className="ml-2 text-[15px]" style={{ color: TOKENS.accent }}>
                        Choose from Gallery
                    </ThemedText>
                </Pressable>
            </ThemedView>

            {/* Guidelines */}
            <ThemedView className="rounded-2xl p-4 mt-3 border" style={{ backgroundColor: TOKENS.card, borderColor: TOKENS.border }}>
                <ThemedText type="defaultSemiBold" className="mb-2" style={{ color: TOKENS.text }}>
                    Photo Guidelines
                </ThemedText>

                <View className="gap-2.5">
                    <View className="flex-row items-start gap-2.5">
                        <View className="w-2 h-2 rounded-full mt-1.5" style={{ backgroundColor: TOKENS.success }} />
                        <View>
                            <ThemedText type="defaultSemiBold" style={{ color: TOKENS.text }}>Do</ThemedText>
                            <ThemedText style={{ color: TOKENS.textMuted }}>Use recent, clear photos of yourself</ThemedText>
                        </View>
                    </View>

                    <View className="flex-row items-start gap-2.5">
                        <View className="w-2 h-2 rounded-full mt-1.5" style={{ backgroundColor: TOKENS.danger }} />
                        <View>
                            <ThemedText type="defaultSemiBold" style={{ color: TOKENS.text }}>Don’t</ThemedText>
                            <ThemedText style={{ color: TOKENS.textMuted }}>Use group photos as your main image</ThemedText>
                        </View>
                    </View>

                    <View className="flex-row items-start gap-2.5">
                        <View className="w-2 h-2 rounded-full mt-1.5" style={{ backgroundColor: TOKENS.success }} />
                        <View>
                            <ThemedText type="defaultSemiBold" style={{ color: TOKENS.text }}>Do</ThemedText>
                            <ThemedText style={{ color: TOKENS.textMuted }}>Show your personality and interests</ThemedText>
                        </View>
                    </View>

                    <View className="flex-row items-start gap-2.5">
                        <View className="w-2 h-2 rounded-full mt-1.5" style={{ backgroundColor: TOKENS.danger }} />
                        <View>
                            <ThemedText type="defaultSemiBold" style={{ color: TOKENS.text }}>Don’t</ThemedText>
                            <ThemedText style={{ color: TOKENS.textMuted }}>
                                Use heavily filtered or misleading photos
                            </ThemedText>
                        </View>
                    </View>
                </View>
            </ThemedView>

            {/* Footer summary */}
            <ThemedView className="rounded-2xl p-4 mt-3 border items-center" style={{ backgroundColor: TOKENS.card, borderColor: TOKENS.border }}>
                <ThemedText style={{ color: TOKENS.textMuted }}>
                    {filled.length}/{MAX_PHOTOS} photos added · Pick your best as{' '}
                    <ThemedText style={{ color: TOKENS.text }}>Main</ThemedText>
                </ThemedText>
            </ThemedView>
        </ParallaxScrollView>
    );
}
