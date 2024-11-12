import { View, Text, TextInput, TouchableOpacity, Image, useColorScheme, StyleSheet, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'expo-router'
import { ParallaxScrollView } from '@/components/core/parallax-scroll-view'
import { cn } from '@/lib/cn'
import { ScrollView } from 'react-native-gesture-handler'
import { useForm, Controller } from 'react-hook-form'
import { registrationSchema } from '@/schemas/registrationSchema'
import { yupResolver } from "@hookform/resolvers/yup";
import SelectDropdown from 'react-native-select-dropdown'

const registrationOptions = [
    { label: "Individual", value: "individual" },
    { label: "Company", value: "company" },
];

const RegisterScreen = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(registrationSchema),
    });

    const onSubmit = (data: any) => {
        Alert.alert("Registration Successful", JSON.stringify(data, null, 2));
    };
    const router = useRouter()
    const colorScheme = useColorScheme()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    useEffect(() => {
        console.log('RegisterScreen mounted')
    }, [])

    const handleRegister = async () => {
        console.log('Register button pressed')
        router.push('/(tabs)')
        // try {
        //     await signIn('dummy-token')
        // } catch (error) {
        //     console.error('Login failed:', error)
        // }
    }

    return (
        <ParallaxScrollView className="flex-1 bg-[#436697]" headerImage={<Image source={require('../../assets/images/images.png')} className="w-60 h-40" resizeMode="contain" />} >
            {/* Logo Container */}
            {/* <View className="items-center">
                <Image
                    source={require('../../assets/images/images.png')}
                    className="w-60 h-40"
                    resizeMode="contain"
                />
            </View> */}

            {/* White Card Container */}
            <View className="bg-white p-8 rounded-3xl w-full shadow-lg">
                <Text className="text-2xl font-bold text-center mb-6">Register</Text>

                {/* Full Name */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Full Name</Text>
                    <Controller
                        control={control}
                        name="fullName"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your full name"
                                value={value}
                                onChangeText={onChange}
                            />
                        )}
                    />
                    {errors.fullName && (
                        <Text style={styles.error}>{errors.fullName.message}</Text>
                    )}
                </View>

                {/* Company ID */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Company ID</Text>
                    <Controller
                        control={control}
                        name="companyId"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your company ID"
                                value={value}
                                onChangeText={onChange}
                            />
                        )}
                    />
                    {errors.companyId && (
                        <Text style={styles.error}>{errors.companyId.message}</Text>
                    )}
                </View>

                {/* Company Name */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Company Name</Text>
                    <Controller
                        control={control}
                        name="companyName"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your company name"
                                value={value}
                                onChangeText={onChange}
                            />
                        )}
                    />
                    {errors.companyName && (
                        <Text style={styles.error}>{errors.companyName.message}</Text>
                    )}
                </View>

                {/* Registration Type */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Registration Type</Text>
                    <Controller
                        control={control}
                        name="registrationType"
                        render={({ field: { onChange, value } }) => (
                            <SelectDropdown
                                data={registrationOptions}  // Pass an array of labels only
                                onSelect={(selectedItem, index) => {
                                    const selectedValue = registrationOptions[index].value;
                                    onChange(selectedValue);  // Update form state with the value
                                }}
                                defaultValue="Select registration type"
                                renderButton={(selectedItem, isOpened) => {
                                    return <Text>{selectedItem?.label}</Text>
                                }}
                                renderItem={(item, index) => {
                                    return <Text>{item?.label}</Text>
                                }}
                            />
                        )}
                    />
                    {errors.registrationType && (
                        <Text style={styles.error}>{errors.registrationType.message}</Text>
                    )}
                </View>

                {/* Gender */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Gender</Text>
                    <Controller
                        control={control}
                        name="gender"
                        render={({ field: { onChange, value } }) => (
                            <View style={styles.input}>

                            </View>
                        )}
                    />
                    {errors.gender && <Text style={styles.error}>{errors.gender.message}</Text>}
                </View>

                {/* Mobile Number */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Mobile Number</Text>
                    <Controller
                        control={control}
                        name="mobileNo"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your mobile number"
                                keyboardType="numeric"
                                value={value}
                                onChangeText={onChange}
                            />
                        )}
                    />
                    {errors.mobileNo && <Text style={styles.error}>{errors.mobileNo.message}</Text>}
                </View>

                {/* Email Address */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Email Address</Text>
                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your email"
                                keyboardType="email-address"
                                value={value}
                                onChangeText={onChange}
                            />
                        )}
                    />
                    {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}
                </View>

                {/* Password */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Password</Text>
                    <Controller
                        control={control}
                        name="password"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your password"
                                secureTextEntry
                                value={value}
                                onChangeText={onChange}
                            />
                        )}
                    />
                    {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}
                </View>

                {/* Confirm Password */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Confirm Password</Text>
                    <Controller
                        control={control}
                        name="confirmPassword"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                style={styles.input}
                                placeholder="Confirm your password"
                                secureTextEntry
                                value={value}
                                onChangeText={onChange}
                            />
                        )}
                    />
                    {errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword.message}</Text>}
                </View>

                {/* Submit Button */}
                <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>


                {/* Register Link */}
                <View className="flex-row justify-center mt-4">
                    <Text className="text-gray-600">Don't have an account? </Text>
                    <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
                        <Text className="text-blue-500 font-semibold">Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ParallaxScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
        backgroundColor: "#f9f9f9",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#333",
        textAlign: "center",
        marginBottom: 20,
    },
    inputContainer: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        color: "#666",
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingHorizontal: 12,
        height: 48,
    },
    error: {
        color: "red",
        fontSize: 12,
        marginTop: 5,
    },
    button: {
        backgroundColor: "#007bff",
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 20,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    dropdownButton: {
        backgroundColor: "#007bff",
        borderRadius: 8,
    },
    dropdownButtonText: {
        color: "white",
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        color: "#333",
        paddingRight: 30,
    },
    inputIOSContainer: {
        fontSize: 16,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        color: "#333",
        paddingRight: 30,
    },
    inputAndroidContainer: {
        fontSize: 16,
        paddingVertical: 3,
        paddingHorizontal: 3,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        color: "#333",
        paddingRight: 10,
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 3,
        paddingVertical: 3,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        color: "#333",
        paddingRight: 10,
    },
    inputContainer: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        color: "#666",
        marginBottom: 5,
    },
    dropdownButton: {
        width: "100%",
        height: 50,
        backgroundColor: "#f0f0f0",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ccc",
    },
    dropdownButtonText: {
        fontSize: 16,
        textAlign: "left",
        color: "#333",
    },
    dropdownStyle: {
        borderRadius: 8,
    },
    error: {
        color: "red",
        fontSize: 12,
        marginTop: 5,
    },
});
export default RegisterScreen

