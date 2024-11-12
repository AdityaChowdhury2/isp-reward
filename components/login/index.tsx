import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'expo-router'


const LoginScreen = () => {
    const router = useRouter()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    useEffect(() => {
        console.log('LoginScreen mounted')
    }, [])

    const handleLogin = async () => {
        console.log('Login button pressed')
        // try {
        //     await signIn('dummy-token')
        // } catch (error) {
        //     console.error('Login failed:', error)
        // }
    }

    return (
        <View className="flex-1 items-center justify-center px-3" style={{ backgroundColor: '#436697' }}>
            {/* Logo Container */}
            <View className="mb-8">
                <Image
                    source={require('../../../assets/images/images.png')}
                    className="w-60 h-40"
                    resizeMode="contain"
                />
            </View>

            {/* White Card Container */}
            <View className="bg-white p-8 rounded-3xl w-full shadow-lg">
                <Text className="text-2xl font-bold text-center mb-6">Login</Text>

                {/* Email Input */}
                <View className="mb-4">
                    <Text className="text-gray-600 mb-2">Email</Text>
                    <TextInput
                        className="w-full border border-gray-300 rounded-lg p-3"
                        placeholder="Enter your email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>

                {/* Password Input */}
                <View className="mb-6">
                    <Text className="text-gray-600 mb-2">Password</Text>
                    <TextInput
                        className="w-full border border-gray-300 rounded-lg p-3"
                        placeholder="Enter your password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                </View>

                {/* Login Button */}
                <TouchableOpacity
                    className="bg-blue-500 p-4 rounded-lg"
                    onPress={handleLogin}
                >
                    <Text className="text-white text-center font-semibold text-lg">Login</Text>
                </TouchableOpacity>

                {/* Register Link */}
                <View className="flex-row justify-center mt-4">
                    <Text className="text-gray-600">Don't have an account? </Text>
                    <TouchableOpacity onPress={() => { console.log('register'); router.push('/register') }}>
                        <Text className="text-blue-500 font-semibold">Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default LoginScreen