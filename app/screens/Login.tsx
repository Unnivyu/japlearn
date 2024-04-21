import React, { useState } from 'react';
import { TouchableOpacity, View, TextInput, StyleSheet, Button, ActivityIndicator, KeyboardAvoidingView, Modal, Text, Image } from 'react-native';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, Auth } from 'firebase/auth';
import { styles } from './styles';
import Logo from '../../assets/jpLogo.svg'
import CustomButton from '../../components/CustomButton';
import Signup from './Signup';
import { db } from '../../config';
import {ref,set,get} from "firebase/database";  

const Login = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const Signup = () => {
        navigation.navigate('Signup'); // Navigate to the Login screen
    };

    const handleLogin = async () => {
        setLoading(true);
        try {
            const userRef = ref(db, 'users');
            const snapshot = await get(userRef);
            
            if (snapshot.exists()) {
                const users = snapshot.val();
                
                // Iterate over users to log their details
                Object.values(users).forEach(user => {
                    console.log("User:", user);
                });
    
                // Find the user with the provided email
                const user = Object.values(users).find(user => user.email === email);
                if (user) {
                    // Compare passwords
                    if (user.password === password) {
                        // Authentication successful, navigate to the main menu screen
                        navigation.navigate('StartMenu', { firstName: user.firstname });
                    } else {
                        throw new Error('Incorrect password');
                    }
                } else {
                    throw new Error('User not found');
                }
            } else {
                throw new Error('No users found');
            }
        } catch (error) {
            setModalMessage('Login failed: ' + error.message);
            setModalVisible(true);
        } finally {
            setLoading(false);
        }
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
                            <CustomButton title="Login" onPress={handleLogin} style={styles.button} textStyle={styles.buttonText}/>
                            {/*<CustomButton title="Create account" onPress={signUp} />*/}
                        </>
                    )}
                </View>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                    <Text>
                        <TouchableOpacity onPress={Signup}>
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
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <View style={styles.modalView}>
                    <Text>{modalMessage}</Text>
                    <Button

                        title="Close"
                        onPress={() => {
                            setModalVisible(false);
                        }}
                    />
                </View>
            </Modal>
        </KeyboardAvoidingView>
    );

};

export default Login;



