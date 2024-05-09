import React, { useState } from 'react';
import { TouchableOpacity, View, TextInput, KeyboardAvoidingView, Modal,Button, Text, ActivityIndicator, ScrollView } from 'react-native';
import { ref, set, get, update } from "firebase/database";
import { styles } from './styles';
import Logo from '../../assets/jpLogo.svg';
import CustomButton from '../../components/CustomButton';
import { db } from '../../config';

const Signup = ({ navigation }) => {
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

        // Errors state, optional for input validation feedback
        const [errors, setErrors] = useState({
            fname: '',
            lname: '',
            email: '',
            password: '',
            cpassword: ''
        });
    
        // Validate and submit user data
        const signup = async () => {
            // Optional: Add form validation checks here
    
            // Clear previous errors
            setErrors({
                fname: '',
                lname: '',
                email: '',
                password: '',
                cpassword: ''
            });
    
            // Perform the signup operation
            try {
                setLoading(true);
    
                const response = await fetch('http://192.168.1.5:8080/api/users/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        fname,
                        lname,
                        email,
                        password
                    })
                });
    
                const data = await response.json();
    
                if (response.ok) {
                    // Registration was successful
                    setModalMessage('Signup successful!');
                    setModalVisible(true);
    
                    // Reset form or navigate to the next page
                    setFname('');
                    setLname('');
                    setEmail('');
                    setPassword('');
                    setCPassword('');
    
                    // Navigate to a different screen (optional)
                    // navigation.navigate('HomeScreen');
                } else {
                    // Handle server errors (like duplicate email)
                    setModalMessage(`Signup failed: ${data.message || response.statusText}`);
                    setModalVisible(true);
                }
            } catch (error) {
                // Handle network errors
                setModalMessage(`Signup failed: ${error.message}`);
                setModalVisible(true);
            } finally {
                setLoading(false);
            }
        };
    
        // Sign-in action
        const signin = () => {
            navigation.navigate('Signin');
        };

 
    
    
    

    return (
        <KeyboardAvoidingView style={styles.container} behavior='padding'>
            <ScrollView>
                <View>
                    <View style={styles.imageContainer}>
                        <Logo width={200} height={200} />
                    </View>
                    
                    <TextInput
                        style={[styles.input, errors.fname ? styles.errorInput : null]}
                        value={fname}
                        placeholder='Firstname'
                        autoCapitalize="none"
                        onChangeText={(text) => setFname(text)}
                    />
                    {errors.fname ? (
                        <View style={{ flexDirection: 'column' }}>
                            <View style={styles.triangleUp} />
                            <Text style={styles.errorText}>{errors.fname}</Text>
                        </View>
                    ) : null}

                    <TextInput
                        style={[styles.input, errors.lname ? styles.errorInput : null]}
                        value={lname}
                        placeholder='Lastname'
                        autoCapitalize="none"
                        onChangeText={(text) => setLname(text)}
                    />
                    {errors.lname ? (
                        <View style={{ flexDirection: 'column' }}>
                            <View style={styles.triangleUp} />
                            <Text style={styles.errorText}>{errors.lname}</Text>
                        </View>
                    ) : null}
                    
                    <TextInput
                        style={[styles.input, errors.email ? styles.errorInput : null]}
                        value={email}
                        placeholder='Email'
                        autoCapitalize="none"
                        onChangeText={(text) => setEmail(text)}
                    />
                    {errors.email ? (
                        <View style={{ flexDirection: 'column' }}>
                            <View style={styles.triangleUp} />
                            <Text style={styles.errorText}>{errors.email}</Text>
                        </View>
                    ) : null}

                    <TextInput
                        style={[styles.input, errors.password ? styles.errorInput : null]}
                        secureTextEntry
                        value={password}
                        placeholder='Password'
                        autoCapitalize="none"
                        onChangeText={(text) => setPassword(text)}
                    />
                    {errors.password ? (
                        <View style={{ flexDirection: 'column' }}>
                            <View style={styles.triangleUp} />
                            <Text style={styles.errorText}>{errors.password}</Text>
                        </View>
                    ) : null}

                    <TextInput
                        style={[styles.input, errors.cpassword ? styles.errorInput : null]}
                        secureTextEntry
                        value={cpassword}
                        placeholder='Confirm Password'
                        autoCapitalize="none"
                        onChangeText={(text) => setCPassword(text)}
                    />
                    {errors.cpassword ? (
                        <View style={{ flexDirection: 'column' }}>
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
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default Signup;
