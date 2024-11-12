import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="register" options={{ title: 'Register' }} />
            <Stack.Screen name="login" options={{ title: 'Login' }} />
        </Stack>
    )
}

export default _layout