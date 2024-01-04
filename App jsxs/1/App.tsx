import React, { createContext, useState } from 'react';
import SQLite from './components/SQLite';
import Home from './Lab/Home';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Dashboard from './Lab/Dashboard';

export let Auth = createContext({});

function App() {

  let stack = createStackNavigator();
  let [auth, setauth] = useState({})


  return (
    <>
      <Auth.Provider value={{ auth, setauth }} >
        <NavigationContainer>
          <stack.Navigator screenOptions={{
            headerShown: false
          }}>
            <stack.Screen name='Home' component={Home} />
            <stack.Screen name='Dashboard' component={Dashboard} />
          </stack.Navigator>
        </NavigationContainer>
      </Auth.Provider>
    </>
  );
}

export default App;
