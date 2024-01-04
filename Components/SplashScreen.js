// SplashScreen.js
import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, StatusBar } from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const navigateToSignIn = () => {
    navigation.navigate('SignIn');
  };

  const navigateToSignUp = () => {
    navigation.navigate('SignUpScreen');
  };

  const navigateToAdminSignIn = () => {
    navigation.navigate('AdminSignIn');
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        {/* Covering View with Shadow */}
        <View style={styles.coveringView}>
          <Animatable.Image
            animation="bounceIn"
            duration={1500}
            source={require('./../town.jpg')}
            style={styles.logo}
            resizeMode="stretch"
          />
        </View>
      </View>
      <Animatable.View style={[styles.footer, { backgroundColor: '#fff' }]} animation="fadeInUpBig">
        <Text style={[styles.title, { color: '#05375a', marginBottom: 10 }]}>Town Management App</Text>
        <Text></Text>
        {/* Admin Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Admin</Text>
          <TouchableOpacity style={styles.adminButton} onPress={navigateToAdminSignIn}>
            <LinearGradient colors={['#009387', '#009387']} style={styles.signIn}>
              <Text style={styles.textSign}>Login as admin</Text>
              <MaterialIcons name="navigate-next" color="#fff" size={20} />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* User Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>User</Text>
          <View style={styles.userButtons}>
            <TouchableOpacity onPress={navigateToSignIn} style={styles.signIn}>
              <LinearGradient colors={['#08d4c4', '#01ab9d']} style={styles.signIn}>
                <Text style={styles.textSign}>Sign In</Text>
                <MaterialIcons name="navigate-next" color="#fff" size={20} />
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity onPress={navigateToSignUp} style={styles.signIn}>
              <LinearGradient colors={['#08d4c4', '#01ab9d']} style={styles.signIn}>
                <Text style={styles.textSign}>Sign Up</Text>
                <MaterialIcons name="navigate-next" color="#fff" size={20} />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
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
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  coveringView: {
    backgroundColor: 'white',
    borderRadius: height_logo / 2, // Half of the image height for a circular covering
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  logo: {
    width: height_logo,
    height: height_logo,
    borderRadius: height_logo / 2, // Half of the image height for a circular image
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#009387',
    marginBottom: 10,
  },
  adminButton: {
    borderColor: '#009387',
    borderRadius: 50,
    overflow: 'hidden',
  },
  userButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default SplashScreen;
