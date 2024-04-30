import React, { useState, useEffect, useContext } from 'react';
import { TouchableOpacity, View, TextInput, StyleSheet, Button, ActivityIndicator, KeyboardAvoidingView, Modal, Text, Image } from 'react-native';
import { styles } from './styles';
import Logo from '../../assets/jpLogo.svg';
import CustomButton from '../../components/CustomButton';
import Signup from './Signup';
import { db } from '../../config';
import { ref, get } from "firebase/database";
import { AuthContext } from '../../context/AuthContext';

const Login = ({ navigation }) => {
    const { login } = useContext(AuthContext); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    useEffect(() => {
        async function fetchData() {
            console.log("AuthContext:", AuthContext);
            console.log("Login function:", login);
        }
        fetchData();
    }, []);

    const handleLogin = async () => {
        setLoading(true);
        try {
            const userRef = ref(db, 'users');
            const teacherRef = ref(db, 'Teacher/defaultTeacher');
    
            // Retrieve user data
            const userSnapshot = await get(userRef);
            const users = userSnapshot.exists() ? userSnapshot.val() : {};
    
            // Retrieve default teacher data
            const teacherSnapshot = await get(teacherRef);
            const defaultTeacher = teacherSnapshot.exists() ? teacherSnapshot.val() : {};
    
            // Find the user with the provided email
            const user = Object.values(users).find(user => user.email === email);
    
            if (user) {
                // Compare passwords
                if (user.password === password) {
                    // Authentication successful for user, navigate to StartMenu
                    const userData = { email: user.email, role: 'user', user };
                    login(userData);
                    navigation.navigate('StartMenu', { firstName: user.firstname });
                } else {
                    throw new Error('Incorrect password');
                }
            } else {
                // Check if default teacher email and password match
                if (defaultTeacher.email === email && defaultTeacher.password === password) {
                    // Authentication successful for default teacher, navigate to TeacherDashboard
                    const userData = { email: defaultTeacher.email, role: 'teacher', user: defaultTeacher };
                    login(userData);
                    navigation.navigate('TeacherDashboard');
                } else {
                    throw new Error('User not found');
                }
            }
        } catch (error) {
            setModalMessage('Login failed: ' + error.message);
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
                            <CustomButton title="Login" onPress={handleLogin} style={styles.button} textStyle={styles.buttonText} />
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
