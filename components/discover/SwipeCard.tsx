import React, { useMemo } from "react";
import { Dimensions, PanResponder, Animated, View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";

const SCREEN = Dimensions.get("window");
const SWIPE_THRESHOLD = 120;

const CARD_W = Math.min(Math.round(SCREEN.width * 0.92), 380);
const CARD_H = Math.round((CARD_W * 4) / 3);

const BLURHASH = "L6Pj0^i_.AyE_3t7t7R**0o#DgR4";

export type Profile = {
    id: string; name: string; age: number; location: string; bio: string;
    occupation: string; images: string[]; distance: number; verified: boolean;
};

export function SwipeCard({
                              profile,
                              onSwipe,
                          }: {
    profile: Profile;
    onSwipe: (dir: "left" | "right", id: string) => void;
}) {
    const pan = useMemo(() => new Animated.ValueXY(), []);
    const rotate = pan.x.interpolate({
        inputRange: [-SCREEN.width, 0, SCREEN.width],
        outputRange: ["-20deg", "0deg", "20deg"],
    });

    const likeOpacity = pan.x.interpolate({
        inputRange: [0, SWIPE_THRESHOLD],
        outputRange: [0, 1],
        extrapolate: "clamp",
    });
    const nopeOpacity = pan.x.interpolate({
        inputRange: [-SWIPE_THRESHOLD, 0],
        outputRange: [1, 0],
        extrapolate: "clamp",
    });

    const responder = useMemo(
        () =>
            PanResponder.create({
                onStartShouldSetPanResponder: () => true,
                onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
                    useNativeDriver: false,
                }),
                onPanResponderRelease: (_e, { dx, vy }) => {
                    if (dx > SWIPE_THRESHOLD) {
                        Animated.timing(pan, {
                            toValue: { x: SCREEN.width + 100, y: vy * 25 },
                            duration: 220,
                            useNativeDriver: false,
                        }).start(() => onSwipe("right", profile.id));
                    } else if (dx < -SWIPE_THRESHOLD) {
                        Animated.timing(pan, {
                            toValue: { x: -SCREEN.width - 100, y: vy * 25 },
                            duration: 220,
                            useNativeDriver: false,
                        }).start(() => onSwipe("left", profile.id));
                    } else {
                        Animated.spring(pan, {
                            toValue: { x: 0, y: 0 },
                            friction: 6,
                            useNativeDriver: false,
                        }).start();
                    }
                },
            }),
        [onSwipe, pan, profile.id]
    );

    return (
        // OUTER: size/transform + elevation, NO overflow hidden
        <Animated.View
            {...responder.panHandlers}
            style={{
                width: CARD_W,
                height: CARD_H,
                transform: [{ translateX: pan.x }, { translateY: pan.y }, { rotate }],
                position: "relative",
                elevation: 8,   // Android shadow
                zIndex: 2,      // iOS stacking
            }}
            className="rounded-2xl"
        >
            {/* INNER: rounded + overflow hidden + actual image */}
            <View className="flex-1 rounded-2xl overflow-hidden bg-[#181a20]">
                <Image
                    source={{ uri: profile.images?.[0] ?? "" }}
                    placeholder={BLURHASH}
                    transition={300}
                    contentFit="cover"
                    style={StyleSheet.absoluteFillObject}
                    // cachePolicy="memory-disk"
                    // onError={(e) => console.log("Image error:", e.nativeEvent)}
                />

                {/* Bottom info overlay */}
                <View className="absolute bottom-0 left-0 right-0 p-4 bg-black/40">
                    <View className="flex-row items-end">
                        <Text className="text-white text-2xl font-extrabold mr-2">
                            {profile.name}, {profile.age}
                        </Text>
                        <Text className="text-white/80">{profile.distance} km away</Text>
                    </View>
                    <Text className="text-white/90 mt-1">{profile.location}</Text>
                    <Text className="text-white/80 mt-2" numberOfLines={2}>
                        {profile.bio}
                    </Text>
                </View>

                {/* LIKE / NOPE */}
                <Animated.View
                    style={{ opacity: likeOpacity }}
                    className="absolute top-4 right-4 px-3 py-1 rounded-md border border-white/60"
                >
                    <Text className="text-white font-bold">LIKE</Text>
                </Animated.View>
                <Animated.View
                    style={{ opacity: nopeOpacity }}
                    className="absolute top-4 left-4 px-3 py-1 rounded-md border border-white/60"
                >
                    <Text className="text-white font-bold">NOPE</Text>
                </Animated.View>
            </View>
        </Animated.View>
    );
}
