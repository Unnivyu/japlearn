import React, { useState } from 'react';
import { TouchableOpacity, View, TextInput, StyleSheet, Button, ActivityIndicator, KeyboardAvoidingView, Modal, Text, Image, ScrollView } from 'react-native';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, Auth } from 'firebase/auth';
import { styles } from './styles';
import Logo from '../../assets/jpLogo.svg'
import { db } from '../../config';
import {ref,set} from "firebase/database";
import CustomButton from '../../components/CustomButton';

const Signup= ({navigation}) => {
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [errors, setErrors] = useState({
        fname: '',
        lname: '',
        email: '',
        password: '',
        cpassword: ''
    });

    const validateEmail = (email) => {
        // Regular expression to validate Gmail addresses
        const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail.com$/;
        return gmailRegex.test(email);
    };

    
    

    const signin = () => {
        navigation.navigate('Login'); // Navigate to the Login screen
    };

    
    function signup() {

        if (!fname || !lname || !email || !password || !cpassword) {
            setErrors({
                fname: !fname ? 'First name is required' : '',
                lname: !lname ? 'Last name is required' : '',
                email: !email ? 'Email is required' : '',
                password: !password ? 'Password is required' : '',
                cpassword: !cpassword ? 'Confirm Password is required' : ''
            });
            return;
        }

        var passwordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?!.*(.)\1{2})(?!.*(.)\2{2})(?!.*(.)\3{2}).{8,}$/;
       
        if (!validateEmail(email)) {
            setErrors(prevErrors => ({ ...prevErrors, email: 'Please enter a valid Gmail address' }));
            return;
        }
        if (password === cpassword) {
            // Check if the password matches the validation criteria
            if (passwordValid.test(password)) {
                set(ref(db, 'users/' + fname), {
                    firstname: fname,
                    lastname: lname,
                    email: email,
                    password: password
                
                    
                }).then(() => {
                    setModalMessage('Signup Complete!');
                setModalVisible(true); // Show the modal
                setTimeout(() => {
                    setModalVisible(false); // Close the modal after 1.5 seconds
                    navigation.navigate('Login'); // Navigate to the Login screen
                }, 1500);
    
                }).catch((error) => {
                    alert('Signup Failed: ' + error.message);
                });
            } else {
                alert('Password must be at least 8 characters long and contain a combination of uppercase and lowercase letters, numbers, and special characters.');
            }
        } else {
            alert('Passwords do not match!');
        }
    }
    
    const isPasswordValid = (password: string) => {
        // Password must be at least 8 characters long
        if (password.length < 8) {
            return false;
        }
        // Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/;
        return passwordRegex.test(password);
    };


    const handleCreateAccountPress = () => {
        // Handle create account press
    };
    
    const handleForgotPasswordPress = () => {
        // Handle forgot password press
    };
    


    return (
        <KeyboardAvoidingView style={styles.container} behavior='padding'>
            <ScrollView>
                <View>
                    <View style={styles.imageContainer}>
                        <Logo width={200} height={200} />
                    </View>
                    
                    <TextInput
                          style={[styles.input, errors.lname ? styles.errorInput as any : null]}
                        value={fname}
                        placeholder='Firstname'
                        autoCapitalize="none"
                        onChangeText={(text) => setFname(text)}
                    />
                    
                    {errors.fname ? (
                     <View style={{ flexDirection: 'column'}}>
                     <View style={styles.triangleUp} />
                     <Text style={styles.errorText}>{errors.fname}</Text>
                    </View>
                    ) : null}
                    <TextInput
                        style={[styles.input, errors.lname ? styles.errorInput as any : null]}
                        value={lname}
                        placeholder='Lastname'
                        autoCapitalize="none"
                        onChangeText={(text) => setLname(text)}
                    />
                    {errors.lname ? (
        <View style={{ flexDirection: 'column'}}>
            <View style={styles.triangleUp} />
            <Text style={styles.errorText}>{errors.lname}</Text>
        </View>
    ) : null}
                   
                    <TextInput
                        style={[styles.input, errors.lname ? styles.errorInput as any : null]}
                        value={email}
                        placeholder='Email'
                        autoCapitalize="none"
                        onChangeText={(text) => setEmail(text)}
                    />
                    {errors.email ? (
        <View style={{ flexDirection: 'column'}}>
            <View style={styles.triangleUp} />
            <Text style={styles.errorText}>{errors.email}</Text>
        </View>
    ) : null}
                    <TextInput
                        style={[styles.input, errors.lname ? styles.errorInput as any : null]}
                        secureTextEntry={true}
                        value={password}
                        placeholder='Password'
                        autoCapitalize="none"
                        onChangeText={(text) => setPassword(text)}
                    />
                    {errors.password ? (
        <View style={{ flexDirection: 'column'}}>
            <View style={styles.triangleUp} />
            <Text style={styles.errorText}>{errors.password}</Text>
        </View>
    ) : null}
                    <TextInput
                        style={[styles.input, errors.lname ? styles.errorInput as any : null]}
                        secureTextEntry={true}
                        value={cpassword}
                        placeholder='ConfirmPassword'
                        autoCapitalize="none"
                        onChangeText={(text) => setCPassword(text)}
                    />
                    {errors.cpassword ? (
        <View style={{ flexDirection: 'column'}}>
            <View style={styles.triangleUp} />
            <Text style={styles.errorText}>{errors.cpassword}</Text>
        </View>
    ) : null}

                    
                    <View style={styles.buttonContainer}>
                        {loading ? (
                            <ActivityIndicator size="large" color="#0000ff" />
                        ) : (
                            <>
                                <CustomButton title="Sign Up" onPress={signup} style={styles.button} textStyle={styles.buttonText}/>
                                {/*<CustomButton title="Create account" onPress={signUp} />*/}
                            </>
                        )}
                    </View>
                    <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
                        <Text>
                            <Text style={styles.extraText}>Already have an account? </Text>
                            <TouchableOpacity onPress={signin}>
                                <Text style={styles.linkText}>Sign In</Text>
                            </TouchableOpacity>
                        </Text>
                        
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
            </ScrollView>
        </KeyboardAvoidingView>
    );

};

export default Signup;



