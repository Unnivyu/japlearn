import React, { useState, useContext, useEffect } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity, KeyboardAvoidingView, Modal, ActivityIndicator } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ref, get } from "firebase/database";
import { db } from '../../config';
import Logo from '../../assets/jpLogo.svg';
import { styles } from './styles';
import CustomButton from '../../components/CustomButton';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');


    const login = async () => {
        // Check for empty email or password
        if (!email.trim() || !password.trim()) {
            setModalMessage("Please fill in both email and password");
            setModalVisible(true);
            return;
        }
    
        setLoading(true);
        const requestData = new URLSearchParams({ email, password });
    
        try {
            // Make a POST request to your backend `/login` endpoint
            const response = await fetch('http://localhost:8080/api/students/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: requestData.toString()
            });
    
            if (response.ok) {
                // Success: navigate to the StartMenu screen
                const userData = await response.json();
                // Save any necessary user data here (e.g., AsyncStorage) or in context
                console.log("User Data: ", userData);
                navigation.navigate('StartMenu');
            } else {
                // Handle the error response
                const errorMessage = await response.text();
                setModalMessage(errorMessage || "Login failed");
                setModalVisible(true);
            }
        } catch (error) {
            console.error('Login Error:', error);
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
        // Implement forgot password functionality
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
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    value={password}
                    placeholder='Password'
                    autoCapitalize="none"
                    onChangeText={(text) => setPassword(text)}
                />
                <View style={styles.buttonContainer}>
                    {loading ? (
                        <ActivityIndicator size="large" color="#0000ff" />
                    ) : (
                        <>
                            <CustomButton title="Login" onPress={login} style={styles.button} textStyle={styles.buttonText} />
                        </>
                    )}
                </View>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                    <Text>
                        <TouchableOpacity onPress={handleSignup}>
                            <Text style={styles.linkText}>Create account?</Text>
                        </TouchableOpacity>
                    </Text>
                    <TouchableOpacity>
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
                    <Button
                        title="Close"
                        onPress={() => setModalVisible(false)}
                    />
                </View>
            </Modal>
        </KeyboardAvoidingView>
    );
};

export default Login;
