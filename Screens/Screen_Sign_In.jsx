import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { createAccount } from '../api'; // Adjust the import path as needed

const toastConfig = {
    error: ({ text1, text2, props }) => (
        <View style={{
            height: 60,
            width: '90%',
            backgroundColor: 'white', 
            borderColor: '#25C3D9', 
            borderWidth: 2, 
            borderLeftWidth: 5, 
            borderLeftColor: '#25C3D9', 
            borderRadius: 10, 
            justifyContent: 'center',
            paddingHorizontal: 15,
            alignSelf: 'center',
            zIndex: 999, 
        }}>
            <Text style={{ color: '#25C3D9', fontSize: 18, fontWeight: 'bold' }}>{text1}</Text>
            <Text style={{ color: 'gray', fontSize: 16 }}>{text2}</Text>
        </View>
    ),
};

export default function Screen_Sign_In() {
    const navigation = useNavigation();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSignUp = () => {
        createAccount(name, password)
            .then(() => {
                navigation.navigate("Screen1");
            })
            .catch(error => {
                console.error('Error creating account', error);
            });
    };

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.container}>
                <View style={{alignItems: "center", gap: 10, marginBottom: 64}}>
                    <Image 
                        source={require('../assets/images/icon.png')}
                        style={{width: 80, height: 80}}
                    />
                    <Text style={{fontSize: 40, fontWeight: 'bold', marginTop: 8}}>Hello Again!</Text>
                    <Text style={{fontSize: 18, color: 'gray', }}>Sign up your account</Text>
                </View>
                <View style={{gap: 28}}>
                    <View style={styles.groupInput}>
                        <Image
                            source={require('../assets/images/Vector.png')}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your name "
                            onChangeText={text => setName(text)}
                        />
                    </View>
                    <View style={styles.groupInput}>
                        <Image
                            source={require('../assets/images/lock.png')}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your password"
                            secureTextEntry={!showPassword} 
                            onChangeText={text => setPassword(text)}
                        />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}> 
                            <Image
                                style={{width: 20, height: 20}}
                                source={showPassword ? require('../assets/images/eye.png') : require('../assets/images/eyeLock.png')}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <Text style={{alignSelf: 'flex-end', color: '#00BDD6', fontSize: 16, marginBottom: 28, marginTop: 16}}>Forgot password?</Text>
                </View>
                <TouchableOpacity 
                    style={{
                        backgroundColor: '#00BDD6',
                        alignItems: 'center',
                        borderRadius: 16,
                        padding: 14
                    }}
                    onPress={handleSignUp}
                    >
                    <Text style={{color: '#fff', fontSize: 20}}>Sign up</Text>
                </TouchableOpacity>
                <View style={{flexDirection: 'row', alignItems: 'center', gap: 16, width: "100%", justifyContent: 'center', marginTop: 25, marginBottom: 20}}> 
                    <View style={{width: "40%", height: 1, backgroundColor: 'lightgray'}}></View>
                    <Text style={{fontSize: 20, color: 'gray'}}>or</Text>
                    <View style={{width: "44%", height: 1, backgroundColor: 'lightgray'}}></View>
                </View>
                <TouchableOpacity 
                    style={{
                        alignItems: 'center',
                        borderRadius: 16,
                        padding: 14,
                    }}
                    onPress={() => {
                        navigation.navigate("Screen1", { name });
                    }}
                    >
                    <Text style={{color: 'gray', fontSize: 20,  textDecorationLine: 'underline'}}>Sign in</Text>
                </TouchableOpacity>
                <Toast config={toastConfig} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 50
    },
    groupInput: {
        flexDirection: 'row',
        borderWidth: 1,
        alignItems: 'center',
        padding: 12,
        borderRadius: 16,
        gap: 8,
    },
    input: {
        fontSize: 20,
        flex: 1,
    }
});
