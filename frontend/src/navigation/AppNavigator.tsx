import React from 'react';
import { View, Text, StyleSheet, Pressable, Image, Alert } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { RootStackParamList, MainTabParamList } from './types';
import { colors, spacing, shadows, borderRadius, typography } from '../theme';
import { userData } from '../data/mockData';

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
        options={({ navigation }) => ({
          tabBarLabel: () => null,
          tabBarIcon: () => (
            <View style={styles.fabIcon}>
              <Ionicons name="add" size={28} color={colors.onPrimary} />
            </View>
          ),
          tabBarButton: (props) => (
            <Pressable
              onPress={async () => {
                try {
                  const permission = await ImagePicker.requestCameraPermissionsAsync();
                  if (!permission.granted) {
                    Alert.alert(
                      'Camera Permission Needed',
                      'Please grant camera permission to record or take photos for competitions.'
                    );
                    navigation.navigate('Create');
                    return;
                  }

                  const result = await ImagePicker.launchCameraAsync({
                    mediaTypes: ['images', 'videos'],
                    allowsEditing: true,
                    quality: 1,
                  });

                  if (!result.canceled && result.assets && result.assets.length > 0) {
                    const asset = result.assets[0];
                    navigation.navigate('Create', {
                      capturedUri: asset.uri,
                      mediaType: asset.type === 'image' ? 'image' : 'video',
                    });
                  } else {
                    navigation.navigate('Create');
                  }
                } catch (error) {
                  navigation.navigate('Create');
                }
              }}
              style={styles.fabContainer}
              accessibilityRole="button"
              accessibilityLabel="Create new submission"
            >
              {props.children}
            </Pressable>
          ),
        })}
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
                source={{ uri: userData.avatarUrl }}
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
    backgroundColor: colors.surfaceContainerLowest,
    borderTopWidth: 0,
    height: 64,
    paddingBottom: spacing.sm,
    paddingTop: spacing.sm,
    ...shadows.sm,
  },
  tabLabel: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium,
    marginTop: 2,
  },
  fabContainer: {
    top: -14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabIcon: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primaryContainer,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.fab,
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
