import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WelcomeScreen from './WelcomeScreen';
import Announcements from './Announcements';
import Events from './Events';
import Service from './Service';
import Complaints from './Complaints';
import PropertyManagement from './PropertyManagement';
import { Icon } from 'react-native-material-ui';
import { BottomNavigation, ThemeProvider } from 'react-native-material-ui';
import { useAuth } from './AuthContext';

const Tab = createBottomTabNavigator();

const DashboardTabNavigator = ({ route }) => {
  const username = route.params?.username || 'Guest';
  const { loggedInUser } = useAuth(); // Use the useAuth hook for authentication

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Welcome') {
            iconName = focused ? 'home' : 'home';
          } else if (route.name === 'Announcements') {
            // Use the 'notification' icon as a placeholder, replace with the actual announcement icon
            iconName = 'Notification';
          } else if (route.name === 'Events') {
            iconName = 'event';
          } else if (route.name === 'Service') {
            iconName = 'build';
          } else if (route.name === 'Complaints') {
            // Use the 'warning' icon as a placeholder, replace with the actual complaint icon
            iconName = 'warning';
          } else if (route.name === 'PropertyManagement') {
            iconName = 'domain';
          }

          if (iconName) {
            return <Icon name={iconName} size={size} color={color} />;
          }

          return null;
        },
      })}
    >
      <Tab.Screen name="Welcome">
        {(props) => <WelcomeScreen {...props} username={username} />}
      </Tab.Screen>
      <Tab.Screen name="Announcements" component={Announcements} />
      <Tab.Screen name="Events" component={Events} />
      <Tab.Screen name="Service" component={Service} />
      <Tab.Screen name="Complaints" component={Complaints} />
      <Tab.Screen name="PropertyManagement" component={PropertyManagement} />
    </Tab.Navigator>
  );
};

export default DashboardTabNavigator;