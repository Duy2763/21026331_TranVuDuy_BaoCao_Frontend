import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Screen1 from './Screens/Screen1.jsx';
import Screen2 from './Screens/Screen2.jsx';
import Screen3 from './Screens/Screen3.jsx';
import { CartProvider } from './contextCart.js';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator>
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
        </Stack.Navigator>
      </NavigationContainer>
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
