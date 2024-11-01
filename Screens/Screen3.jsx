import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useCart } from "../contextCart";
import Toast from "react-native-toast-message";
import { MenuProvider,  Menu, MenuTrigger, MenuOptions, MenuOption } from "react-native-popup-menu";
import { API_URL } from '@env'

const toastConfig = {
    error: ({ text1, text2, props }) => (
        <View style={{
            height: 90,
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

export default function Screen3() {
    const route = useRoute();
    const navigation = useNavigation();
    const {carts, addCart, deleteCart, updateQuantity, decrementQuantity, checkExist, resetQuantity,  accountInSession, updateAccountInSession} = useCart();


    const calculateTotal = () => {
        return carts.reduce((total, cart) => {
            const cartTotal = cart.sl * parseFloat(cart.price);
            return total + cartTotal;
        }, 0).toFixed(2);  
    };

    return (
        // <MenuProvider>
            <SafeAreaView style={{flex: 1}}>
                {/* Begin header */}
                <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 16, backgroundColor: '#00BDD6'}}>
                    <TouchableOpacity 
                        style={{
                            flexDirection: 'row', 
                            alignItems: 'center', 
                            gap: 16
                        }}
                        onPress={() => navigation.goBack()}
                    >
                        <Image
                            style={{width: 18, height: 18}}
                            source={require('../assets/images/Image183.png')}
                        />
                        <Text style={{fontSize: 20, fontWeight: 'bold', color: '#fff'}}>Carts</Text>
                    </TouchableOpacity>
                        
                    <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
                        <Menu>
                            <MenuTrigger style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
                                <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>{accountInSession.name}</Text>
                                <Image
                                    style={{width: 28, height: 28, borderRadius: '50%'}}
                                    source={require('../assets/images/duy.jpg')}
                                />
                            </MenuTrigger>
                            <MenuOptions>
                                <MenuOption>
                                    <TouchableOpacity onPress={() => navigation.navigate('Screen1')}  style={{padding: 16, borderWidth: 1}}>
                                        <Text>Log out</Text>
                                    </TouchableOpacity>
                                </MenuOption>
                                <MenuOption>
                                    <TouchableOpacity onPress={() => navigation.navigate('Screen_Change_Password')}  style={{padding: 16, borderWidth: 1}}>
                                        <Text>Đổi mật khẩu</Text>
                                    </TouchableOpacity>
                                </MenuOption>
                            </MenuOptions>
                        </Menu>
                    </View>
                </View>
                {/* End header */}
                <View style={{flex: 1, paddingHorizontal: 24, }}>
                    <View style={{flex: 1}}>
                        <FlatList
                            data={carts.filter(cart => cart.sl > 0)}
                            keyExtractor={item => item.id+""}
                            renderItem={({item}) => 
                                (
                                    <View  key={item.id} style={styles.productContainer}> 
                                        <View style={styles.productImageAndTitleRating}>
                                            <Image
                                                source={{ uri: `${API_URL}/assets/products/${item.url}` }}
                                                style={styles.productImage}
                                            />
                                            <View style={styles.productTitleAndRating}>
                                                <Text style={styles.productTitle}>{item.name}</Text>
                                                <Image
                                                    style={styles.productRating}
                                                    source={require('../assets/images/Rating5.png')}
                                                />
                                            </View>
                                        </View>
                                        <View>
                                            <View style={styles.productAddAndPrice}> 
                                                <View style={styles.productAddView}> 
                                                    <View style={{alignItems: 'center', }}>
                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                decrementQuantity(item.id)
                                                            }}
                                                        >
                                                            <Text style={styles.productAdd}> -</Text>
                                                        </TouchableOpacity>
                                                        <Text style={[styles.productAdd]}> {item.sl}</Text>
                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                updateQuantity(item.id)
                                                            }}
                                                        >
                                                            <Text style={styles.productAdd}> +</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                                <Text style={styles.productPrice}> ${item.price}</Text>
                                            </View>
                                        </View>
                                    </View>
                                )
                            }
                        />
                    </View>  
                    
                </View>
                <View style={{borderTopWidth: 1, borderColor: '#00BDD6'}}>
                    <View style={{fontSize: 24, fontWeight: 'bold', alignSelf: 'flex-end'}}>
                        <Text style={{fontSize: 24, fontWeight: 'bold', marginTop: 8}}>${calculateTotal()}</Text>
                    </View>
                    <TouchableOpacity
                        style={{
                            backgroundColor: '#00BDD6',
                            borderRadius: 40, 
                            width: 240, 
                            height: 50,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginVertical: 16,
                            alignSelf: 'center',
                            width: '100%'
                        }}
                        onPress={() => {
                            Toast.show({
                                type: 'error',
                                text1: 'Your payment has been successfully completed.',
                                text2: `$${calculateTotal()}`,
                                position: 'top',
                                visibilityTime: 2000,
                            });
                            resetQuantity()
                        }}
                    >
                        <Text style={{fontSize: 20, color: 'white'}}>Payment</Text>
                    </TouchableOpacity>
                </View>
                <Toast config={toastConfig} />
            </SafeAreaView>
        // </MenuProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        
    },
    productContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: 'lightgray',
        padding: 8,
        margin: 16,
        borderRadius: 16,
    },
    productImage: {
        width: 50,
        height: 50
    }, 
    productImageAndTitleRating: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12
    }, 
    productTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    productRating: {
        width: 70
    },
    productTitleAndRating: {
        gap: 16
        
    },
    productAddAndPrice: {
       
    },
    productAddView: {    
        alignSelf: 'flex-end',
    },
    productAdd: {
        fontSize: 35,
        fontWeight: '900',
        color: '#00BDD6'
    },
    productPrice: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    
    
})