import React, { useState, useContext, useEffect } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity, KeyboardAvoidingView, Modal, ActivityIndicator } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Logo from '../../assets/jpLogo.svg';
import { styles } from './styles';
import CustomButton from '../../components/CustomButton';

const Login = () => {
    const { user, login } = useContext(AuthContext);
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    useEffect(() => {
        const checkLoginStatus = async () => {
            if (user) {
                navigateBasedOnRole(user.role);
            }
        };
        checkLoginStatus();
    }, [user]);

    const navigateBasedOnRole = (role) => {
        if (role === 'student') {
            navigation.navigate('StartMenu');
        } else if (role === 'teacher') {
            navigation.navigate('TeacherDashboard');
        }
    };

    const Signin = async () => {
        if (!email.trim() || !password.trim()) {
            setModalMessage("Please fill in both email and password");
            setModalVisible(true);
            return;
        }
    
        setLoading(true);
    
        try {
            const response = await fetch('http://localhost:8080/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
    
            const data = await response.json();
    
            if (response.ok) {
                const userData = {
                    email: data.email,
                    fname: data.fname,
                    lname: data.lname,
                    role: data.role
                };
                console.log(userData);
                await login(userData); 
                navigateBasedOnRole(data.role);
            } else {
                setModalMessage(`Login failed: ${data.error || 'Check input'}`);
                setModalVisible(true);
            }
        } catch (error) {
            setModalMessage('Login failed. Please try again.');
            setModalVisible(true);
        } finally {
            setLoading(false);
        }
    };
    
    const handleSignup = () => {
        navigation.navigate('Signup');
    };

    const handleForgotPassword = () => {
        // Placeholder for forgot password functionality
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior='padding'>
            <View>
                <View style={styles.imageContainer}>
                    <Logo width={200} height={200} />
                </View>
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
                        <CustomButton title="Login" onPress={Signin} style={styles.button} textStyle={styles.buttonText} />
                    )}
                </View>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                    <TouchableOpacity onPress={handleSignup}>
                        <Text style={styles.linkText}>Create account?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleForgotPassword}>
                        <Text style={styles.linkText}>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalView}>
                    <Text>{modalMessage}</Text>
                    <Button title="Close" onPress={() => setModalVisible(false)} />
                </View>
            </Modal>
        </KeyboardAvoidingView>
    );
};

export default Login;
