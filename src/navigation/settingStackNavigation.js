import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import { Text, View } from 'react-native';

const EmptyScreen = () => {
    return (
      <View>
        <Text>Setting stack Empty Screen</Text>
      </View>
    )
  }

const SettingsStackNav = createStackNavigator();
const SettingStackNavigation = () => {
  const theme = useSelector(state => state.theme.activeTheme);

  return (
    <SettingsStackNav.Navigator
      screenOptions={{
        headerShown: true,
      }}>
      <SettingsStackNav.Screen
        name="Settings"
        component={EmptyScreen}
        options={{
          headerStyle: {
            backgroundColor: theme.backgroundColor,
          },
          headerTitleStyle: {
            color: theme.color,
          },
        }}
      />
      <SettingsStackNav.Screen
        name="ThemeSettingsScreen"
        component={EmptyScreen}
        options={{
          headerStyle: {
            backgroundColor: theme.backgroundColor,
          },
          headerTitleStyle: {
            color: theme.color,
          },
          headerTitle: 'Theme Setting',
        }}
      />
      <SettingsStackNav.Screen
        name="ProfileSettingsScreen"
        component={EmptyScreen}
        options={{
          headerStyle: {
            backgroundColor: theme.backgroundColor,
          },
          headerTitleStyle: {
            color: theme.color,
          },
          headerTitle: 'Profile Setting',
        }}
      />
    </SettingsStackNav.Navigator>
  );
};

export default SettingStackNavigation;
