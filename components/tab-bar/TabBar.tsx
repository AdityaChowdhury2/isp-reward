import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import React from "react";
import { Text, TouchableOpacity, View, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export type TabBarProps = {
  state: any;
  descriptors: any;
  navigation: any;
  iconConfig: any;
  activeColor?: string;
  inactiveColor?: string;
  style?: ViewStyle;
  iconStyle?: ViewStyle;
  labelStyle?: TextStyle;

}


const TabBar = ({
  state,
  descriptors,
  navigation,
  iconConfig,
  activeColor = "#436697",
  inactiveColor = "#222",
  style = {},
  iconStyle = {},
  labelStyle = {},
}: TabBarProps) => {

  console.log(state.routes.map((route: any) => route));



  return (
    <View style={[styles.tabContainer, style]}>
      {state.routes.map((route: any, index: any) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        // Get the icon based on route name, fallback to default icons if not provided in iconConfig
        const IconComponent = iconConfig[route.name]

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[styles.tabButton, iconStyle]}
          >
            <IconComponent color={isFocused ? activeColor : inactiveColor} />
            <Text
              style={[
                styles.tabLabel,
                { color: isFocused ? activeColor : inactiveColor },
                labelStyle,
              ]}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 10,
    backgroundColor: "white",
    paddingVertical: 4,
    marginHorizontal: 8,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  tabButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 4,
  },
  tabLabel: {
    marginTop: 4,
    fontSize: 8,
  },
});

export default TabBar;
