import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useAuth } from './AuthContext';

const AdminDrawerContent = (props) => {
  const { logout, loggedInUser } = useAuth();

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
        <Text style={styles.drawerHeaderText}>{`Hello, ${loggedInUser?.username || 'Admin'}`}</Text>
      </View>

      <DrawerItemList {...props} />

      <TouchableOpacity onPress={() => props.navigation.navigate('SplashScreen')} style={styles.drawerLogout}>
        <Text style={styles.drawerLogoutText}>Logout</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  drawerHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  drawerLogout: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  drawerLogoutText: {
    fontSize: 18,
    color: 'red',
    fontWeight: 'bold',
  },
});

export default AdminDrawerContent;
