import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { patchPassword } from "../api";
import Toast from "react-native-toast-message";
import { useCart } from "../contextCart";

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

export default function Screen_Change_Pasword() {
    const route = useRoute();
    const navigation = useNavigation();
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const {accountInSession, updateAccountInSession, resetAccountInSession} = useCart();


   
    function checkConfirmPassword() {
        return newPassword === confirmPassword;
    }


    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.container}>
                <View style={{alignItems: "center", gap: 10, marginBottom: 64}}>
                    <Text style={{fontSize: 40, fontWeight: 'bold', marginTop: 100}}>Change Password</Text>
                </View>
                <View style={{gap: 28}}>
                    <View style={styles.groupInput}>
                        <Image
                            source={require('../assets/images/Vector.png')}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Enter new password "
                            onChangeText={text => setNewPassword(text)}
                        />
                    </View>
                    <View style={styles.groupInput}>
                        <Image
                            source={require('../assets/images/lock.png')}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Enter confirm password"
                            onChangeText={text => setConfirmPassword(text)}
                        />
                        
                    </View>
                    <TouchableOpacity 
                        style={{
                            backgroundColor: '#00BDD6',
                            alignItems: 'center',
                            borderRadius: 16,
                            padding: 14, 
                            width: 100,
                            alignSelf: 'flex-end'
                        }}
                        onPress={async () => {
                            if (checkConfirmPassword(newPassword, confirmPassword)) {
                                try {
                                    await patchPassword(accountInSession.id, newPassword);
                                    Toast.show({
                                        type: 'success',
                                        text1: 'Success',
                                        text2: 'Password changed successfully',
                                        position: 'top',
                                        visibilityTime: 2000,
                                    });
                                    navigation.navigate("Screen1");
                                } catch (error) {
                                    Toast.show({
                                        type: 'error',
                                        text1: 'Error',
                                        text2: 'Failed to change password',
                                        position: 'top',
                                        visibilityTime: 2000,
                                    });
                                }
                            } else {
                                Toast.show({
                                    type: 'error',
                                    text1: 'Warning',
                                    text2: 'New password or confirm password is not equal',
                                    position: 'top',
                                    visibilityTime: 2000,
                                });
                            }
                        }}
                        
                    >
                    <Text style={{color: '#fff', fontSize: 20}}>Save</Text>
                </TouchableOpacity>
                </View>
                
                
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
        paddingTop: 50,
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
})