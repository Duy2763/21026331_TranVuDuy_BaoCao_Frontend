import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Screen1 from './Screens/Screen1.jsx';
import Screen2 from './Screens/Screen2.jsx';
import Screen3 from './Screens/Screen3.jsx';
import Screen_Change_Password from './Screens/Screen_Change_Password.jsx';
import Screen_Sign_In from './Screens/Screen_Sign_In.jsx';
import { CartProvider } from './contextCart.js';
import { MenuProvider} from "react-native-popup-menu";


export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <CartProvider>
      <MenuProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
                name="Screen_Sign_In"
                component={Screen_Sign_In}
                options={{title: ''}}
            />
            <Stack.Screen
              name="Screen1"
              component={Screen1}
              options={{title: ''}}
            />
            <Stack.Screen
              name="Screen2"
              component={Screen2}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Screen3"
              component={Screen3}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Screen_Change_Password"
              component={Screen_Change_Password}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </MenuProvider>
    </CartProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
