import { Tabs } from 'expo-router';
import { AntDesign, Feather, FontAwesome5, FontAwesome6, MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import TabBar from '@/components/tab-bar/TabBar';
import { TextStyle, ViewStyle } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';



const iconConfig = {
    index: (props: any) => <MaterialIcons name="home" size={24} {...props} />,
    settings: (props: any) => <MaterialIcons name="settings" size={24} {...props} />,
    new: (props: any) => <MaterialIcons name="add" size={24} {...props} />,
    notifications: (props: any) => <MaterialIcons name="notifications" size={24} {...props} />,
    profile: (props: any) => <MaterialIcons name="person" size={24} {...props} />,
}


export default function TabLayout() {
    return (
        <Tabs
            tabBar={(props: BottomTabBarProps) => <TabBar {...props} iconConfig={iconConfig} />}
            screenOptions={{
                tabBarActiveTintColor: '#436697',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: {
                    paddingBottom: 5,
                    paddingTop: 5,
                },
                headerStyle: {
                    backgroundColor: '#436697',
                },
                headerTintColor: '#fff',
                headerRight: () => <Feather name="search" size={24} color="white" />,
                headerRightContainerStyle: {
                    position: 'absolute',
                    top: 15,
                    right: 20,
                }
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                }}

            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: 'Settings',
                }}
            />
            <Tabs.Screen
                name="new"
                options={{
                    title: 'Add',
                }}
            />
            <Tabs.Screen
                name="notifications"
                options={{
                    title: 'Notifications',

                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                }}
            />
        </Tabs>
    );
}
