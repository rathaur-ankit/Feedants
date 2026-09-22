import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList, MainTabParamList } from './types';
import { colors, spacing, shadows, borderRadius, typography } from '../theme';
import { api } from '../services/api';

// Screens
import { HomeScreen } from '../screens/HomeScreen';
import { ExploreScreen } from '../screens/ExploreScreen';
import { CreateScreen } from '../screens/CreateScreen';
import { CompetitionsScreen } from '../screens/CompetitionsScreen';
import { ContestDetailsScreen } from '../screens/ContestDetailsScreen';
import { ProfileScreen } from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

function MainTabs() {
  const [avatarUrl, setAvatarUrl] = React.useState<string>(
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCPyEghipDY2H3PU-RCFSh1KfCnHFGT1-hM6DKy-TFJ6d2qKYKN9zzz2nm9b9kJ8aUnAZONCk8hP6W6dLsryZwvrGeSCeuof8u54w0cOFgid5EfpXUaAW3wrLyIXrVE1ijTAEujE90IX77BhqkqagFO7q3I68uEWiVCIOy-mPdCFV-OJprz0Ha_5TfD5KYlglLJwaD6K_WZKnpdnAZD08CSNIoUqsPzuVKa7tNJpDwTGy3pjbevtVY0'
  );

  React.useEffect(() => {
    api
      .getUserProfile()
      .then((u) => {
        if (u?.avatarUrl) setAvatarUrl(u.avatarUrl);
      })
      .catch(() => {});
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primaryContainer,
        tabBarInactiveTintColor: colors.onSurfaceVariant,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'compass' : 'compass-outline'}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Create"
        component={CreateScreen}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: () => (
            <View style={styles.fabIcon}>
              <Ionicons name="add" size={26} color="#ffffff" />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Competitions"
        component={CompetitionsScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'trophy' : 'trophy-outline'}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[
                styles.profileAvatar,
                focused && styles.profileAvatarActive,
              ]}
            >
              <Image
                source={{ uri: avatarUrl }}
                style={styles.profileAvatarImage}
                accessibilityLabel="User Profile"
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="ContestDetails" component={ContestDetailsScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e8eeee',
    height: 60,
    paddingBottom: 6,
    paddingTop: 6,
    ...shadows.sm,
  },
  tabLabel: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium,
    marginTop: 2,
  },
  fabIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#007d79',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  profileAvatar: {
    width: 26,
    height: 26,
    borderRadius: 13,
    overflow: 'hidden',
    backgroundColor: colors.surfaceContainerHigh,
  },
  profileAvatarActive: {
    borderWidth: 2,
    borderColor: colors.primaryContainer,
  },
  profileAvatarImage: {
    width: '100%',
    height: '100%',
  },
});
