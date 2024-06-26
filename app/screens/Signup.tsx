import React, { useState } from 'react';
import { TouchableOpacity, View, TextInput, KeyboardAvoidingView, Modal, Button, Text, ActivityIndicator, ScrollView } from 'react-native';
import { styles } from './styles';
import Logo from '../../assets/jpLogo.svg';
import CustomButton from '../../components/CustomButton';
import expoconfig from '../../expoconfig';

const Signup = ({ navigation }) => {
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

    const signup = async () => {
        let validationErrors = {
            fname: '',
            lname: '',
            email: '',
            password: '',
            cpassword: ''
        };
    
        if (!fname.trim()) {
            validationErrors.fname = 'Please enter your first name';
        }
        if (!lname.trim()) {
            validationErrors.lname = 'Please enter your last name';
        }
        if (!email.trim()) {
            validationErrors.email = 'Please enter your email';
        } else if (!email.endsWith('@gmail.com')) {
            validationErrors.email = 'Invalid email format';
        }
        if (!password) {
            validationErrors.password = 'Please enter your password';
        } else {
            if (password.length < 8) {
                validationErrors.password = 'Password must be at least 8 characters long';
            }
            if (!/[A-Z]/.test(password)) {
                validationErrors.password = validationErrors.password + ' Include at least one uppercase letter';
            }
            if (!/[0-9]/.test(password)) {
                validationErrors.password = validationErrors.password + ' Include at least one number';
            }
            if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
                validationErrors.password = validationErrors.password + ' Include at least one special character';
            }
        }
        if (!cpassword) {
            validationErrors.cpassword = 'Please confirm your password';
        } else if (password !== cpassword) {
            validationErrors.cpassword = 'Passwords do not match';
        }
    
        setErrors(validationErrors);
    
        if (Object.values(validationErrors).some(error => error !== '')) {
            setModalMessage('Please correct the highlighted fields.');
            setModalVisible(true);
            return;
        }
    
        // Perform the signup operation
        try {
            setLoading(true);
            const response = await fetch(`${expoconfig.API_URL}/api/users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    fname,
                    lname,
                    email,
                    password,
                    role: 'student'
                })
            });
    
            const data = await response.json();
            if (response.ok) {
                setModalMessage('Signup successful!');
                setModalVisible(true);
                setFname('');
                setLname('');
                setEmail('');
                setPassword('');
                setCPassword('');
    
                setTimeout(() => {
                    setModalVisible(false);
                    navigation.navigate('Login');
                }, 2000);
            } else {
                const errorMessage = await response.text();
                console.error('Error response:', errorMessage);
                setModalMessage(`Signup failed: ${errorMessage}`);
                setModalVisible(true);
            }
        } catch (error) {
            setModalMessage(`Signup failed email account already used:`);
            setModalVisible(true);
        } finally {
            setLoading(false);
        }
    };

    const handleNavSignin = () => {
        navigation.navigate('Login');
    }

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
                    {errors.fname && (
                        <Text style={styles.errorText}>{errors.fname}</Text>
                    )}

                    <TextInput
                        style={[styles.input, errors.lname ? styles.errorInput : null]}
                        value={lname}
                        placeholder='Lastname'
                        autoCapitalize="none"
                        onChangeText={(text) => setLname(text)}
                    />
                    {errors.lname && (
                        <Text style={styles.errorText}>{errors.lname}</Text>
                    )}

                    <TextInput
                        style={[styles.input, errors.email ? styles.errorInput : null]}
                        value={email}
                        placeholder='Email'
                        autoCapitalize="none"
                        onChangeText={(text) => setEmail(text)}
                    />
                    {errors.email && (
                        <Text style={styles.errorText}>{errors.email}</Text>
                    )}

                    <TextInput
                        style={[styles.input, errors.password ? styles.errorInput : null]}
                        secureTextEntry
                        value={password}
                        placeholder='Password'
                        autoCapitalize="none"
                        onChangeText={(text) => setPassword(text)}
                    />
                    {errors.password && (
                        <Text style={styles.errorText}>{errors.password}</Text>
                    )}

                    <TextInput
                        style={[styles.input, errors.cpassword ? styles.errorInput : null]}
                        secureTextEntry
                        value={cpassword}
                        placeholder='Confirm Password'
                        autoCapitalize="none"
                        onChangeText={(text) => setCPassword(text)}
                    />
                    {errors.cpassword && (
                        <Text style={styles.errorText}>{errors.cpassword}</Text>
                    )}

                    <View style={styles.buttonContainer}>
                        {loading ? (
                            <ActivityIndicator size="large" color="#0000ff" />
                        ) : (
                            <CustomButton title="Sign Up" onPress={signup} style={styles.button} textStyle={styles.buttonText}/>
                        )}
                    </View>

                    <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
                        <TouchableOpacity onPress={handleNavSignin}>
                            <Text style={styles.linkText}>Already have an account? Sign In</Text>
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
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default Signup;
