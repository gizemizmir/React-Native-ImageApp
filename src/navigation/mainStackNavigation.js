import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigation from "./bottomTabNavigation";
import { useSelector } from "react-redux";
import { View } from "react-native";

const MainStackNav = createStackNavigator();
const MainStackNavigation = () => {
  const theme = useSelector((state) => state.theme.activeTheme);
  const user = {}

  const EmptyScreen = () => {
    return (
      <View>
        <Text> Empty Screen</Text>
      </View>
    )
  }

  return (
    <MainStackNav.Navigator
      initialRouteName={"BottomNav"}
      screenOptions={{
        headerShown: false,
      }}
    >
      {user ? (
        // Check there is a registered user in State
        <>
          <MainStackNav.Screen
            name="BottomNav"
            component={BottomTabNavigation}
          />
        </>
      ) : (
        <>
          <MainStackNav.Screen
            name="SignIn"
            component={EmptyScreen}
            options={{ headerShown: false }}
          />
          <MainStackNav.Screen
            name="SignUp"
            component={EmptyScreen}
            options={{
              headerShown: true,
              headerTitle: "",
              headerBackTitleVisible: false,
              headerStyle: {
                backgroundColor: "#FFF",
                shadowOpacity: 0,
              },
            }}
          />
        </>
      )}
    </MainStackNav.Navigator>
  );
};

export default MainStackNavigation;
