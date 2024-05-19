    import React, { useState, useContext, useEffect } from 'react';
    import { View, TextInput, Button, Text, TouchableOpacity, KeyboardAvoidingView, Modal, ActivityIndicator } from 'react-native';
    import { AuthContext } from '../../context/AuthContext';
    import { useClassCode } from '../../context/ClassCodeContext';
    import AsyncStorage from '@react-native-async-storage/async-storage';
    import { useNavigation } from '@react-navigation/native';
    import Logo from '../../assets/jpLogo.svg';
    import { styles } from './styles';
    import CustomButton from '../../components/CustomButton';
    import expoconfig from '../../expoconfig';

    const Login = () => {
        const { user, login } = useContext(AuthContext);
        const { classCode, setClassCode } = useClassCode();
        const navigation = useNavigation();
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [loading, setLoading] = useState(false);
        const [modalVisible, setModalVisible] = useState(false);
        const [modalMessage, setModalMessage] = useState('');

        useEffect(() => {
            const checkLoginStatus = async () => {
                const storedUser = await AsyncStorage.getItem('user');
                const storedClassCode = await AsyncStorage.getItem('classCode');
                if (storedUser) {
                    const parsedUser = JSON.parse(storedUser);
                    console.log("User already logged in:", parsedUser);
                    console.log("Stored class code:", storedClassCode);
                    navigateBasedOnRoleAndClassCode(parsedUser.role, storedClassCode);
                }
            };
            checkLoginStatus();
        }, []);
        

        const navigateBasedOnRoleAndClassCode = (role, classCode) => {
            console.log("Navigating based on role and classCode:", role, classCode);
            if (role === 'student') {
                if (classCode) {
                    navigation.navigate('Menu');
                } else {
                    navigation.navigate('StartMenu');
                }
            } else if (role === 'teacher') {
                navigation.navigate('TeacherDashboard');
            } else {
                navigation.navigate('StartMenu');
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
                // First, try to log in as a student
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
                        email: studentData.email,
                        fname: studentData.fname,
                        lname: studentData.lname,
                        role: studentData.role // Assuming role for students
                    
                    };
                    console.log(userData);
                    await login(userData);
                    console.log(studentData.classCode);
                    setClassCode(studentData.classCode);
                    navigateBasedOnRoleAndClassCode(studentData.role, studentData.classCode);
                } else {
                    // If student login fails, try to log in as a user
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
                            email: userDataFromResponse.email,
                            fname: userDataFromResponse.fname,
                            lname: userDataFromResponse.lname,
                            role: userDataFromResponse.role, // Assuming role for users
                        };
                        console.log(userData);
                        await login(userData);  
                        await AsyncStorage.setItem('classCode', '');
                        navigateBasedOnRoleAndClassCode(userData.role, '');
                    } else {
                        setModalMessage('Invalid email or password.');
                        setModalVisible(true);
                    }
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
