import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import LinksScreen from "../screens/LinksScreen";
import MyQuestions from "../screens/MyQuestions";
// import Camera from '../screens/Camera';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "Home";

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });
  // const { loc, photo_uri } = route.params;

  return (
    <BottomTab.Navigator
      initialRouteName={INITIAL_ROUTE_NAME}
      params={{ photo_uri: null }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Browse",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-search" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Ask"
        component={LinksScreen}
        options={{
          title: "Ask",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-add" />
          ),
        }}
      />

      <BottomTab.Screen
        name="My Questions"
        component={MyQuestions}
        options={{
          title: "My Questions",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-questions" />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName =
    route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case "My Questions":
      return "My Questions";
    case "Home":
      return "Browse Questions";
    case "Ask":
      return "Submit Question";
  }
}
