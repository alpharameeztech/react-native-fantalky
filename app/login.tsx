// app/login.tsx
import React, { useState } from 'react';
import {
    View,
    TextInput,
    SafeAreaView,
    ActivityIndicator,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useRouter } from 'expo-router';
import '../global.css';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const onLoginPress = () => {
        // View only. Hook your auth here later.
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 1000);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f0f0f0' }}>
            <View style={styles.container}>
                <View style={{ marginTop: 130, width: 260 }}>
                    <ThemedText className="text-xl font-bold text-blue-500">Login Screen</ThemedText>

                    <View style={{ marginTop: 40 }}>
                        <TextInput
                            style={[styles.inputBox, styles.mt4]}
                            onChangeText={setEmail}
                            value={email}
                            placeholder="Email"
                            placeholderTextColor="gray"
                            textContentType="emailAddress"
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                        <TextInput
                            style={[styles.inputBox, styles.mt4]}
                            onChangeText={setPassword}
                            value={password}
                            placeholder="Password"
                            placeholderTextColor="gray"
                            autoCapitalize="none"
                            secureTextEntry
                        />
                    </View>

                    <TouchableOpacity onPress={onLoginPress} style={[styles.loginButton, styles.mt5]}>
                        {isLoading && (
                            <ActivityIndicator style={{ marginRight: 18 }} size="small" color="white" />
                        )}
                        <ThemedText style={styles.loginButtonText}>Login</ThemedText>
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 12 }}>
                        <ThemedText style={styles.registerText}>Don't have an account?</ThemedText>
                        <TouchableOpacity onPress={() => router.push('/register')}>
                            <ThemedText style={styles.registerTextLink}> Register</ThemedText>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#1d9bf1', alignItems: 'center' },
    inputBox: { backgroundColor: 'white', borderRadius: 5, padding: 10 },
    loginButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0084b3',
        padding: 12,
        borderRadius: 5,
    },
    loginButtonText: { color: 'white' },
    registerText: { fontSize: 12 },
    registerTextLink: { fontSize: 12, color: 'white', textDecorationLine: 'underline' },
    mt4: { marginTop: 16 },
    mt5: { marginTop: 22 },
});
