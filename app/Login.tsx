import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Pressable, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import { Link, router } from 'expo-router';
import CustomButton from '../components/CustomButton';
import CustomModal from '../components/CustomButton';
import styles from '../styles/stylesLogin';
import Logo from '../assets/svg/jpLogo.svg';

const Login = (navigation) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const handleSignup = () => {
        
    }
    
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
                            <CustomButton title="Login" onPress={() => router.push("/Menu")} buttonStyle={styles.button} textStyle={styles.buttonText} />
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
