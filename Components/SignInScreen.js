// SignInScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
  TextInput,
  Platform,
  Alert,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import SQLite from 'react-native-sqlite-storage';
import { useAuth } from './AuthContext';  // Import useAuth hook

const SignInScreen = () => {
  const navigation = useNavigation();
  const { login } = useAuth();  // Use the login function from the AuthContext

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userFullName, setUserFullName] = useState('');

  const loginUser = async () => {
    if (!username || !password) {
      Alert.alert('Validation Error', 'Please enter both username and password');
      return;
    }

    const db = SQLite.openDatabase({
      name: 'mydatabase.db',
      createFromLocation: 1,
    });

    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM users WHERE username = ? AND password = ? LIMIT 1;',
        [username, password],
        (_, results) => {
          if (results.rows.length > 0) {
            // Valid username and password, get the user's full name
            const { id, username } = results.rows.item(0);
            setUserFullName(username);  // Set the user's full name

            // Simulate successful authentication
            const authenticatedUser = { id, username, password };
            login(authenticatedUser);

            setUsername('');
            setPassword('');

            // Navigate to the home screen
            navigation.navigate('Home');
          } else {
            // Invalid username or password, show an alert
            Alert.alert('Authentication Failed', 'Invalid username or password');
          }
        },
        (error) => {
          console.error('Error checking for user:', error);
        }
      );
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <Animatable.View animation="fadeInUpBig">
          <Text style={styles.text_header}>Sign In</Text>
        </Animatable.View>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <Text style={styles.text_footer}>Username</Text>
        <View style={styles.action}>
          <Feather name="user" color="#05375a" size={20} />
          <TextInput
            placeholder="Your Username"
            style={styles.textInput}
            autoCapitalize="none"
            value={username}
            onChangeText={setUsername}
          />
        </View>
        <Text style={[styles.text_footer, { marginTop: 35 }]}>Password</Text>
        <View style={styles.action}>
          <Feather name="lock" color="#05375a" size={20} />
          <TextInput
            placeholder="Your Password"
            secureTextEntry
            style={styles.textInput}
            autoCapitalize="none"
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <TouchableOpacity>
          <Text style={{ color: '#009387', marginTop: 15 }}>Forgot password?</Text>
        </TouchableOpacity>
        <View style={styles.button}>
          <TouchableOpacity onPress={loginUser} style={[styles.signIn, { marginRight: 10 }]}>
            <LinearGradient colors={['#08d4c4', '#01ab9d']} style={styles.signIn}>
              <Text style={styles.textSign}>Sign In</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('SignUpScreen')}
            style={[
              styles.signIn,
              { borderColor: '#009387', borderWidth: 1, marginTop: 15 },
            ]}>
            <Text style={[styles.textSign, { color: '#009387' }]}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        {userFullName && (
          <Text style={styles.welcomeText}>{`Welcome, ${userFullName}!`}</Text>
        )}
      </Animatable.View>
    </View>
  );
};
const { height } = Dimensions.get('screen');
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SignInScreen;
