import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import Animated, {
  withTiming,
  useSharedValue,
  useAnimatedStyle,
  Easing,
} from 'react-native-reanimated';
import { useAuth } from './AuthContext';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = () => {
  const { loggedInUser } = useAuth();
  const fadeAnim = useSharedValue(0);
  const navigation = useNavigation();

  useEffect(() => {
    fadeAnim.value = withTiming(1, { duration: 1000, easing: Easing.ease });
  }, [fadeAnim]);

  const navigateTo = (screenName) => {
    navigation.navigate(screenName);
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeAnim.value,
    };
  });

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <View style={styles.profileContainer}>
        <View style={styles.profileDetails}>
          <Image
            source={
              loggedInUser?.profilePicture ||
              require('./../town.jpg')
            }
            style={styles.profilePicture}
          />
          <View>
            <Text style={styles.usernameText}>
              {`Hello, ${loggedInUser?.username || 'Guest'}`}
            </Text>
            {/* <Text style={styles.userDetails}>{loggedInUser?.email || 'umarali031158@gmail.com'}</Text> */}
            {/* Add more details as needed */}
          </View>
        </View>
      </View>

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.componentContainer}>
        <View style={styles.rowContainer}>
          <TouchableOpacity
            style={styles.component}
            onPress={() => navigateTo('Announcements')}>
            <Image
              source={require('./../an.webp')}
              style={styles.componentImage}
            />
            <Text style={styles.componentText}>Announcements</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.component}
            onPress={() => navigateTo('Events')}>
            <Image
              source={require('./../event.png')}
              style={styles.componentImage}
            />
            <Text style={styles.componentText}>Events</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.rowContainer}>
          <TouchableOpacity
            style={[styles.component, styles.rightMargin]}
            onPress={() => navigateTo('Service')}>
            <Image
              source={require('./../service.png')}
              style={styles.componentImage}
            />
            <Text style={styles.componentText}>Service</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.component}
            onPress={() => navigateTo('Complaints')}>
            <Image
              source={require('./../com.jpg')}
              style={styles.componentImage}
            />
            <Text style={styles.componentText}>Complaints</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.rowContainer}>
          <TouchableOpacity
            style={[styles.component, styles.rightMargin, styles.propertyManagement]}
            onPress={() => navigateTo('PropertyManagement')}>
            <Image
              source={require('./../pro.png')}
              style={styles.componentImage}
            />
            <Text style={styles.componentText}>Property Management</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.component, styles.rightMargin, styles.propertyManagement]}
            onPress={() => navigateTo('PropertyManagement')}>
            <Image
              source={require('./../pro.png')}
              style={styles.componentImage}
            />
            <Text style={styles.componentText}>Property Management</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Animated.View>
  );
};

const { width, height } = Dimensions.get('screen');
const componentWidth = width * 0.8;
const componentMargin = 10;
const sideMargin = 20;
const tabBarHeight = 50;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#009387',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:20,
    marginBottom: 20,
  },
  profileDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 10,
  },
  usernameText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  userDetails: {
    fontSize: 18,
    color: 'white',
  },
  scrollContainer: {
    width: '100%',
  },
  componentContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: sideMargin,
    marginRight: sideMargin,
    borderRadius: 12,
    overflow: 'hidden',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: componentMargin,
  },
  component: {
    width: componentWidth / 2 - componentMargin * 0.5,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: componentMargin,
    backgroundColor: '#fff',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  rightMargin: {
    marginRight: componentMargin,
  },
  componentImage: {
    width: '99%',
    height: 110,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  componentText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#05375a',
    padding: 10,
    textAlign: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  propertyManagement: {
    // Adjust styles if needed
  },
});

export default WelcomeScreen;
