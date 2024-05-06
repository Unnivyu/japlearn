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
    const [errors, setErrors] = useState({
        fname: '',
        lname: '',
        email: '',
        password: '',
        cpassword: ''
    });

    // Email validation function
    const validateEmail = (email) => {
        const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail.com$/;
        return gmailRegex.test(email);
    };

    const signin = () => {
        navigation.navigate('Login');
    };

    // Signup function
    const signup = () => {
        // Perform validation checks...
    
        // Define the reference to the "userCounter" in the database
        const counterRef = ref(db, 'userCounter');
    
        // Retrieve the current user counter
        get(counterRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    // Get the current counter value
                    const currentCounter = snapshot.val();
    
                    // Create the new user ID in the form of `userID_{currentCounter}`
                    const userId = `userID_${currentCounter}`;
    
                    // Define the reference to the new user entry using the new user ID
                    const userRef = ref(db, `users/${userId}`);
    
                    // Create the new user entry
                    set(userRef, {
                        firstname: fname,
                        lastname: lname,
                        email: email,
                        password: password
                    })
                    .then(() => {
                        setModalMessage('Signup Complete!');
                        setModalVisible(true);
                        setTimeout(() => {
                            setModalVisible(false);
                            navigation.navigate('Login'); // Navigate to the Login screen
                        }, 1500);
                    })
                    .catch((error) => {
                        console.error('Failed to create user entry:', error);
                        alert(`Signup Failed: Failed to create user entry: ${error.message}`);
                    });
    
                    // Increment the counter and update the database
                    const updates = { 'userCounter': currentCounter + 1 };
    
                    update(ref(db), updates)
                        .then(() => {
                            console.log('Counter updated successfully. New counter:', currentCounter + 1);
                        })
                        .catch((error) => {
                            console.error('Error updating counter:', error);
                            alert(`Error updating counter: ${error.message}`);
                        });
                } else {
                    console.error("Failed to retrieve current counter from the database. Snapshot does not exist.");
                    alert('Error: Failed to retrieve current counter from the database. Initializing counter to 0.');
    
                    // Optionally, initialize the user counter to 0 if it doesn't exist
                    const initialCounter = 0;
                    set(counterRef, initialCounter)
                        .then(() => {
                            console.log('User counter initialized to 0');
                        })
                        .catch(error => {
                            console.error('Failed to initialize user counter:', error);
                            alert(`Failed to initialize user counter: ${error.message}`);
                        });
                }
            })
            .catch((error) => {
                console.error('Error retrieving current counter from the database:', error);
                alert(`Error: Error retrieving current counter from the database: ${error.message}`);
            });
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
