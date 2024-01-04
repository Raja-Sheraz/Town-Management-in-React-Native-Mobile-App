  import React, { useEffect } from 'react';
  import { NavigationContainer } from '@react-navigation/native';
  import { createStackNavigator } from '@react-navigation/stack';
  import { createDrawerNavigator } from '@react-navigation/drawer';
  import SplashScreen from './Components/SplashScreen';
  import SignInScreen from './Components/SignInScreen';
  import SignUpScreen from './Components/SignUpScreen';
  import AdminSignInScreen from './Components/AdminSignInScreen';
  import AdminScreen from './Components/AdminScreen';
  import DashboardTabNavigator from './Components/DashboardTabNavigator';
  import { AuthProvider, initDatabase } from './Components/AuthContext';
  import DrawerContent from './Components/DrawerContent';
  import PropertyManagement from './Components/PropertyManagement';
  import WelcomeScreen from './Components/WelcomeScreen';

  const Stack = createStackNavigator();
  const Drawer = createDrawerNavigator();

  const App = () => {
    useEffect(() => {
      const initializeApp = async () => {
        await initDatabase();
      };

      initializeApp();
    }, []);

    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
          <Stack.Screen name="AdminSignIn" component={AdminSignInScreen} />
          <Stack.Screen name="Admin" component={AdminScreen} />
          <Stack.Screen name="PropertyManagement" component={PropertyManagement} />
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />

          <Stack.Screen name="Home" options={{ headerShown: false }}>
            {() => (
              <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
                <Drawer.Screen name="DashboardTab" component={DashboardTabNavigator} />
              </Drawer.Navigator>
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    );
  };

  export default () => (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
