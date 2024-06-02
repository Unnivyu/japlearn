import { ActivityIndicator, Button, KeyboardAvoidingView, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import CustomButton from '../components/CustomButton';
import styles from '../styles/stylesSignup';
import React, {useState} from 'react';
import Logo from '../assets/svg/jpLogo.svg'

const Signup = () => {
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

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}> 
                <View>
                    <View style={styles.imageContainer}>
                        <Logo width={150} height={150} />
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
                            <CustomButton title="Sign Up" onPress={undefined} buttonStyle={styles.button} textStyle={styles.buttonText}/>
                        )}
                    </View>

                    <View style={styles.linkContainer}>
                        <Pressable onPress={undefined}>
                            <Text style={styles.linkText}>Already have an account? Sign In</Text>
                        </Pressable>
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
        </View>
    )
}

export default Signup;
