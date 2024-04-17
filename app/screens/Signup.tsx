import React, { useState } from 'react';
import { TouchableOpacity, View, TextInput, StyleSheet, Button, ActivityIndicator, KeyboardAvoidingView, Modal, Text, Image, ScrollView } from 'react-native';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, Auth } from 'firebase/auth';
import { styles } from './styles';
import Logo from '../../assets/jpLogo.svg'
import { db } from '../../config';
import {ref,set} from "firebase/database";
import CustomButton from '../../components/CustomButton';

const Signup = ({navigation}) => {
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    

    const signin = () => {
    };

    
    function signup() {

    }
    const isPasswordValid = (password: string) => {
    };


    const handleCreateAccountPress = () => {
    };
    
    const handleForgotPasswordPress = () => {
    };
    


    return (
        <KeyboardAvoidingView style={styles.container} behavior='padding'>
            <ScrollView>
                <View>
                    <View style={styles.imageContainer}>
                        <Logo width={200} height={200} />
                    </View>
                    
                    <TextInput
                        style={styles.input}
                        value={fname}
                        placeholder='Firstname'
                        autoCapitalize="none"
                        onChangeText={(text) => setFname(text)}
                    />
                    <TextInput
                        style={styles.input}
                        value={lname}
                        placeholder='Lastname'
                        autoCapitalize="none"
                        onChangeText={(text) => setLname(text)}
                    />
                   
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
                    <TextInput
                        style={styles.input}
                        secureTextEntry={true}
                        value={cpassword}
                        placeholder='ConfirmPassword'
                        autoCapitalize="none"
                        onChangeText={(text) => setCPassword(text)}
                    />
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

}
export default Signup;
