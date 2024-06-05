import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Pressable, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import { Link, router } from 'expo-router';
import CustomButton from '../components/CustomButton';
import CustomModal from '../components/CustomModal';
import styles from '../styles/stylesLogin';
import Logo from '../assets/svg/jpLogo.svg';
import expoconfig from '../expoconfig';
import { AuthContext } from '../context/AuthContext';
import { useClassCode } from '../context/ClassCodeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Login = () => {


    const { login } = useContext(AuthContext);
    const { classCode, setClassCode } = useClassCode();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    useEffect(() => {
        const checkLoginStatus = async () => {
            const storedUser = await AsyncStorage.getItem('user');
            const storedClassCode = await AsyncStorage.getItem('classCode');
            console.log(storedUser);
            if (storedUser) {
                const parsedUser = JSON.parse(storedUser, storedClassCode);
                navigateBasedOnRole(parsedUser.role);
            }
        };
        checkLoginStatus();
    }, []);

    const navigateBasedOnRole = (role) => {
        if (role === 'student') {
            if (classCode) {
                router.push('/Menu');
            } else {
                router.push('/StartMenu');
            }
        } else if (role === 'teacher') {
            router.push('/TeacherDashboard');
        } else {
            router.push('/StartMenu');
        }
    };

    const handleLogin = async () => {
        if (!email.trim() || !password.trim()) {
            setModalMessage("Please fill in both email and password");
            setModalVisible(true);
            return;
        }
        else if (!email.trim()) {
            setModalMessage("Please fill in the email field");
            setModalVisible(true);
            return;
        }
        else if (!password.trim()) {
            setModalMessage("Please fill in password field");
            setModalVisible(true);
            return;
        }

        setLoading(true);

        try {
            const studentResponse = await fetch(`${expoconfig.API_URL}/api/students/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (studentResponse.ok) {
                const studentData = await studentResponse.json();
                const userData = {
                    userId: studentData.userId,
                    email: studentData.email,
                    fname: studentData.fname,
                    lname: studentData.lname,
                    role: studentData.role,
                };
                await login(userData);
                setClassCode(studentData.classCode);
                navigateBasedOnRole(userData.role);
            } else {
                const userResponse = await fetch(`${expoconfig.API_URL}/api/users/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });

                if (userResponse.ok) {
                    const userDataFromResponse = await userResponse.json();
                    const userData = {
                        userId: userDataFromResponse.userId,
                        email: userDataFromResponse.email,
                        fname: userDataFromResponse.fname,
                        lname: userDataFromResponse.lname,
                        role: userDataFromResponse.role
                    };
                    await login(userData);
                    await AsyncStorage.setItem('classCode', '');
                    navigateBasedOnRole(userData.role);
                } else {
                    const message = await userResponse.json();
                    throw new Error(message.error);
                }
            }
        } catch (error) {
            setModalMessage(`'Login failed: ${error}`);
            setModalVisible(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Logo width={150} height={150} />
            </View>
            <KeyboardAvoidingView>
                <TextInput
                    style={styles.input}
                    value={email}
                    placeholder='Email'
                    autoCapitalize="none"
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    value={password}
                    placeholder='Password'
                    autoCapitalize="none"
                    onChangeText={setPassword}
                />
                <View style={styles.buttonContainer}>
                    {loading ? (
                        <ActivityIndicator size="large" color="#0000ff" />
                    ) : (
                        <CustomButton title="Login" onPress={handleLogin} buttonStyle={styles.button} textStyle={styles.buttonText} />
                    )}
                </View>
            </KeyboardAvoidingView>

            <View style={styles.linkContainer}>
                <Pressable onPress={() => router.push('/Signup')}>
                    <Text style={styles.linkText}>Create account?</Text>
                </Pressable>
                <Pressable onPress={undefined}>
                    <Text style={styles.linkText}>Forgot Password?</Text>
                </Pressable>
            </View>

            <CustomModal
                visible={modalVisible}
                message={modalMessage}
                onClose={() => setModalVisible(false)}
            />
        </View>
    )
}

export default Login;
