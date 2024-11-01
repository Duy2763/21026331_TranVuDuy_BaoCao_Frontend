import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { getProducts } from "../api";
import { useCart } from "../contextCart";
import { MenuProvider,  Menu, MenuTrigger, MenuOptions, MenuOption } from "react-native-popup-menu";
import { API_URL } from '@env'

export default function Screen1() {
    const navigation = useNavigation();
    const route = useRoute();

    const [products, setProducts] = useState([]);
    const [categorySelected, setCategorySelected] = useState("1");
    const [optionSelected, setOptionSelected] = useState("best_sales");
    const [isSeeAll, setSeeAll] = useState(false);
    const [isSelectedNavbar, setSelectedNavbar] = useState('home');
    const {addCart, deleteCart, checkExist, updateQuantity, accountInSession, updateAccountInSession} = useCart();
    const [search, setSearch] = useState('');


    const fetchProduct = async () => {
        try {
            const data = await getProducts(categorySelected);
            console.log(data);
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [categorySelected]);

    return (
        // <MenuProvider>
            <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
                <View style={{flex: 1, paddingHorizontal: 24}}>
                    {/* Begin header */}
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
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
                            <Text style={{fontSize: 20, fontWeight: 'bold'}}>Electronics</Text>
                        </TouchableOpacity>
                            
                        <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Screen3')}
                            >
                                <Image
                                    style={{width: 20, height: 20}}
                                    source={require('../assets/images/Image182.png')}
                                />

                            </TouchableOpacity>
                            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#00BDD6'}}>{accountInSession.name}</Text>
                            <Menu>
                                <MenuTrigger>
                                    <Image
                                        style={{width: 28, height: 28, borderRadius: '50%'}}
                                        source={require('../assets/images/duy.jpg')}
                                    />
                                </MenuTrigger>
                                <MenuOptions>
                                    <MenuOption>
                                        <TouchableOpacity 
                                            onPress={() => navigation.navigate('Screen1')}
                                            style={{padding: 16, borderWidth: 1}}
                                        >
                                            <Text>Log out</Text>
                                        </TouchableOpacity>
                                    </MenuOption>
                                    <MenuOption>
                                        <TouchableOpacity 
                                            onPress={() => navigation.navigate('Screen_Change_Password')}
                                            style={{padding: 16, borderWidth: 1}}
                                        >
                                            <Text>Đổi mật khẩu</Text>
                                        </TouchableOpacity>
                                    </MenuOption>
                                </MenuOptions>
                            </Menu>
                        </View>
                    </View>
                    {/* End header */}
                    {/* Begin search */}
                    <View style={{
                        flexDirection: 'row', 
                        alignItems: 'center', 
                        backgroundColor: '#F3F4F6', 
                        paddingHorizontal: 12,
                        paddingVertical: 10,
                        gap: 8,
                        marginVertical: 8,
                    }}>
                        <Image
                            style={{width: 16, height: 16}}
                            source={require('../assets/images/search.png')}
                        />
                        <TextInput
                            style={{fontSize: 18}}
                            placeholder="Search"
                            onChangeText={text => setSearch(text)}
                        />
                    </View>
                    {/* End search */}
                    <View style={{}}>
                        {/* Begin category */}
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                            <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10}}>Categories</Text>
                            <Text style={{fontSize: 16, color: 'gray'}}>See all</Text>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <TouchableOpacity 
                                style={[styles.backgroundCategory, {backgroundColor: '#DBCAF6', borderWidth: categorySelected === '1' ? 2 : 0, borderColor: categorySelected === '1' ? 'purple' : 'transperent'}]}
                                onPress={() => setCategorySelected('1')}
                            >
                                <Image
                                    style={styles.categoryImage}
                                    source={require('../assets/images/smart.png')}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={[styles.backgroundCategory, {backgroundColor: '#C5D1F7', borderWidth: categorySelected === '2' ? 2 : 0, borderColor: categorySelected === '2' ? 'blue' : 'transperent'}]}
                                onPress={() => setCategorySelected('2')}
                            >
                                <Image
                                    style={styles.categoryImage}
                                    source={require('../assets/images/ipad.png')}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={[styles.backgroundCategory, {backgroundColor: '#F8D8BF', borderWidth: categorySelected === '3' ? 2 : 0, borderColor: categorySelected === '3' ? 'orange' : 'transperent'}]}
                                onPress={() => setCategorySelected('3')}    
                            >
                                <Image
                                    style={styles.categoryImage}
                                    source={require('../assets/images/macbook.png')}
                                />
                            </TouchableOpacity>
                        </View>
                        {/* Begin category */}
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-around', marginVertical: 8}}>
                        <TouchableOpacity
                            style={{paddingVertical: 2, borderRadius: 16, paddingHorizontal: 16, alignItems: 'center', justifyContent: 'center', backgroundColor: !isSeeAll && optionSelected === 'best_sales' ? '#D9FCFA': '#fff' }}
                            onPress={() => setOptionSelected('best_sales')}
                        >
                            <Text style={[styles.titleOption, !isSeeAll && optionSelected === 'best_sales' && styles.isSelectedOption]}>Best Sales</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ paddingVertical: 2, borderRadius: 16, paddingHorizontal: 16, alignItems: 'center', justifyContent: 'center', backgroundColor: !isSeeAll && optionSelected === 'best_matched' ? '#D9FCFA': '#fff'}}
                            onPress={() => setOptionSelected('best_matched')}
                        >
                            <Text style={[styles.titleOption, !isSeeAll && optionSelected === 'best_matched' && styles.isSelectedOption]}>Best Matched</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ paddingVertical: 2, borderRadius: 16, paddingHorizontal: 16, alignItems: 'center', justifyContent: 'center', backgroundColor: !isSeeAll && optionSelected === 'popular' ? '#D9FCFA': '#fff'}}
                            onPress={() => setOptionSelected('popular')}
                        >
                            <Text style={[styles.titleOption, !isSeeAll && optionSelected === 'popular' && styles.isSelectedOption]}>Popular</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 1}}>
                        {
                            search === '' 
                            ?
                            <FlatList
                                data={isSeeAll ? products : products.filter(product => product.attribute_type === optionSelected)}
                                keyExtractor={item => item.id+""}
                                renderItem={({item}) => 
                                    (
                                        <TouchableOpacity
                                            onPress={() => {
                                                if (checkExist(item.id)) {
                                                    updateQuantity(item.id)
                                                } else {
                                                    addCart({...item, sl: 1});
                                                }
                                                navigation.navigate('Screen3')
                                            }}
                                        >
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
                                                        <TouchableOpacity style={styles.productAddView}> 
                                                            <Text style={styles.productAdd}> +</Text>
                                                        </TouchableOpacity>
                                                        <Text style={styles.productPrice}> ${item.price}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                }
                            />
                            :
                            <FlatList
                                data={isSeeAll ? products : products.filter(product => product.attribute_type === optionSelected && product.name.toLowerCase().includes(search.toLowerCase()))}
                                keyExtractor={item => item.id+""}
                                renderItem={({item}) => 
                                    (
                                        <TouchableOpacity
                                            onPress={() => {
                                                if (checkExist(item.id)) {
                                                    updateQuantity(item.id)
                                                } else {
                                                    addCart({...item, sl: 1});
                                                }
                                                navigation.navigate('Screen3')
                                            }}
                                        >
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
                                                        <TouchableOpacity style={styles.productAddView}> 
                                                            <Text style={styles.productAdd}> +</Text>
                                                        </TouchableOpacity>
                                                        <Text style={styles.productPrice}> ${item.price}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                }
                            />
                        }
                    </View>
                    <TouchableOpacity 
                        style={{alignItems: 'center', backgroundColor: '#D6D6DE', padding: 8, marginVertical: 8}}
                        onPress={() => {setSeeAll(!isSeeAll)}}
                    >
                        <Text style={{color: 'gray',  fontSize: 16}}>{isSeeAll? 'See less' : 'See all' }</Text>
                    </TouchableOpacity>
                    <Image
                        style={{width: '100%', height: 80, borderRadius: 8}}
                        source={require('../assets/images/banner.png')}
                    />
                    <View style={{flexDirection: 'row', gap: 8, alignItems: 'center', justifyContent: 'center', marginVertical: 8}}>
                        <View style={{backgroundColor: '#00BDD6', width: 24, height: 8, borderRadius: '50%'}}></View>
                        <View style={{backgroundColor: 'lightgray', width: 8, height: 8, borderRadius: '50%'}}></View>
                        <View style={{backgroundColor: 'lightgray', width: 8, height: 8, borderRadius: '50%'}}></View>
                        <View style={{backgroundColor: 'lightgray', width: 8, height: 8, borderRadius: '50%'}}></View>
                    </View>
                    
                </View>
                <View style={{flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-evenly', borderTopWidth: 1, borderColor: 'lightgray', paddingTop: 8}}>
                    <TouchableOpacity 
                        style={[styles.iconContainer,isSelectedNavbar === 'home' && styles.isSelectedNavbar]}
                        onPress={() => setSelectedNavbar('home')}
                    >
                        <Image
                            style={styles.imgOption}
                            source={require('../assets/images/clarity_home-solid.png')}
                        />
                        <Text style={styles.textIcon}>Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.iconContainer,,isSelectedNavbar === 'search' && styles.isSelectedNavbar]}
                        onPress={() => setSelectedNavbar('search')}
                    >
                        <Image
                            style={styles.imgOption}
                            source={require('../assets/images/search.png')}
                        />
                        <Text style={styles.textIcon}>Search</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.iconContainer,,isSelectedNavbar === 'fav' && styles.isSelectedNavbar]}
                        onPress={() => setSelectedNavbar('fav')}
                    >
                        <Image
                            style={styles.imgOption}
                            source={require('../assets/images/mdi_heart-outline.png')}
                        />
                        <Text style={styles.textIcon}>Favorites</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.iconContainer,,isSelectedNavbar === 'inbox' && styles.isSelectedNavbar]}
                        onPress={() => setSelectedNavbar('inbox')}
                    >
                        <Image
                            style={styles.imgOption}
                            source={require('../assets/images/solar_inbox-outline.png')}
                        />
                        <Text style={styles.textIcon}>Inbox</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.iconContainer,,isSelectedNavbar === 'acc' && styles.isSelectedNavbar]}
                        onPress={() => setSelectedNavbar('acc')}
                    >
                        <Image
                            style={styles.imgOption}
                            source={require('../assets/images/codicon_account.png')}
                        />
                        <Text style={styles.textIcon}>Account</Text>
                    </TouchableOpacity>
                    
                </View>
            </SafeAreaView>
        // </MenuProvider>

    )

}

const styles = StyleSheet.create({
    container: {
        
    },
    titleOption: {
        color: 'gray'
    },
    backgroundCategory: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        height: 70,
        borderRadius: 4,
        
    },
    categoryImage: {
        width:  60,
        height: 60
    },
    productContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: 'lightgray',
        padding: 8,
        marginBottom: 16
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
        fontSize: 24,
        fontWeight: '900',
        color: 'purple'
    },
    productPrice: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    iconContainer: {
        alignItems: 'center'
    },
    textIcon: {
        color: 'gray',
        fontWeight: 'bold'
    },
    imgOption: {
        width: 20,
        height: 20
    },
    isSelectedOption: {
        color: '#00BDD6',
    },
    isSelectedNavbar: {
        backgroundColor: '#00BDD6', 
        borderRadius: 8,
        padding: 2
    }
    
})